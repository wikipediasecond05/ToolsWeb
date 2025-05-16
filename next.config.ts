import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        handlebars: "commonjs2 handlebars",
      });
    }
    return config;
  },
};

export default nextConfig;
