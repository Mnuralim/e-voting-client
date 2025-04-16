import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "dd834c54e841ca0c8f60a3ac5e2a142e.ipfscdn.io",
      },
    ],
  },
};

export default nextConfig;
