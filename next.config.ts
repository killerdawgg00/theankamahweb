import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Portfolio imagery is bundled with the site. Avoid the Cloudflare image
  // transformation endpoint, which is unavailable when ASSETS/IMAGES bindings
  // are not present in local and standard Vercel-style deployments.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
