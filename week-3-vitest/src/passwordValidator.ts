export type PasswordValidationResult = {
  valid: boolean;
  errors: string[];
};

const SPECIAL = /[!@#$%^&*]/;
const UPPER = /[A-Z]/;
const LOWER = /[a-z]/;
const NUMBER = /[0-9]/;

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < 8) errors.push("Password must be at least 8 characters");
  if (!UPPER.test(password)) errors.push("Password must contain an uppercase letter");
  if (!LOWER.test(password)) errors.push("Password must contain a lowercase letter");
  if (!NUMBER.test(password)) errors.push("Password must contain a number");
  if (!SPECIAL.test(password)) errors.push("Password must contain a special character (!@#$%^&*)");

  return { valid: errors.length === 0, errors };
}
