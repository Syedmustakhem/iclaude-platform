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
  },
};

export default function ToolsPage() {
  return <ToolsDirectory />;
}
