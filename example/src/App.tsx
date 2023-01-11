import FPSCounter from "@sethwebster/react-fps-counter";
import { SimpleStateRoot } from "@sethwebster/simple-state";
import { useState } from "react";
import SelectButtons from "./SelectButtons";
import StateDemo from "./StateDemo";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState(200);
  const [fpsVisible, setFpsVisible] = useState(true);
  const [samplePeriod, setSamplePeriod] = useState(1000);
  const [targetFrameRate, setTargetFrameRate] = useState(60);
  const [useAnimationFrames, setUseAnimationFrames] = useState(false);
  return (
    <div className="App">
      <SimpleStateRoot
        options={{ concurrentSafe: false, useDisatchQueue: false }}
      >
        <h1>FPS Counter Demo</h1>
        <a
          href="https://codesandbox.io/s/admiring-haslett-hluduf"
          target="_blank"
          rel="noreferrer"
        >
          Code Sandbox
        </a>
        <SelectButtons
          amount={amount}
          setAmount={setAmount}
          fpsVisible={fpsVisible}
          setFpsVisible={setFpsVisible}
          useAnimationFrames={useAnimationFrames}
          setUseAnimationFrames={setUseAnimationFrames}
        />
        <div
          style={{
            margin: "20px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div>
            <label htmlFor="samplePeriod" style={{ margin: "5px" }}>
              Sample Period
            </label>
            <input
              type="text"
              id="samplePeriod"
              value={samplePeriod}
              onChange={(e) =>
                setSamplePeriod(parseInt(e.currentTarget.value, 10) || 0)
              }
            />
          </div>
          <div>
            <label htmlFor="targetFrameRate" style={{ margin: "5px" }}>
              Target Frame Rate
            </label>
            <input
              type="text"
              id="targetFrameRate"
              value={targetFrameRate}
              onChange={(e) =>
                setTargetFrameRate(parseInt(e.currentTarget.value, 10) || 0)
              }
            />
          </div>
        </div>
        <StateDemo itemCount={amount} />
        <FPSCounter
          visible={fpsVisible}
          samplePeriod={samplePeriod}
          targetFrameRate={targetFrameRate}
          useAnimationFrames={useAnimationFrames}
        />
      </SimpleStateRoot>
    </div>
  );
}
