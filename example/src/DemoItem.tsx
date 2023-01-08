import { useDerivedQuark, useQuark } from "@sethwebster/simple-state";
import { useEffect } from "react";
import randomNumberInRange from "./helpers/random-number-in-range";

export function DerivedItem({ simpleKey }: { simpleKey: string }) {
  const value = useDerivedQuark(`${simpleKey}-derived`, ({ get }) => {
    return get<number>(simpleKey) * 2;
  });
  return (
    <div
      style={{
        // flex: 1,
        padding: 5,
        margin: 5,
        backgroundColor: "#CCC",
        width: "70px"
      }}
    >
      {value}
    </div>
  );
}

export default function DemoItem({ simpleKey, period = 300 }: { simpleKey: string, period?: number }) {
  const [number, setNumber] = useQuark<number>(
    simpleKey,
    randomNumberInRange(0, 99)
  );  

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber(randomNumberInRange(0, 99));
    }, period);
    return () => clearInterval(interval);
  }, [period, setNumber]);

  return (
    <div>
      <div
        style={{
          // flex: 1,
          padding: 5,
          margin: 5,
          backgroundColor: "#AAA",
          width: "70px"
        }}
      >
        {number}
      </div>
      <DerivedItem simpleKey={simpleKey} />
    </div>
  );
}
