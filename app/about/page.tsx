import { PageHero } from "@/src/components/sections/PageHero";
import { siteConfig } from "@/src/config/site";

export default function AboutPage() {
  return (
    <main>
      <PageHero title={siteConfig.pageHeadings.about} />
    </main>
  );
}
