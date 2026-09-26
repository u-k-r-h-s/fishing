import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import { localize } from "@/i18n/types";
import type { VideoItem } from "@/data/videos";

export function VideoShowcaseSection({
  locale,
  dict,
  featured,
  supporting,
}: {
  locale: Locale;
  dict: Dictionary;
  featured: VideoItem | null;
  supporting: VideoItem[];
}) {
  if (!featured) return null;

  return (
    <section className="bg-navy py-20 text-offwhite sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow={dict.video.eyebrow}
            title={dict.video.heading}
            description={dict.video.description}
            className="[&_h2]:text-offwhite [&_p]:text-offwhite/70"
          />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ScrollReveal className="lg:row-span-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl lg:aspect-auto lg:h-full">
              <VideoPlayer
                src={featured.video}
                poster={featured.poster}
                title={localize(featured.title, locale)}
                dict={dict}
                className="h-full w-full"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">{localize(featured.title, locale)}</h3>
              <p className="mt-1 text-sm text-offwhite/70">{localize(featured.description, locale)}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {supporting.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.08}>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                  <VideoPlayer
                    src={item.video}
                    poster={item.poster}
                    title={localize(item.title, locale)}
                    dict={dict}
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-bold">{localize(item.title, locale)}</h3>
                  <p className="mt-1 text-xs text-offwhite/60">{localize(item.description, locale)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
