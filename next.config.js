/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'plaxr'; // Your repository name

const nextConfig = {
    // 1. Forces a static export (Creates the 'out' folder)
    output: 'export',

    // 2. Sets the base path for GitHub Pages only in production
    basePath: isProd ? `/${repoName}` : '',

    // 3. Disables image optimization (Required for static export)
    images: {
        unoptimized: true,
    },

    // 4. Expose base path to the client
    env: {
        NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
    },

    // 5. Enable trailing slash for GitHub Pages compatibility
    trailingSlash: true,
};

module.exports = nextConfig;
