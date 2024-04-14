import { lerpBounds } from "./lerp";

function interpolateColor(
  color1: string,
  color2: string,
  ratio: number,
): string {
  const hexToRgb = (hex: string): number[] => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  const rgbToHex = (rgb: number[]): string => {
    const [r, g, b] = rgb;
    const componentToHex = (c: number): string => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
  };

  const color1Rgb = hexToRgb(color1);
  const color2Rgb = hexToRgb(color2);

  const interpolatedRgb = color1Rgb.map((c1, index) => {
    const c2 = color2Rgb[index];
    const interpolatedValue = Math.round(c1 + (c2 - c1) * ratio);

    return interpolatedValue;
  });

  return rgbToHex(interpolatedRgb);
}

const colorScale: [number, string][] = [
  [200, "#ffffff"], // 0
  [250, "#f6fff3"], // 1
  [375, "#e0ffd3"], // 2
  [500, "#c8ffb4"], // 3
  [625, "#adff94"], // 4
  [750, "#8eff72"], // 5
  [875, "#67ff4c"], // 6
  [1000, "#1eff00"], // 7
  [1120, "#3cf338"], // 8
  [1240, "#4ce750"], // 9
  [1360, "#55db64"], // 10
  [1480, "#5bcf74"], // 11
  [1600, "#5fc383"], // 12
  [1720, "#5fb791"], // 13
  [1840, "#5eab9e"], // 14
  [1960, "#5aa0aa"], // 15
  [2080, "#5394b7"], // 16
  [2200, "#4889c3"], // 17
  [2320, "#387dcf"], // 18
  [2440, "#1472db"], // 19
  [2620, "#5864e2"], // 20
  [2740, "#864fe9"], // 21
  [2875, "#a836e9"], // 22
  [2995, "#bc3fd1"], // 23
  [3115, "#cc47b8"], // 24
  [3235, "#d951a0"], // 25
  [3355, "#e45a88"], // 26
  [3475, "#ec6370"], // 27
  [3595, "#f46d56"], // 28
  [3715, "#fa7738"], // 29
  [3875, "#ff8000"], // 30
];

export function getRankColor(points: number): string {
  if (points <= colorScale[0][0]) {
    return colorScale[0][1];
  }

  if (points >= colorScale[colorScale.length - 1][0]) {
    return colorScale[colorScale.length - 1][1];
  }

  for (let i = 1; i < colorScale.length; i++) {
    if (points <= colorScale[i][0]) {
      const [points1, color1] = colorScale[i - 1];
      const [points2, color2] = colorScale[i];
      const ratio = (points - points1) / (points2 - points1);

      return interpolateColor(color1, color2, ratio);
    }
  }

  return "#000000";
}

export function getRankScale(points: number): number {
  if (points <= colorScale[0][0]) {
    return 0;
  }

  if (points >= colorScale[colorScale.length - 1][0]) {
    return 1;
  }

  return lerpBounds(points, 0, colorScale[colorScale.length - 1][0], 0, 1);
}
