import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zavari Haus",
    short_name: "Zavari Haus",
    description:
      "Premium serviced apartments in Bahria Town Lahore with warm interiors and effortless booking.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F1E8",
    theme_color: "#F7F1E8",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
