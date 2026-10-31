import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const buttonVariants = ["primary", "secondary", "outline"] as const;
const buttonSizes = ["sm", "md", "lg"] as const;

const previewContent = {
  title: "UI Preview",
  subtitle: "Reusable button styles, sizes, and section headings.",
  buttonsHeading: "Buttons",
  leftHeading: "Left aligned heading",
  leftSubtitle: "A short subtitle below the heading.",
  centerHeading: "Centered heading",
  centerSubtitle: "Supporting copy centered under the heading.",
  disabledLabel: "Disabled",
  linkLabel: "Link button",
} as const;

export default function UiPreviewPage() {
  return (
    <main className="py-12 md:py-16">
      <Container className="space-y-12">
        <SectionHeading
          title={previewContent.title}
          subtitle={previewContent.subtitle}
        />

        <section aria-labelledby="button-variants-heading" className="space-y-6">
          <h2
            className="text-xl font-bold text-ink"
            id="button-variants-heading"
          >
            {previewContent.buttonsHeading}
          </h2>
          {buttonVariants.map((variant) => (
            <div className="space-y-3" key={variant}>
              <h3 className="text-sm font-semibold capitalize text-muted">
                {variant}
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                {buttonSizes.map((size) => (
                  <Button key={size} size={size} variant={variant}>
                    {`${variant} ${size}`}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-4">
            <Button disabled>{previewContent.disabledLabel}</Button>
            <Button href="/about">{previewContent.linkLabel}</Button>
          </div>
        </section>

        <section aria-label={previewContent.leftHeading} className="space-y-8">
          <SectionHeading
            title={previewContent.leftHeading}
            subtitle={previewContent.leftSubtitle}
          />
          <SectionHeading
            align="center"
            title={previewContent.centerHeading}
            subtitle={previewContent.centerSubtitle}
          />
        </section>

        <FadeIn delay={0.1}>
          <div className="rounded-xl bg-surface p-6">
            <SectionHeading
              align="center"
              title={previewContent.centerHeading}
              subtitle={previewContent.centerSubtitle}
            />
          </div>
        </FadeIn>
      </Container>
    </main>
  );
}
