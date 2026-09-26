"use client";

import { useActionState } from "react";
import { saveSettingsAction, type SettingsFormState } from "./actions";
import { FormField, TextInput, TextArea, Select } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { OpeningHoursEditor } from "./OpeningHoursEditor";
import type { AdminBusinessSettingsRow } from "@/lib/data/business";

const initialState: SettingsFormState = { error: null, success: false };

export function SettingsForm({ settings }: { settings: AdminBusinessSettingsRow | null }) {
  const [state, formAction] = useActionState(saveSettingsAction, initialState);
  const openingHours = Array.isArray(settings?.opening_hours)
    ? (settings.opening_hours as Array<{ days: string; hours: string }>)
    : [];

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Saved.
        </p>
      )}

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">Identity</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Business name" htmlFor="business_name">
            <TextInput id="business_name" name="business_name" defaultValue={settings?.business_name} required />
          </FormField>
          <FormField label="Default language" htmlFor="default_language">
            <Select id="default_language" name="default_language" defaultValue={settings?.default_language ?? "en"}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </Select>
          </FormField>
          <FormField label="Tagline (English)" htmlFor="tagline_en">
            <TextInput id="tagline_en" name="tagline_en" defaultValue={settings?.tagline_en} />
          </FormField>
          <FormField label="Tagline (Hindi)" htmlFor="tagline_hi">
            <TextInput id="tagline_hi" name="tagline_hi" defaultValue={settings?.tagline_hi} />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Description (English)" htmlFor="description_en">
              <TextArea id="description_en" name="description_en" rows={3} defaultValue={settings?.description_en} />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField label="Description (Hindi)" htmlFor="description_hi">
              <TextArea id="description_hi" name="description_hi" rows={3} defaultValue={settings?.description_hi} />
            </FormField>
          </div>
          <ImageUploadField name="logo_url" label="Logo (optional)" bucket="site-assets" defaultValue={settings?.logo_url} />
          <ImageUploadField name="favicon_url" label="Favicon (optional)" bucket="site-assets" defaultValue={settings?.favicon_url} />
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">Contact</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Phone" htmlFor="phone">
            <TextInput id="phone" name="phone" defaultValue={settings?.phone} placeholder="+911234567890" />
          </FormField>
          <FormField label="WhatsApp number" htmlFor="whatsapp_number">
            <TextInput id="whatsapp_number" name="whatsapp_number" defaultValue={settings?.whatsapp_number} placeholder="+911234567890" />
          </FormField>
          <FormField label="Email" htmlFor="email">
            <TextInput id="email" name="email" type="email" defaultValue={settings?.email} />
          </FormField>
          <FormField label="Currency symbol" htmlFor="currency_symbol">
            <TextInput id="currency_symbol" name="currency_symbol" defaultValue={settings?.currency_symbol ?? "₹"} />
          </FormField>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">Address</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField label="Street address" htmlFor="address">
              <TextInput id="address" name="address" defaultValue={settings?.address} />
            </FormField>
          </div>
          <FormField label="City" htmlFor="city">
            <TextInput id="city" name="city" defaultValue={settings?.city} />
          </FormField>
          <FormField label="State" htmlFor="state">
            <TextInput id="state" name="state" defaultValue={settings?.state} />
          </FormField>
          <FormField label="Postal code" htmlFor="postal_code">
            <TextInput id="postal_code" name="postal_code" defaultValue={settings?.postal_code} />
          </FormField>
          <FormField label="Country" htmlFor="country">
            <TextInput id="country" name="country" defaultValue={settings?.country} />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Google Maps URL (optional)" htmlFor="google_maps_url">
              <TextInput id="google_maps_url" name="google_maps_url" type="url" defaultValue={settings?.google_maps_url} />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">Hours &amp; Social</h2>
        <div className="mt-4 space-y-4">
          <OpeningHoursEditor defaultValue={openingHours} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField label="Instagram URL" htmlFor="instagram_url">
              <TextInput id="instagram_url" name="instagram_url" type="url" defaultValue={settings?.instagram_url} />
            </FormField>
            <FormField label="Facebook URL" htmlFor="facebook_url">
              <TextInput id="facebook_url" name="facebook_url" type="url" defaultValue={settings?.facebook_url} />
            </FormField>
            <FormField label="YouTube URL" htmlFor="youtube_url">
              <TextInput id="youtube_url" name="youtube_url" type="url" defaultValue={settings?.youtube_url} />
            </FormField>
          </div>
        </div>
      </section>

      <SubmitButton>Save settings</SubmitButton>
    </form>
  );
}
