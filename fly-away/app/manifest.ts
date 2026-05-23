// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FlyAway Flight Booking",
    short_name: "FlyAway",
    description: "Book your flights with ease and real-time pricing.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
