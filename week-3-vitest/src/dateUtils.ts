import {
  addDays,
  getYear,
  isAfter,
  isBefore,
  isSameDay as isSameDayFns,
} from "date-fns";
import { DATE_UNIT_TYPES } from "./constants";

type DateUnitType = (typeof DATE_UNIT_TYPES)[keyof typeof DATE_UNIT_TYPES];

export function getCurrentYear(): number {
  return getYear(new Date());
}

export function add(
  date: Date,
  amount: number,
  type: DateUnitType = DATE_UNIT_TYPES.DAYS
): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Invalid amount provided");
  }

  // Your constants default to DAYS; moment supported more units,
  // but this assignment's constants usually define what you need.
  if (type === DATE_UNIT_TYPES.DAYS) {
    return addDays(date, amount);
  }

  // If DATE_UNIT_TYPES includes more units in your repo (e.g., MONTHS/YEARS),
  // add them here using addMonths/addYears.
  throw new Error("Invalid type provided");
}

export function isWithinRange(date: Date, from: Date, to: Date): boolean {
  if (isAfter(from, to)) {
    throw new Error("Invalid range: from date must be before to date");
  }

  // moment().isBetween(from,to) is exclusive by default:
  return isAfter(date, from) && isBefore(date, to);
}

export function isDateBefore(date: Date, compareDate: Date): boolean {
  return isBefore(date, compareDate);
}

export function isSameDay(date: Date, compareDate: Date): boolean {
  return isSameDayFns(date, compareDate);
}

export async function getHolidays(year: number): Promise<Date[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        new Date(year, 0, 1),
        new Date(year, 11, 25),
        new Date(year, 11, 31),
      ]);
    }, 100);
  });
}

export async function isHoliday(date: Date): Promise<boolean> {
  const holidays = await getHolidays(date.getFullYear());
  return holidays.some((holiday) => isSameDay(date, holiday));
}
