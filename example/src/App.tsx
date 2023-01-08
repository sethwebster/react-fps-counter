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
  return (
    <div className="App">
      <SimpleStateRoot
        options={{ concurrentSafe: false, useDisatchQueue: false }}
      >
        <h1>FPS Counter Demo</h1>
        <SelectButtons
          amount={amount}
          setAmount={setAmount}
          fpsVisible={fpsVisible}
          setFpsVisible={setFpsVisible}
        />
        <div style={{ margin: "20px" }}>
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
        <StateDemo itemCount={amount} />
        <FPSCounter visible={fpsVisible} samplePeriod={samplePeriod} />
      </SimpleStateRoot>
    </div>
  );
}
