/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Forces a static export (Creates the 'out' folder)
  output: 'export',
  
  // 2. Sets the base path for GitHub Pages
  basePath: '/plaxr',

  // 3. Disables image optimization (Required for static export)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;