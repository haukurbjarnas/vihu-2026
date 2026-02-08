import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  getCurrentYear,
  add,
  isWithinRange,
  isDateBefore,
  isSameDay,
  getHolidays,
  isHoliday,
} from "../dateUtils";
import { DATE_UNIT_TYPES } from "../constants";

describe("dateUtils", () => {
  describe("getCurrentYear", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return the current year (deterministic)", () => {
      vi.setSystemTime(new Date("1999-12-31T23:59:59Z"));
      expect(getCurrentYear()).toBe(1999);

      vi.setSystemTime(new Date("2024-06-01T10:00:00Z"));
      expect(getCurrentYear()).toBe(2024);
    });
  });

  describe("add(date, amount, type)", () => {
    it("should add days by default when type is omitted", () => {
      const date = new Date("2024-01-01T00:00:00.000Z");
      const result = add(date, 5);
      expect(result.toISOString()).toBe("2024-01-06T00:00:00.000Z");
    });

    it("should add days when type is DAYS", () => {
      const date = new Date("2024-01-01T00:00:00.000Z");
      const result = add(date, 1, DATE_UNIT_TYPES.DAYS);
      expect(result.toISOString()).toBe("2024-01-02T00:00:00.000Z");
    });

    it("should support negative amounts (subtract time)", () => {
      const date = new Date("2024-01-10T00:00:00.000Z");
      const result = add(date, -3, DATE_UNIT_TYPES.DAYS);
      expect(result.toISOString()).toBe("2024-01-07T00:00:00.000Z");
    });

    it("should throw when date is not a Date instance", () => {
      // @ts-expect-error
      expect(() => add("2024-01-01", 1)).toThrow("Invalid date provided");
    });

    it("should throw when date is an invalid Date", () => {
      expect(() => add(new Date("invalid"), 1)).toThrow("Invalid date provided");
    });

    it("should throw when amount is not a number", () => {
      // @ts-expect-error
      expect(() => add(new Date(), "1")).toThrow("Invalid amount provided");
    });

    it("should throw when amount is NaN", () => {
      expect(() => add(new Date(), Number.NaN)).toThrow("Invalid amount provided");
    });
  });

  describe("isWithinRange(date, from, to)", () => {
    it("should throw when from is after to", () => {
      const from = new Date("2024-01-10T00:00:00.000Z");
      const to = new Date("2024-01-01T00:00:00.000Z");
      expect(() => isWithinRange(new Date("2024-01-05T00:00:00.000Z"), from, to)).toThrow(
        "Invalid range: from date must be before to date"
      );
    });

    it("should return true when date is strictly between from and to", () => {
      const from = new Date("2024-01-01T00:00:00.000Z");
      const to = new Date("2024-01-10T00:00:00.000Z");
      const date = new Date("2024-01-05T00:00:00.000Z");
      expect(isWithinRange(date, from, to)).toBe(true);
    });

    it("should return false when date equals from or to (exclusive boundaries)", () => {
      const from = new Date("2024-01-01T00:00:00.000Z");
      const to = new Date("2024-01-10T00:00:00.000Z");
      expect(isWithinRange(from, from, to)).toBe(false);
      expect(isWithinRange(to, from, to)).toBe(false);
    });

    it("should return false when date is outside range", () => {
      const from = new Date("2024-01-01T00:00:00.000Z");
      const to = new Date("2024-01-10T00:00:00.000Z");
      expect(isWithinRange(new Date("2023-12-31T00:00:00.000Z"), from, to)).toBe(false);
      expect(isWithinRange(new Date("2024-01-11T00:00:00.000Z"), from, to)).toBe(false);
    });
  });

  describe("isDateBefore(date, compareDate)", () => {
    it("should return true if date is before compareDate", () => {
      expect(
        isDateBefore(new Date("2024-01-01T00:00:00.000Z"), new Date("2024-01-02T00:00:00.000Z"))
      ).toBe(true);
    });

    it("should return false if date is equal or after compareDate", () => {
      const same = new Date("2024-01-01T00:00:00.000Z");
      expect(isDateBefore(same, same)).toBe(false);
      expect(isDateBefore(new Date("2024-01-02T00:00:00.000Z"), same)).toBe(false);
    });
  });

  describe("isSameDay(date, compareDate)", () => {
    it("should return true for same day even if times differ", () => {
      const a = new Date("2024-12-25T00:00:01.000Z");
      const b = new Date("2024-12-25T23:59:59.000Z");
      expect(isSameDay(a, b)).toBe(true);
    });

    it("should return false for different days", () => {
      const a = new Date("2024-12-25T23:59:59.000Z");
      const b = new Date("2024-12-26T00:00:00.000Z");
      expect(isSameDay(a, b)).toBe(false);
    });
  });

  describe("getHolidays(year)", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should resolve with the expected holidays for a given year", async () => {
      const promise = getHolidays(2024);

      await vi.advanceTimersByTimeAsync(100);

      const holidays = await promise;
      expect(holidays).toEqual([
        new Date(2024, 0, 1),
        new Date(2024, 11, 25),
        new Date(2024, 11, 31),
      ]);
    });
  });

  describe("isHoliday(date)", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return true if the date is a holiday", async () => {
      const promise = isHoliday(new Date(2024, 11, 25, 15, 30));
      await vi.advanceTimersByTimeAsync(100);
      await expect(promise).resolves.toBe(true);
    });

    it("should return false if the date is not a holiday", async () => {
      const promise = isHoliday(new Date(2024, 11, 24, 12, 0));
      await vi.advanceTimersByTimeAsync(100);
      await expect(promise).resolves.toBe(false);
    });
  });
});
