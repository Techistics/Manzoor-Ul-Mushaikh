"use client";

import { useEffect, useState } from "react";
import { Container } from "@/src/components/ui/Container";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { JUMAH_JAMAAT, PRAYER_TIMEZONE } from "@/src/config/prayer";
import { siteConfig } from "@/src/config/site";
import {
  PRAYER_NAMES,
  getFallbackPrayerTimes,
  toMinutes,
  type PrayerName,
  type PrayerTime,
  type PrayerTimesResponse,
} from "@/src/lib/prayer";

type PrayerCard = Omit<PrayerTime, "name"> & {
  name: PrayerName | "Jumah";
};

function getTimeParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: siteConfig.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(date);
  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return {
    clock: `${part("hour")}:${part("minute")}:${part("second")}`,
    period: part("dayPeriod"),
  };
}

function getDateLabel(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: siteConfig.timezone,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);
  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return `${part("day")} ${part("month")}, ${part("year")}`;
}

function getMinutesOfDay(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: PRAYER_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const part = (type: string) =>
    Number(parts.find((item) => item.type === type)?.value ?? 0);

  return part("hour") * 60 + part("minute");
}

function getKarachiDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: PRAYER_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return `${part("year")}-${part("month")}-${part("day")}`;
}

function isWithinPrayerWindow(now: number, start: string, end: string) {
  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);

  return startMinutes <= endMinutes
    ? now >= startMinutes && now < endMinutes
    : now >= startMinutes || now < endMinutes;
}

function PrayerTile({
  prayer,
  index,
  isActive,
  isLoading,
  className,
}: {
  prayer: PrayerCard;
  index: number;
  isActive: boolean;
  isLoading: boolean;
  className?: string;
}) {
  const tile = (
    <div
      className={`flex h-[124px] w-full flex-col overflow-hidden rounded-lg shadow-sm ${
        isActive ? "bg-white text-ink" : "bg-ink text-white"
      }`}
    >
      <h3 className="flex min-h-[48px] items-center justify-center px-2 text-center text-lg font-bold">
        {prayer.name}
      </h3>
      <div className="h-px w-full bg-current/25" />
      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-2 text-center text-xs font-semibold sm:text-sm">
        {isLoading ? (
          <>
            <span className="h-3 w-16 animate-pulse rounded bg-current/20" />
            <span className="h-3 w-24 animate-pulse rounded bg-current/20" />
            <span className="h-3 w-24 animate-pulse rounded bg-current/20" />
          </>
        ) : (
          <>
            <span>{prayer.jamaat || "--"}</span>
            <span>Azan: {prayer.azan || "--"}</span>
            <span>Ends: {prayer.ends || "--"}</span>
          </>
        )}
      </div>
    </div>
  );

  return isActive ? (
    <div className={className}>{tile}</div>
  ) : (
    <FadeIn delay={index * 0.05} className={className}>
      {tile}
    </FadeIn>
  );
}

export function PrayerTimes() {
  const [now, setNow] = useState<Date | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesResponse | null>(
    null,
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let currentDateKey = "";
    const updateTime = () => {
      const currentTime = new Date();
      const nextDateKey = getKarachiDateKey(currentTime);

      setNow(currentTime);

      if (currentDateKey && nextDateKey !== currentDateKey) {
        setRefreshKey((key) => key + 1);
      }

      currentDateKey = nextDateKey;
    };

    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchPrayerTimes() {
      setIsLoading(true);

      try {
        const response = await fetch("/api/prayer-times");

        if (!response.ok) {
          throw new Error(`Prayer times request returned HTTP ${response.status}.`);
        }

        const payload: unknown = await response.json();

        if (!isPrayerTimesResponse(payload)) {
          throw new Error("Prayer times response has an invalid shape.");
        }

        if (!cancelled) {
          setPrayerTimes(payload);
        }
      } catch (error) {
        console.error("Failed to load prayer times.", error);
        if (!cancelled) {
          setPrayerTimes(getFallbackPrayerTimes());
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void fetchPrayerTimes();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const prayerByName = new Map(
    prayerTimes?.prayers.map((prayer) => [prayer.name, prayer]) ?? [],
  );
  const jumah: PrayerCard = {
    name: "Jumah",
    azan: prayerByName.get("Zuhr")?.azan ?? "",
    jamaat: JUMAH_JAMAAT,
    ends: prayerByName.get("Zuhr")?.ends ?? "",
  };
  const activePrayerName = now
    ? PRAYER_NAMES.find((name) => {
        const prayer = prayerByName.get(name);

        return (
          prayer !== undefined &&
          isWithinPrayerWindow(
            getMinutesOfDay(now),
            prayer.azan,
            prayer.ends,
          )
        );
      })
    : undefined;

  return (
    <section
      aria-labelledby="prayer-times-heading"
      className="relative isolate overflow-x-clip py-[60px]"
      id="prayer-times"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-16 z-0 size-[430px] rounded-full border-[20px] border-ink/[0.035] md:-right-24 md:size-[570px]"
      />
      <Container className="relative z-10">
        <FadeIn className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-start md:justify-between md:gap-10">
          <h2
            className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl"
            id="prayer-times-heading"
          >
            Prayer Times
          </h2>
          <p className="max-w-[400px] text-left text-lg  leading-6 text-black">
            الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ
          </p>
        </FadeIn>

        <FadeIn>
          <div
            className="relative isolate grid grid-cols-2 items-stretch gap-4 rounded-3xl p-5 text-white md:grid-cols-6 md:gap-5 md:p-8 lg:grid-cols-5 lg:gap-5 lg:p-10"
            style={{
              backgroundImage: siteConfig.images.prayerBg
                ? `url("${siteConfig.images.prayerBg}")`
                : "linear-gradient(135deg, #84999a 0%, #a8b1ad 48%, #718787 100%)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 z-0 rounded-3xl bg-[#263f43]/45"
            />

            <div className="relative z-10 col-span-2 flex min-h-[180px] flex-col items-center justify-center text-center md:col-span-6 md:min-h-[200px] lg:col-span-3 lg:col-start-2 lg:row-start-1 lg:min-h-[220px]">
              <p className="text-base font-medium text-white/90 md:text-xl">
                {siteConfig.displayName}
              </p>
              <div
                aria-live="off"
                className="mt-1 flex items-baseline justify-center gap-2 font-semibold leading-none tracking-tight"
              >
                <time className="text-[clamp(3.5rem,8vw,4.5rem)]">
                  {now ? getTimeParts(now).clock : "--:--:--"}
                </time>
                {now && (
                  <span className="text-base font-semibold uppercase">
                    {getTimeParts(now).period}
                  </span>
                )}
              </div>
              <p className="mt-3 text-base font-medium text-white/90 md:text-lg">
                {now ? getDateLabel(now) : ""}
              </p>
            </div>

            <div className="relative z-10 col-span-1 md:col-span-3 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:self-center">
              {jumah && (
                <PrayerTile
                  prayer={jumah}
                  index={0}
                  isActive={false}
                  isLoading={isLoading}
                  className="w-full"
                />
              )}
            </div>

            <>
              {PRAYER_NAMES.map((name: PrayerName, index) => (
                <PrayerTile
                  key={name}
                  prayer={
                    prayerByName.get(name) ?? {
                      name,
                      azan: "",
                      jamaat: "",
                      ends: "",
                    }
                  }
                  index={index + 2}
                  isActive={name === activePrayerName}
                  isLoading={isLoading}
                  className="col-span-1 w-full md:col-span-2 lg:col-span-1 lg:row-start-2"
                />
              ))}
            </>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function isPrayerTimesResponse(
  value: unknown,
): value is PrayerTimesResponse {
  if (
    typeof value !== "object" ||
    value === null ||
    !("prayers" in value) ||
    !Array.isArray(value.prayers) ||
    !("sunrise" in value) ||
    typeof value.sunrise !== "string" ||
    !("fallback" in value) ||
    typeof value.fallback !== "boolean"
  ) {
    return false;
  }

  const prayersAreValid = value.prayers.every(
    (prayer: unknown) =>
      typeof prayer === "object" &&
      prayer !== null &&
      "name" in prayer &&
      typeof prayer.name === "string" &&
      PRAYER_NAMES.some((name) => name === prayer.name) &&
      "azan" in prayer &&
      typeof prayer.azan === "string" &&
      "jamaat" in prayer &&
      typeof prayer.jamaat === "string" &&
      "ends" in prayer &&
      typeof prayer.ends === "string",
  );

  if (!prayersAreValid || value.prayers.length !== PRAYER_NAMES.length) {
    return false;
  }

  try {
    toMinutes(value.sunrise);
    const names = new Set(
      value.prayers.flatMap((prayer) =>
        typeof prayer === "object" &&
        prayer !== null &&
        "name" in prayer &&
        typeof prayer.name === "string"
          ? [prayer.name]
          : [],
      ),
    );

    if (PRAYER_NAMES.some((name) => !names.has(name))) {
      return false;
    }

    return value.prayers.every((prayer) => {
      if (typeof prayer !== "object" || prayer === null) {
        return false;
      }

      return (
        "azan" in prayer &&
        typeof prayer.azan === "string" &&
        toMinutes(prayer.azan) >= 0 &&
        "jamaat" in prayer &&
        typeof prayer.jamaat === "string" &&
        toMinutes(prayer.jamaat) >= 0 &&
        "ends" in prayer &&
        typeof prayer.ends === "string" &&
        toMinutes(prayer.ends) >= 0
      );
    });
  } catch {
    return false;
  }
}
