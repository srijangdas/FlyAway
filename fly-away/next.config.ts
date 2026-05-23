import type { NextConfig } from "next";

import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",

  register: true,

  skipWaiting: true,

  disable: process.env.NODE_ENV === "development",

  fallBacks: {
    document: "/~offline",
  },

  runtimeCaching: [
    {
      urlPattern:
        /^https:\/\/qtqyxfvfgladmvrupyef\.supabase\.co\/rest\/v1\/flights/,

      handler: "StaleWhileRevalidate",

      options: {
        cacheName: "flight-search-cache",

        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 30,
        },
      },
    },

    {
      urlPattern: /\.(?:js|css|png|jpg|jpeg|svg|woff2)$/,

      handler: "CacheFirst",

      options: {
        cacheName: "static-assets",

        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
  ],
})(nextConfig);
