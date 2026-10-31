import { FALLBACK, JAMAAT_OFFSET_MIN } from "@/src/config/prayer";

export const PRAYER_NAMES = ["Fajr", "Zuhr", "Asr", "Mugrib", "Isha"] as const;

export type PrayerName = (typeof PRAYER_NAMES)[number];
export type PrayerEvent =
  | "Fajr"
  | "Sunrise"
  | "Dhuhr"
  | "Asr"
  | "Sunset"
  | "Maghrib"
  | "Isha"
  | "Midnight";
export type PrayerTimings = Record<PrayerEvent, string>;

export type PrayerTime = {
  name: PrayerName;
  azan: string;
  jamaat: string;
  ends: string;
};

export type PrayerTimesResponse = {
  prayers: PrayerTime[];
  sunrise: string;
  fallback: boolean;
};

const prayerDefinitions: {
  name: PrayerName;
  start: PrayerEvent;
  offset: keyof typeof JAMAAT_OFFSET_MIN;
  ends: PrayerEvent;
}[] = [
  { name: "Fajr", start: "Fajr", offset: "Fajr", ends: "Sunrise" },
  { name: "Zuhr", start: "Dhuhr", offset: "Dhuhr", ends: "Asr" },
  { name: "Asr", start: "Asr", offset: "Asr", ends: "Sunset" },
  { name: "Mugrib", start: "Maghrib", offset: "Maghrib", ends: "Isha" },
  { name: "Isha", start: "Isha", offset: "Isha", ends: "Midnight" },
];

export function toMinutes(time: string): number {
  const normalized = time.trim().replace(/\s*\([^)]*\)\s*$/, "");
  const match = /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i.exec(normalized);

  if (!match) {
    throw new RangeError(`Invalid prayer time: ${time}`);
  }

  const [, rawHour, rawMinute, rawPeriod] = match;
  const hour = Number(rawHour);
  const minute = Number(rawMinute);

  if (minute > 59 || hour > (rawPeriod ? 12 : 23) || (rawPeriod && hour < 1)) {
    throw new RangeError(`Invalid prayer time: ${time}`);
  }

  const hourOfDay = rawPeriod
    ? (hour % 12) + (rawPeriod.toUpperCase() === "PM" ? 12 : 0)
    : hour;

  return hourOfDay * 60 + minute;
}

export function formatTime(minutes: number): string {
  const normalizedMinutes = ((Math.trunc(minutes) % 1440) + 1440) % 1440;
  const hour = Math.floor(normalizedMinutes / 60);
  const minute = normalizedMinutes % 60;
  const displayHour = hour % 12 || 12;
  const period = hour < 12 ? "AM" : "PM";

  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

export function addMinutes(time: string, minutes: number): string {
  return formatTime(toMinutes(time) + minutes);
}

export function createPrayerTimesResponse(
  timings: PrayerTimings,
  fallback: boolean,
): PrayerTimesResponse {
  const prayers = prayerDefinitions.map(({ name, start, offset, ends }) => ({
    name,
    azan: formatTime(toMinutes(timings[start])),
    jamaat: addMinutes(timings[start], JAMAAT_OFFSET_MIN[offset]),
    ends: formatTime(toMinutes(timings[ends])),
  }));

  return {
    prayers,
    sunrise: formatTime(toMinutes(timings.Sunrise)),
    fallback,
  };
}

export function getFallbackPrayerTimes(): PrayerTimesResponse {
  return createPrayerTimesResponse(FALLBACK, true);
}
