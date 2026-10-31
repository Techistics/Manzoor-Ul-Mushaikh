import {
  FALLBACK,
  PRAYER_CITY,
  PRAYER_COUNTRY,
  PRAYER_METHOD,
  PRAYER_SCHOOL,
  PRAYER_TIMEZONE,
} from "@/src/config/prayer";
import {
  createPrayerTimesResponse,
  toMinutes,
  type PrayerEvent,
  type PrayerTimings,
} from "@/src/lib/prayer";

function getTodayInKarachi(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: PRAYER_TIMEZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(new Date());
  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return `${part("day")}-${part("month")}-${part("year")}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getTimings(payload: unknown): PrayerTimings {
  if (
    !isRecord(payload) ||
    !isRecord(payload.data) ||
    !isRecord(payload.data.timings)
  ) {
    throw new Error("Aladhan response is missing prayer timings.");
  }

  const eventNames: PrayerEvent[] = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Sunset",
    "Maghrib",
    "Isha",
    "Midnight",
  ];
  const timings = {} as PrayerTimings;

  for (const event of eventNames) {
    const time = payload.data.timings[event];

    if (typeof time !== "string") {
      throw new Error(`Aladhan response is missing ${event}.`);
    }

    toMinutes(time);
    timings[event] = time;
  }

  return timings;
}

export async function GET(): Promise<Response> {
  const date = getTodayInKarachi();
  const url = new URL(`https://api.aladhan.com/v1/timingsByCity/${date}`);
  url.searchParams.set("city", PRAYER_CITY);
  url.searchParams.set("country", PRAYER_COUNTRY);
  url.searchParams.set("method", String(PRAYER_METHOD));
  url.searchParams.set("school", String(PRAYER_SCHOOL));

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error(`Aladhan returned HTTP ${response.status}.`);
    }

    const payload: unknown = await response.json();
    const timings = getTimings(payload);

    return Response.json(createPrayerTimesResponse(timings, false));
  } catch (error) {
    console.error("Failed to fetch prayer times from Aladhan.", error);
    return Response.json(createPrayerTimesResponse(FALLBACK, true));
  }
}
