/**
 * Hand-written to match supabase/migrations/*.sql exactly, in the same
 * shape the Supabase CLI's generator produces. Once your project is linked
 * (see README → "Supabase setup"), regenerate the real thing with:
 *
 *   npx supabase gen types typescript --linked > src/lib/supabase/database.types.ts
 *
 * and it will safely overwrite this file.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          role: "admin";
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          role?: "admin";
          active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["admin_users"]["Insert"]>;
      Relationships: [];
      };
      business_settings: {
        Row: {
          id: string;
          business_name: string;
          tagline_en: string;
          tagline_hi: string;
          description_en: string;
          description_hi: string;
          phone: string;
          whatsapp_number: string;
          email: string;
          address: string;
          city: string;
          state: string;
          postal_code: string;
          country: string;
          currency_symbol: string;
          opening_hours: Json;
          google_maps_url: string;
          instagram_url: string;
          facebook_url: string;
          youtube_url: string;
          other_social_links: Json;
          logo_url: string;
          favicon_url: string;
          default_language: "en" | "hi";
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["business_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["business_settings"]["Row"]>;
      Relationships: [];
      };
      fish: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_hi: string;
          short_description_en: string;
          short_description_hi: string;
          description_en: string;
          description_hi: string;
          freshness_note_en: string;
          freshness_note_hi: string;
          price: number;
          price_unit: string;
          image_url: string;
          gallery: Json;
          availability: boolean;
          featured: boolean;
          display_order: number;
          seo_title_en: string;
          seo_title_hi: string;
          seo_description_en: string;
          seo_description_hi: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["fish"]["Row"]> & {
          slug: string;
          name_en: string;
        };
        Update: Partial<Database["public"]["Tables"]["fish"]["Row"]>;
      Relationships: [];
      };
      offers: {
        Row: {
          id: string;
          title_en: string;
          title_hi: string;
          description_en: string;
          description_hi: string;
          discount_text_en: string;
          discount_text_hi: string;
          image_url: string;
          start_date: string | null;
          end_date: string | null;
          active: boolean;
          featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["offers"]["Row"]> & { title_en: string };
        Update: Partial<Database["public"]["Tables"]["offers"]["Row"]>;
      Relationships: [];
      };
      videos: {
        Row: {
          id: string;
          title_en: string;
          title_hi: string;
          description_en: string;
          description_hi: string;
          video_url: string;
          poster_url: string;
          video_type: "uploaded" | "external";
          active: boolean;
          featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["videos"]["Row"]> & {
          title_en: string;
          video_url: string;
        };
        Update: Partial<Database["public"]["Tables"]["videos"]["Row"]>;
      Relationships: [];
      };
      reels: {
        Row: {
          id: string;
          title_en: string;
          title_hi: string;
          caption_en: string;
          caption_hi: string;
          video_url: string;
          thumbnail_url: string;
          platform: "instagram" | "facebook" | "youtube";
          social_url: string;
          active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["reels"]["Row"]> & {
          title_en: string;
          video_url: string;
        };
        Update: Partial<Database["public"]["Tables"]["reels"]["Row"]>;
      Relationships: [];
      };
      owner: {
        Row: {
          id: string;
          name_en: string;
          name_hi: string;
          role_en: string;
          role_hi: string;
          bio_en: string;
          bio_hi: string;
          image_url: string;
          instagram_url: string;
          active: boolean;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["owner"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["owner"]["Row"]>;
      Relationships: [];
      };
      faqs: {
        Row: {
          id: string;
          question_en: string;
          question_hi: string;
          answer_en: string;
          answer_hi: string;
          active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["faqs"]["Row"]> & { question_en: string };
        Update: Partial<Database["public"]["Tables"]["faqs"]["Row"]>;
      Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          customer_name: string;
          role_en: string;
          role_hi: string;
          content_en: string;
          content_hi: string;
          rating: number;
          image_url: string;
          active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["testimonials"]["Row"]> & {
          customer_name: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
      Relationships: [];
      };
      service_areas: {
        Row: {
          id: string;
          name_en: string;
          name_hi: string;
          description_en: string;
          description_hi: string;
          active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["service_areas"]["Row"]> & { name_en: string };
        Update: Partial<Database["public"]["Tables"]["service_areas"]["Row"]>;
      Relationships: [];
      };
      homepage_content: {
        Row: {
          id: string;
          section_key: string;
          content: Json;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["homepage_content"]["Row"]> & {
          section_key: string;
        };
        Update: Partial<Database["public"]["Tables"]["homepage_content"]["Row"]>;
      Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
  };
}
