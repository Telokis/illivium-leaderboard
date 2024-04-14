export function pad(value: number | string, length: number, padChar = "0") {
  return String(value).padStart(length, padChar);
}
