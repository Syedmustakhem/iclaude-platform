import type { Metadata } from "next";
import ToolPage from "@/components/tools/ToolPage";
import { getRequiredToolBySlug } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/seo";

const tool = getRequiredToolBySlug(
  "remove-background"
);

export const metadata: Metadata =
  generateToolMetadata(tool);

export default function RemoveBackgroundPage() {
  return <ToolPage tool={tool} />;
}