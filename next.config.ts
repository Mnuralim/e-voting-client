import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "715e18ea7a4b45c99b992e34fe0676c0.ipfscdn.io",
      },
    ],
  },
};

export default nextConfig;
