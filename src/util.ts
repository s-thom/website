// https://www.w3.org/TR/AERT/
const brightnessWeights = [
  299,
  587,
  114,
];

export function colorBrightness(color: string) {
  const match = color.match(/^#([0-9A-Fa-f]{1,2})([0-9A-Fa-f]{1,2})([0-9A-Fa-f]{1,2})$/);
  if (!match) {
    throw new Error(`${color} is not a hex code`);
  }

  const total = match
    .slice(1, 3) // Matched numbers
    .map(s => s.length === 1 ? `${s}${s}` : s) // Duplicate single letters, e.g. F -> FF
    .map(s => Number.parseInt(s, 16)) // Parse numbers
    .reduce((p, c, i) => p + (c * brightnessWeights[i]), 0); // Multiply by weight and sum
  
  return total / 1000;
}
