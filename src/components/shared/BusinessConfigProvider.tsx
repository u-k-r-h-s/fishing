"use client";

import { createContext, useContext } from "react";

interface BusinessContact {
  name: string;
  whatsapp: string;
  phone: string;
}

const BusinessContactContext = createContext<BusinessContact>({ name: "", whatsapp: "", phone: "" });

/**
 * Makes the real (Supabase-backed) WhatsApp number, phone number, and
 * business name available to WhatsAppButton/CallButton wherever they're
 * used — including deep inside client components (MobileMenu, Hero) that
 * can't fetch the business config themselves. Mounted once near the root
 * (see [locale]/layout.tsx) using the same `business` object already
 * fetched there via getBusinessConfig().
 *
 * Without this, WhatsAppButton/CallButton previously imported the static
 * placeholder demo `business` object directly (src/data/business.ts) —
 * meaning every WhatsApp/Call button on the live site used the fake demo
 * phone number "+911234567890" no matter what the admin set in Settings.
 */
export function BusinessConfigProvider({
  name,
  whatsapp,
  phone,
  children,
}: BusinessContact & { children: React.ReactNode }) {
  return (
    <BusinessContactContext.Provider value={{ name, whatsapp, phone }}>
      {children}
    </BusinessContactContext.Provider>
  );
}

export function useBusinessContact(): BusinessContact {
  return useContext(BusinessContactContext);
}
