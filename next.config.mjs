/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "api.microlink.io" },
      { hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
