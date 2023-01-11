import { memo, useEffect, useRef, useState } from "react";
import { ColorTiers, getColor } from "./getColor";
import { useFps } from "./useFps";
interface FPSCounterProps {
  targetFrameRate?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  colorTiers?: ColorTiers;
  visible?: boolean;
  numberOfFramesForAverage?: number;
  samplePeriod?: number;
  useAnimationFrames?: boolean;
}
export default memo(function FPSCounter({
  targetFrameRate = 60,
  useAnimationFrames = true,
  position = "top-left",
  colorTiers,
  visible,
  numberOfFramesForAverage,
  samplePeriod
}: FPSCounterProps) {
  const fps = useFps({ numberOfFramesForAverage, samplePeriod, useAnimationFrames });
  const pastFps = useRef([fps]);
  const [pastFpsWindow, setPastFpsWindow] = useState<
    { fps: Number; avg: number }[]
  >([]);
  const HEIGHT = 67;
  const WIDTH = 100;
  const LINE_WIDTH = 1;
  useEffect(() => {
    if (pastFps.current.length >= 1) {
      pastFps.current.push(fps);
    }
    if (pastFps.current.length > WIDTH / LINE_WIDTH) {
      pastFps.current.shift();
    }
    if (pastFps.current !== pastFpsWindow) {
      setPastFpsWindow(pastFps.current);
    }
  }, [fps, pastFpsWindow]);

  let positionStyle:
    | { top: 0; left: 0 }
    | { top: 0; right: 0 }
    | { bottom: 0; left: 0 }
    | { bottom: 0; right: 0 } = { top: 0, left: 0 };
  switch (position) {
    case "top-left":
      positionStyle = { top: 0, left: 0 };
      break;
    case "top-right":
      positionStyle = { top: 0, right: 0 };
      break;
    case "bottom-left":
      positionStyle = { bottom: 0, left: 0 };
      break;
    case "bottom-right":
      positionStyle = { bottom: 0, right: 0 };
      break;
  }
  if (!visible) return <></>;
  return (
    <div
      style={{
        position: "fixed",
        ...positionStyle,
        width: WIDTH,
        height: HEIGHT,
        overflow: "hidden",
        border: "1px solid lightgray",
        marginRight: 10,
      }}
    >
      {/* The wrapper for the graph and the stats */}
      <div
        style={{
          backgroundColor: "rgba(40,40,40)",
          overflow: "hidden",
          zIndex: 100,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 1,
            width: "100%",
            zIndex: 10,
            height: HEIGHT - 19,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              height: "100%",
              transform: "scaleY(-1)",
            }}
          >
            {pastFpsWindow.map((fps, i) => {
              let color = getColor(fps.avg, targetFrameRate, colorTiers);
              return (
                <div
                  style={{
                    height:
                      Math.round((fps.avg / targetFrameRate) * (HEIGHT - 19)) +
                      "px",
                    width: LINE_WIDTH + "px",
                    backgroundColor: color,
                    color: "black",
                    overflow: "hidden",
                  }}
                  key={i}
                >
                  &nbsp;
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            // alignItems: "flex-end",
            justifyContent: "center",
            padding: 10,
            height: "100%",
            zIndex: 100,
            backgroundColor: "rgba(0,0,0,0.3)",
            fontSize: "12px",
            fontFamily: "sans-serif",
            textShadow: "1px 1px 1px black",
          }}
        >
          <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1, textAlign: "right", marginRight: 4 }}>
                fps:
              </div>
              <div style={{ flex: 1 }}>{fps.fps}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1, textAlign: "right", marginRight: 4 }}>
                avg:
              </div>
              <div style={{ flex: 1 }}>{Math.floor(fps.avg)}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: 18,
          fontSize: "12px",
          overflow: "hidden",
          width: WIDTH,
          textAlign: "center",
          border: "1px dotted #ccc",
          backgroundColor: "rgba(50,50,50,0.8)",
        }}
      >
        target: {targetFrameRate}
      </div>
    </div>
  );
});
