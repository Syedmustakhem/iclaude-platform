import type { Metadata } from "next";

import ToolsDirectory from "../../components/tools/ToolsDirectory";

export const metadata: Metadata = {
  title: "Free Online File Tools | Images, PDF & Video",
  description:
    "Explore free online tools for images, PDFs and videos. Compress, resize, convert and transform files with focused workflows from iclaude.",
  alternates: {
    canonical: "/tools/",
  },
  openGraph: {
    title: "Free Online File Tools | iclaude",
    description:
      "Compress, resize, convert and transform files with fast, focused online tools.",
    url: "/tools/",
    type: "website",
    images: [
      {
        url: "/iclaude-og-image.png",
        width: 1200,
        height: 630,
        alt: "iclaude — Free online tools for images, PDF and video",
      },
    ],
  },
};

export default function ToolsPage() {
  return <ToolsDirectory />;
}
