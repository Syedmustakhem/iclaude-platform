import type { Metadata } from "next";

import ToolPage from "@/components/tools/ToolPage";
import {
  getRequiredToolBySlug,
} from "@/lib/tools";
import {
  generateToolMetadata,
} from "@/lib/seo";

const tool = getRequiredToolBySlug(
  "webp-to-jpg",
);

export const metadata: Metadata =
  generateToolMetadata(tool);

export default function WebpToJpgPage() {
  return <ToolPage tool={tool} />;
}