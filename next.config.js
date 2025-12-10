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

    // 4. Expose base path to the client
    env: {
        NEXT_PUBLIC_BASE_PATH: '/plaxr',
    },

    // 5. Enable trailing slash for GitHub Pages compatibility
    trailingSlash: true,
};

module.exports = nextConfig;
