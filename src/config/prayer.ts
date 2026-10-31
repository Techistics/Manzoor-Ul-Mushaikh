export const PRAYER_CITY = "Okara";
export const PRAYER_COUNTRY = "Pakistan";
export const PRAYER_METHOD = 1;
export const PRAYER_SCHOOL = 1;
export const PRAYER_TIMEZONE = "Asia/Karachi";

export const JAMAAT_OFFSET_MIN = {
  Fajr: 20,
  Dhuhr: 15,
  Asr: 15,
  Maghrib: 5,
  Isha: 15,
} as const;

export const JUMAH_JAMAAT = "1:30 PM";

export const FALLBACK = {
  Fajr: "04:58",
  Sunrise: "06:19",
  Dhuhr: "11:50",
  Asr: "16:04",
  Sunset: "17:20",
  Maghrib: "17:20",
  Isha: "19:03",
  Midnight: "00:00",
} as const;
