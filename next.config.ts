import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/plaxr",
  output: "export",
  reactStrictMode: true,
  
  // REQUIRED: Next.js Image Optimization API doesn't work with static export.
  // This setting fixes the "Error: Image Optimization using Next.js..." build error.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;