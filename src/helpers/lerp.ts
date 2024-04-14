export function lerp(val: number, minOut: number, maxOut: number): number {
  return val * (maxOut - minOut) + minOut;
}

export function lerpBounds(
  val: number,
  minIn: number,
  maxIn: number,
  minOut: number,
  maxOut: number,
): number {
  return lerp((val - minIn) / (maxIn - minIn), minOut, maxOut);
}

export function xerp(
  val: number,
  minOut: number,
  maxOut: number,
  expFactor: number,
): number {
  return lerp(Math.pow(val, expFactor), minOut, maxOut);
}
