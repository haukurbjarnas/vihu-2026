import { describe, it, expect } from "vitest";
import { unique, flatten, chunk } from "../src/arrayUtils";

describe("arrayUtils", () => {
  describe("unique", () => {
    it("should remove duplicates and preserve first occurrence order", () => {
      expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
      expect(unique(["a", "a", "b"])).toEqual(["a", "b"]);
    });

    it("should handle empty arrays", () => {
      expect(unique([])).toEqual([]);
    });
  });

  describe("flatten", () => {
    it("should flatten nested arrays", () => {
      expect(flatten<number>([1, [2, [3]], 4])).toEqual([1, 2, 3, 4]);
    });

    it("should return empty array for empty input", () => {
      expect(flatten([])).toEqual([]);
    });
  });

  describe("chunk", () => {
    it("should split array into chunks of given size", () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it("should return one chunk when size >= array length", () => {
      expect(chunk([1, 2, 3], 10)).toEqual([[1, 2, 3]]);
    });

    it("should return empty array for empty input", () => {
      expect(chunk([], 3)).toEqual([]);
    });

    it("should throw for invalid chunk size", () => {
      expect(() => chunk([1, 2, 3], 0)).toThrow("Chunk size must be a positive integer");
      expect(() => chunk([1, 2, 3], -1)).toThrow("Chunk size must be a positive integer");
    });
  });
});
