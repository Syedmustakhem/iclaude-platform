import type { Metadata } from "next";
import ToolPage from "@/components/tools/ToolPage";
import { getRequiredToolBySlug } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/seo";

const tool = getRequiredToolBySlug(
  "image-resizer"
);

export const metadata: Metadata =
  generateToolMetadata(tool);

export default function ImageResizerPage() {
  return <ToolPage tool={tool} />;
}