function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const t = (value - inMin) / (inMax - inMin)
  const result = lerp(outMin, outMax, t)

  // Clamp the result between outMin and outMax
  return outMin < outMax
    ? Math.min(Math.max(result, outMin), outMax)
    : Math.min(Math.max(result, outMax), outMin)
}
