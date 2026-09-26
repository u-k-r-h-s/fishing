/**
 * ============================================================
 *  FISH CATALOGUE — EDIT YOUR PRODUCTS HERE
 * ============================================================
 * Every fish card, catalogue page, and detail page
 * (/fresh-fish/[id]) is generated from this array.
 *
 * To add a fish: copy an existing object, give it a unique
 * `id` (used in the URL, e.g. /fresh-fish/rohu), and fill in
 * the fields.
 *
 * To remove a fish: delete its object from the array.
 *
 * Images referenced here live in `public/images/fish/`.
 * Replace those files with real photos any time — the
 * filenames can stay the same.
 *
 * The data below is DEMO / PLACEHOLDER content.
 * ============================================================
 */

export interface Fish {
  /** Unique slug, used in the URL: /fresh-fish/{id} */
  id: string;
  name: string;
  /** Path under /public, e.g. "/images/fish/rohu.svg" */
  image: string;
  /** Short one-line description shown on catalogue cards */
  description: string;
  /** Longer description shown on the fish detail page */
  longDescription: string;
  /** Display price string, e.g. "₹450/kg" */
  price: string;
  available: boolean;
  /** Show this fish in the homepage "Featured" rail */
  featured: boolean;
  /** Freshness / prep info shown on the detail page */
  freshnessNote: string;
  /** Optional overrides for SEO — sensible defaults are generated if omitted */
  seoTitle?: string;
  seoDescription?: string;
}

export const fish: Fish[] = [
  {
    id: "rohu",
    name: "Rohu",
    image: "/images/fish/rohu.svg",
    description: "A household favourite — soft, mild-flavoured river fish.",
    longDescription:
      "Rohu is a delicately flavoured freshwater fish, prized for its soft texture and versatility. It works beautifully in traditional curries, fries, or a simple home-style preparation. Each fish is hand-selected for firmness and clear, bright eyes before it reaches our counter.",
    price: "₹450/kg",
    available: true,
    featured: true,
    freshnessNote: "Sourced fresh daily. Cleaned and scaled on request at no extra cost.",
  },
  {
    id: "katla",
    name: "Katla",
    image: "/images/fish/katla.svg",
    description: "Firm, meaty freshwater fish, great for rich curries.",
    longDescription:
      "Katla is known for its firm, meaty flesh that holds together well in slow-cooked curries and gravies. A staple across many home kitchens, it's a reliable choice for family meals that need to feed a crowd.",
    price: "₹420/kg",
    available: true,
    featured: true,
    freshnessNote: "Delivered fresh from the local harbour every morning.",
  },
  {
    id: "hilsa",
    name: "Hilsa",
    image: "/images/fish/hilsa.svg",
    description: "The prized seasonal favourite, rich and full of flavour.",
    longDescription:
      "Hilsa (Ilish) is celebrated for its rich, buttery flavour and is considered a delicacy in many regional cuisines. Best enjoyed steamed in mustard sauce or lightly fried, it's a seasonal treat we source carefully to guarantee freshness.",
    price: "₹900/kg",
    available: true,
    featured: true,
    freshnessNote: "Seasonal availability — call ahead to confirm today's stock.",
  },
  {
    id: "prawns",
    name: "Prawns",
    image: "/images/fish/prawns.svg",
    description: "Plump, fresh-water prawns cleaned and deveined on request.",
    longDescription:
      "Our prawns are sorted by size and kept on ice from harvest to counter. Whether you're making a quick stir-fry or a festive prawn curry, we clean and devein them on request so you can start cooking right away.",
    price: "₹600/kg",
    available: true,
    featured: true,
    freshnessNote: "Cleaned and deveined on request. Available in small and jumbo sizes.",
  },
  {
    id: "pomfret",
    name: "Pomfret",
    image: "/images/fish/pomfret.svg",
    description: "Delicate white-fleshed fish, perfect for frying or grilling.",
    longDescription:
      "Pomfret's delicate, boneless-feeling white flesh makes it one of the most sought-after fish for frying, grilling, or a light tawa-fry with simple spices. We keep a close eye on size and freshness for every batch.",
    price: "₹700/kg",
    available: true,
    featured: false,
    freshnessNote: "Available whole or pre-cut into steaks on request.",
  },
  {
    id: "surmai",
    name: "Surmai",
    image: "/images/fish/surmai.svg",
    description: "Kingfish steaks — firm texture, minimal bones.",
    longDescription:
      "Surmai (Kingfish) is a firm, almost boneless fish that's ideal for pan-frying or tandoor-style preparations. Cut into steaks of your preferred thickness, it's a favourite for special weekend meals.",
    price: "₹800/kg",
    available: true,
    featured: false,
    freshnessNote: "Cut into steaks to your preferred thickness on request.",
  },
  {
    id: "tilapia",
    name: "Tilapia",
    image: "/images/fish/tilapia.svg",
    description: "Mild, easy-to-cook fish, great for everyday meals.",
    longDescription:
      "Tilapia's mild flavour and quick cooking time make it a practical everyday choice. It takes on marinades and spices well, making it a flexible option for weeknight dinners.",
    price: "₹380/kg",
    available: true,
    featured: false,
    freshnessNote: "Farm-raised and inspected fresh before sale.",
  },
  {
    id: "basa",
    name: "Basa",
    image: "/images/fish/basa.svg",
    description: "Soft, boneless fillets — ideal for quick, fuss-free cooking.",
    longDescription:
      "Basa fillets are soft, nearly boneless, and cook quickly — a convenient option for anyone who wants a fuss-free fish meal without the hassle of bones or scaling.",
    price: "₹350/kg",
    available: false,
    featured: false,
    freshnessNote: "Currently out of stock — check back soon or ask us directly.",
  },
];

/** Convenience helpers */
export const getFishById = (id: string): Fish | undefined =>
  fish.find((item) => item.id === id);

export const getFeaturedFish = (): Fish[] => fish.filter((item) => item.featured);

export const getAvailableFish = (): Fish[] => fish.filter((item) => item.available);
