import { Hero } from "@/src/components/sections/home/Hero";
import { Donation } from "@/src/components/sections/home/Donation";
import { Highlights } from "@/src/components/sections/home/Highlights";
import { PrayerTimes } from "@/src/components/sections/home/PrayerTimes";
import { WhatWeDo } from "@/src/components/sections/home/WhatWeDo";
import { Activities } from "@/src/components/sections/home/Activities";
import { Testimonials } from "@/src/components/sections/home/Testimonials";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PrayerTimes />
      <WhatWeDo />
      <Highlights />
      {/* <Donation /> */}
      <Activities />
      {/* <Testimonials /> */}
    </main>
  );
}
