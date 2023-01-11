import { useMemo } from "react";
import DemoItem from "./DemoItem";

interface StateDemoProps {
  itemCount: number;
}

export default function StateDemo({ itemCount }: StateDemoProps) {
  const elements = useMemo(
    () =>
      Array.from(Array(itemCount).keys()).map((key) => (
        <DemoItem simpleKey={`simpleKey-${key}`} key={`simpleKey-${key}`} />
      )),
    [itemCount]
  );

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between"
      }}
    >
      {elements}
    </div>
  );
}
