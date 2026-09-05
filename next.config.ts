import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the default bottom-left Next.js N-badge so /matches captures
  // do not overlay the Home tab glyph (C-2-02).
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.espncdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
