import type { Metadata } from "next";
import ToolPage from "@/components/tools/ToolPage";
import { getRequiredToolBySlug } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/seo";

const tool = getRequiredToolBySlug(
  "video-compressor"
);

export const metadata: Metadata =
  generateToolMetadata(tool);

export default function VideoCompressorPage() {
  return <ToolPage tool={tool} />;
}