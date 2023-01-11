import { useCallback, useEffect, useRef, useState } from "react";
import useConditionalWarning from "./helpers/useConditionalWarning";

interface UseFpsOptions {
  samplePeriod?: number;
  numberOfFramesForAverage?: number;
  useAnimationFrames?: boolean;
}

const DEFAULT_OPTIONS = {
  samplePeriod: 1000,
  numberOfFramesForAverage: 5,
};

function getOptions(options: UseFpsOptions) {
  const samplePeriod = options.samplePeriod || DEFAULT_OPTIONS.samplePeriod;
  const numberOfFramesForAverage =
    options.numberOfFramesForAverage ||
    DEFAULT_OPTIONS.numberOfFramesForAverage;
  const useAnimationFrames = options.useAnimationFrames || false;
  return { samplePeriod, numberOfFramesForAverage, useAnimationFrames };
}

export function useFps(options: UseFpsOptions) {
  const animationFrameRef = useRef<number>(-1);
  const { samplePeriod, numberOfFramesForAverage, useAnimationFrames } =
    getOptions(options);

  const [fpsDisplay, setFpsDisplay] = useState({ fps: 0, avg: 0 });
  const ratings = useRef<number[]>([]);
  const fps = useRef({
    frames: 0,
    startTime: Date.now(),
    lastTime: 0,
  });

  useConditionalWarning(
    !useAnimationFrames,
    "react-fps-counter: it is recommended that you use animation frames for better accuracy. You are currently using the counter without this option set."
  );

  const updateFps = useCallback(() => {
    // Increment the frame counter
    fps.current.frames++;
    // Calculate the current time
    fps.current.lastTime = Date.now();
    // If the current time is more than one second from the start time, we update the fps value
    const timeElapsed = Math.floor(
      fps.current.lastTime - fps.current.startTime
    );
    const samplePeriodSeconds = samplePeriod / 1000;
    if (timeElapsed > samplePeriod) {
      // Calculate the fps value
      // Update the fps cache
      ratings.current.push(fps.current.frames / samplePeriodSeconds);
      // Only keep the last N ratings
      if (ratings.current.length > numberOfFramesForAverage) {
        ratings.current.shift();
      }
      // Update the fps display
      setFpsDisplay({
        fps: Math.floor(fps.current.frames / samplePeriodSeconds),
        avg:
          ratings.current.reduce((a, b) => a + b, 0) / ratings.current.length,
      });

      // Reset the frame counter every sample period
      fps.current.frames = 0;
      fps.current.startTime = Date.now();
      fps.current.lastTime = 0;
    }
    if (useAnimationFrames) {
      nextAnimationFrame();
    }
  }, [samplePeriod, numberOfFramesForAverage, options.samplePeriod, useAnimationFrames]);

  const nextAnimationFrame = useCallback(() => {
    animationFrameRef.current = window.requestAnimationFrame(updateFps);
  }, [updateFps]);

  useEffect(() => {
    if (useAnimationFrames) {
      nextAnimationFrame();
      return () => window.cancelAnimationFrame(animationFrameRef.current);
    } else {
      const interval = setInterval(() => {
        updateFps();
      }, 1);
      return () => clearInterval(interval);
    }
  });
  return fpsDisplay;
}
