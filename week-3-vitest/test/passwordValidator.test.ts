import { describe, it, expect } from "vitest";
import { validatePassword } from "../src/passwordValidator";

describe("validatePassword", () => {
  it("should return valid=true when all rules pass", () => {
    const result = validatePassword("Abcdef1!");
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("should report length error", () => {
    const result = validatePassword("Ab1!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Password must be at least 8 characters");
  });

  it("should report missing uppercase", () => {
    const result = validatePassword("abcdef1!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Password must contain an uppercase letter");
  });

  it("should report missing lowercase", () => {
    const result = validatePassword("ABCDEFG1!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Password must contain a lowercase letter");
  });

  it("should report missing number", () => {
    const result = validatePassword("Abcdefg!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Password must contain a number");
  });

  it("should report missing special character", () => {
    const result = validatePassword("Abcdefg1");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Password must contain a special character (!@#$%^&*)"
    );
  });

  it("should list multiple errors when multiple rules fail", () => {
    const result = validatePassword("short");
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
  });
});
