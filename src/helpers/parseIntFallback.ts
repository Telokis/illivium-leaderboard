/**
 * Parses a string to an integer, and returns a fallback value if the parsing fails.
 * @param value The string to parse.
 * @param fallback The fallback value to return if the parsing fails.
 * @returns The parsed integer, or the fallback value if the parsing fails.
 */
export function parseIntFallback(value: string, fallback: number): number {
  try {
    return parseInt(value, 10);
  } catch (e) {
    return fallback;
  }
}
