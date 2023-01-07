export type Color = "red" | "orange" | "yellow" | "green";
export type ColorTiers = Record<number, Color>;
const DEFAULT_COLOR_TIERS: ColorTiers = {
  0.1: "red",
  0.35: "orange",
  0.5: "yellow",
  0.75: "green",
};
export const getColor = (fps: number, targetFrameRate: number, colorTiers: ColorTiers = DEFAULT_COLOR_TIERS) => {
  const percent = fps / targetFrameRate;
  const keys = Object.keys(colorTiers).map((k) => parseFloat(k));

  let color = colorTiers[0.1];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (percent > key) {
      color = colorTiers[key as 0.1 | 0.35 | 0.5 | 0.75];
    }
  }
  return color;
};
