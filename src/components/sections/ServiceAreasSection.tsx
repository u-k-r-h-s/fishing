import { serviceAreas } from "@/data/serviceAreas";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Icon } from "@/components/shared/Icon";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function ServiceAreasSection() {
  return (
    <section className="bg-navy py-20 text-offwhite sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Where We Deliver"
            title="Proudly Serving These Areas"
            description="Not sure if we cover your location? Message us and we'll confirm right away."
            align="center"
            className="[&_h2]:text-offwhite [&_p]:text-offwhite/70"
          />
        </ScrollReveal>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area, index) => (
            <ScrollReveal key={area} delay={index * 0.04} as="span">
              <span className="flex items-center gap-2 rounded-full border border-offwhite/15 bg-offwhite/5 px-5 py-2.5 text-sm font-medium text-offwhite/85">
                <Icon name="map-pin" className="h-4 w-4 text-aqua" />
                {area}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
