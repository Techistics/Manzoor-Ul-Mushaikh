import { PageHero } from "@/src/components/sections/PageHero";
import { siteConfig } from "@/src/config/site";

export default function ContactPage() {
  return (
    <main>
      <PageHero title={siteConfig.pageHeadings.contact} />
    </main>
  );
}
