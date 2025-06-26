import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "dd834c54e841ca0c8f60a3ac5e2a142e.ipfscdn.io",
      },
      {
        hostname: "715e18ea7a4b45c99b992e34fe0676c0.ipfscdn.io",
      },
      {
        hostname: "dee5d9eee9ca3346186cc8316a92eb9e.ipfscdn.io",
      },
    ],
  },
};

export default nextConfig;
