import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: false, // Disable Strict Mode

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Allow all domains
      },
    ],
  },
};

export default nextConfig;
