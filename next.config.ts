import type { NextConfig } from "next";
import path from "path";

// Allow next/image to load photos/posters/thumbnails uploaded to Supabase
// Storage (adminUploadField etc. store a public storage.googleapis-style
// URL on the project's own domain). Falls back to matching any
// *.supabase.co project if the env var isn't set yet.
function supabaseImageHostname(): string {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").hostname;
  } catch {
    return "";
  }
}

const supabaseHostname = supabaseImageHostname();

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHostname || "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
