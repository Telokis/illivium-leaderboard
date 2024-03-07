function interpolateColor(color1: string, color2: string, ratio: number): string {
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

export function getRankColor(points: number): string {
  const colorScale: [number, string][] = [
    [200, "#ffffff"],
    [250, "#f6fff3"],
    [375, "#e0ffd3"],
    [500, "#c8ffb4"],
    [625, "#adff94"],
    [750, "#8eff72"],
    [875, "#67ff4c"],
    [1000, "#1eff00"],
    [1120, "#3cf338"],
    [1240, "#4ce750"],
    [1360, "#55db64"],
    [1480, "#5bcf74"],
    [1600, "#5fc383"],
    [1720, "#5fb791"],
    [1840, "#5eab9e"],
    [1960, "#5aa0aa"],
    [2080, "#5394b7"],
    [2200, "#4889c3"],
    [2320, "#387dcf"],
    [2440, "#1472db"],
    [2620, "#5864e2"],
    [2740, "#864fe9"],
    [2875, "#a836e9"],
    [2995, "#bc3fd1"],
    [3115, "#cc47b8"],
    [3235, "#d951a0"],
    [3355, "#e45a88"],
    [3475, "#ec6370"],
    [3595, "#f46d56"],
    [3715, "#fa7738"],
    [3875, "#ff8000"],
  ];

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
