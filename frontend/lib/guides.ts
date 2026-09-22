export type GuideDefinition = {
  slug: string;
  title: string;
  description: string;
  category: "Images" | "PDF" | "Video" | "General";
  readTime: string;
  publishedLabel: string;
  keywords: string[];
  excerpt: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  relatedToolSlug: string;
  relatedToolLabel: string;
};

export const guides: GuideDefinition[] = [
  {
    slug: "how-to-compress-an-image",
    title: "How to Compress an Image Online",
    description:
      "Learn practical ways to reduce image file size while keeping images suitable for websites, documents, sharing and everyday digital use.",
    category: "Images",
    readTime: "6 min read",
    publishedLabel: "Image guide",
    keywords: [
      "how to compress an image",
      "compress image online",
      "reduce image file size",
      "image compression",
      "compress JPG PNG WebP",
    ],
    excerpt:
      "A practical guide to reducing image file size, choosing the right format and preparing images for websites, documents and sharing.",
    intro:
      "Large image files can make uploads slower, increase storage requirements and create unnecessary friction when you need to share or publish them. Image compression reduces the amount of data stored in an image while aiming to keep the visual result useful for its intended purpose.",
    sections: [
      {
        heading: "1. Start with the purpose of the image",
        paragraphs: [
          "The right amount of compression depends on where the image will be used. A photo uploaded to a website may need a smaller file than an image that will be printed or preserved at maximum quality.",
          "Before changing anything, decide whether the image is intended for a website, email, messaging, a document, social media or long-term storage. That decision helps you choose a sensible balance between file size and visual quality.",
        ],
        bullets: [
          "Web pages: prioritize a reasonable file size and fast delivery.",
          "Email and messaging: reduce the file enough for easy sharing.",
          "Documents: keep text and important visual details readable.",
          "Archiving: preserve more quality when future editing matters.",
        ],
      },
      {
        heading: "2. Choose the right image format",
        paragraphs: [
          "Format selection can have a meaningful effect on file size. JPG is commonly used for photographs, PNG is useful when transparency or crisp graphical details matter, and WebP can be useful for modern web workflows.",
          "Do not convert an image simply because another format sounds smaller. The best format depends on the image content and how it will be used.",
        ],
      },
      {
        heading: "3. Compress the image",
        paragraphs: [
          "A browser-based image compressor can provide a quick workflow: choose the image, process it, and download the resulting file. This is convenient when you need to reduce a file without opening a full desktop image editor.",
          "For repeated work, compare the original and compressed versions before publishing. Look closely at faces, text, sharp edges, gradients and other areas where compression artifacts are easy to notice.",
        ],
      },
      {
        heading: "4. Check the dimensions as well as file size",
        paragraphs: [
          "Compression and resizing solve different problems. Compression changes how efficiently image data is stored, while resizing changes the pixel dimensions. If an image is much larger than the space where it will be displayed, resizing it can reduce the amount of data that needs to be delivered.",
          "For example, a large camera photo may contain far more pixels than a website card actually needs. In that situation, resizing first and then compressing can be a sensible workflow.",
        ],
      },
      {
        heading: "5. Review the result before replacing the original",
        paragraphs: [
          "Keep the original until you have confirmed that the compressed version works for its intended use. Open the result at the size people will actually see and check important details.",
          "If quality is not acceptable, use a less aggressive compression setting or resize the image to a more appropriate dimension instead of repeatedly compressing the same already-compressed file.",
        ],
      },
      {
        heading: "A simple image-compression workflow",
        paragraphs: [
          "For everyday use, a straightforward workflow is usually enough: identify the required dimensions, select an appropriate format, compress the image, compare the result with the original and then use the smaller file.",
        ],
        bullets: [
          "Identify where the image will be used.",
          "Choose a suitable output format.",
          "Resize only if the dimensions are unnecessarily large.",
          "Compress the image.",
          "Check visual quality and file size.",
          "Keep the original until the result is approved.",
        ],
      },
      {
        heading: "When should you compress an image?",
        paragraphs: [
          "Compression is especially useful when an image is unnecessarily large for its destination. Common examples include website uploads, email attachments, online forms, product listings, presentations and images that need to be shared quickly.",
          "It is less useful to chase the smallest possible file when maximum visual fidelity is more important than storage or transfer size.",
        ],
      },
      {
        heading: "Next step",
        paragraphs: [
          "If you already know the image needs to be smaller, you can use the iClaude image compressor to move directly from upload to a compressed file. If the dimensions are also too large, resize the image as part of your preparation workflow.",
        ],
      },
    ],
    relatedToolSlug: "image-compressor",
    relatedToolLabel: "Compress an image",
  },
];

export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getRequiredGuideBySlug(slug: string): GuideDefinition {
  const guide = getGuideBySlug(slug);

  if (!guide) {
    throw new Error(`Guide not found: ${slug}`);
  }

  return guide;
}
