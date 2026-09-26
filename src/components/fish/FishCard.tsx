import Link from "next/link";
import Image from "next/image";
import type { Fish } from "@/data/fish";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { cn } from "@/lib/utils";

export function FishCard({ item }: { item: Fish }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-dark/5 transition-shadow duration-300 hover:shadow-lg"
      )}
    >
      <Link
        href={`/fresh-fish/${item.id}`}
        aria-label={`View details for ${item.name}`}
        className="relative block aspect-[4/3] overflow-hidden bg-mint/20"
      >
        <Image
          src={item.image}
          alt={`Fresh ${item.name}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
            item.available ? "bg-aqua text-navy" : "bg-dark/70 text-offwhite"
          )}
        >
          {item.available ? "Available Today" : "Currently Unavailable"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-ocean">{item.name}</p>
        <Link href={`/fresh-fish/${item.id}`} className="mt-1">
          <h3 className="text-lg font-bold text-dark hover:text-ocean">Fresh {item.name}</h3>
        </Link>
        <p className="mt-1.5 text-sm font-semibold text-dark/80">{item.price}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-dark/60">{item.description}</p>

        <WhatsAppButton
          fishName={item.name}
          label={`WhatsApp About ${item.name}`}
          variant="outline"
          className="mt-5 w-full"
        />
      </div>
    </article>
  );
}
