export function stringCalculator(input: string): number {
  if (input === "") return 0;

  // Replace newlines with commas, then split
  const normalized = input.replace(/\n/g, ",");
  const numbers = normalized
    .split(",")
    .map((n) => n.trim())
    .filter((n) => n.length > 0)
    .map((n) => parseInt(n, 10));

  // Check for negative numbers
  const negatives = numbers.filter((n) => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  return numbers.reduce((sum, num) => sum + num, 0);
}
