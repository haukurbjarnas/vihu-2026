import { describe, it, expect } from "vitest";
import { stringCalculator } from "../src/stringCalculator";

describe("stringCalculator", () => {
  describe("basic functionality", () => {
    it("should return 0 for an empty string", () => {
      expect(stringCalculator("")).toBe(0);
    });

    it("should return the number for a single number string", () => {
      expect(stringCalculator("5")).toBe(5);
    });

    it("should add two comma-separated numbers", () => {
      expect(stringCalculator("1,2")).toBe(3);
    });

    it("should add multiple comma-separated numbers", () => {
      expect(stringCalculator("1,2,3,4,5")).toBe(15);
    });
  });

  describe("delimiter handling", () => {
    it("should handle newlines as delimiters", () => {
      expect(stringCalculator("1\n2,3")).toBe(6);
    });

    it("should ignore extra whitespace around values", () => {
      expect(stringCalculator(" 1, 2 ,3 ")).toBe(6);
    });

    it("should ignore empty segments (e.g. double commas)", () => {
      expect(stringCalculator("1,,2")).toBe(3);
    });
  });

  describe("error handling", () => {
    it("should throw an error for negative numbers", () => {
      expect(() => stringCalculator("-1,2")).toThrow(
        "Negative numbers not allowed: -1"
      );
    });

    it("should list all negative numbers in the error message", () => {
      expect(() => stringCalculator("-1,-2,3")).toThrow(
        "Negative numbers not allowed: -1, -2"
      );
    });
  });
});
