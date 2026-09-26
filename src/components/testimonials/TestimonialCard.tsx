import type { Testimonial } from "@/data/testimonials";
import { Icon } from "@/components/shared/Icon";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";

export function TestimonialCard({ testimonial, locale }: { testimonial: Testimonial; locale: Locale }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-dark/5">
      <div className="flex gap-1 text-aqua" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Icon
            key={index}
            name="quality"
            className={index < testimonial.rating ? "h-4 w-4 text-aqua" : "h-4 w-4 text-dark/10"}
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-dark/70">
        &ldquo;{localize(testimonial.quote, locale)}&rdquo;
      </blockquote>
      <figcaption className="mt-5 border-t border-dark/5 pt-4">
        <p className="text-sm font-bold text-dark">{testimonial.name}</p>
        <p className="text-xs text-dark/50">{localize(testimonial.role, locale)}</p>
      </figcaption>
    </figure>
  );
}
