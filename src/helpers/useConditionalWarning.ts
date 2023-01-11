import { useEffect, useRef } from "react";

export default function useConditionalWarning(condition: boolean, text: string) {
  const hasWarned = useRef(false);

  useEffect(() => {
    if (!hasWarned.current && condition) {
      console.warn(text);
      hasWarned.current = true;
    }
  }, []);
}