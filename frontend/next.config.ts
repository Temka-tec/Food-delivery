import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
