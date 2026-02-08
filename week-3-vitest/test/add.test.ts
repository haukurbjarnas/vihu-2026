import { describe, it, expect} from "vitest";
import { add } from "../src/add";

describe("add", () => {
   it("should add two positive numbers", () => {
      expect(add(2, 3)).toBe(5);
   });

   it("should handle negative numbers", () => {
      expect(add(-1, -2)).toBe(-3);
      expect(add(-1, 5)).toBe(4);
   });

   it("should handle zero", () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
   });

   it("should handle decimal numbers", () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
   });

   it("should handle large numbers", () => {
      expect(add(1_000_000, 2_000_000)).toBe(3_000_000);
   });
});
