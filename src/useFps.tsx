import { useCallback, useEffect, useRef, useState } from "react";

const MEASURE_PERIOD = 1000;

export function useFps() {
  const [fpsDisplay, setFpsDisplay] = useState({ fps: 0, avg: 0 });
  const ratings = useRef<number[]>([]);

  const fps = useRef({
    frames: 0,
    startTime: Date.now(),
    lastTime: 0,
  });

  const updateFps = useCallback(() => {
    // Increment the frame counter
    fps.current.frames++;
    // Calculate the current time
    fps.current.lastTime = Date.now();
    // If the current time is more than one second from the start time, we update the fps value
    const timeElapsed = Math.floor(
      fps.current.lastTime - fps.current.startTime
    );
    if (timeElapsed > MEASURE_PERIOD) {
      // Calculate the fps value
      // Update the fps cache
      ratings.current.push(fps.current.frames / (MEASURE_PERIOD / 1000));
      // Only keep the last 10 ratings
      if (ratings.current.length >= 5) {
        ratings.current.shift();
      }
      // Update the fps display
      setFpsDisplay({
        fps: Math.floor(fps.current.frames / (MEASURE_PERIOD / 1000)),
        avg:
          ratings.current.reduce((a, b) => a + b, 0) / ratings.current.length,
      });

      // Reset the frame counter every second
      fps.current.frames = 0;
      fps.current.startTime = Date.now();
      fps.current.lastTime = 0;
    }
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      updateFps();
    }, 1);
    return () => clearInterval(i);
  });
  return fpsDisplay;
}
