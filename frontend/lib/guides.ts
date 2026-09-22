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

  {
    slug: "how-to-reduce-jpg-file-size",
    title: "How to Reduce JPG File Size Online",
    description:
      "Learn practical ways to reduce JPG file size while keeping photos clear enough for websites, documents, uploads and everyday sharing.",
    category: "Images",
    readTime: "6 min read",
    publishedLabel: "JPG guide",
    keywords: [
      "how to reduce JPG file size",
      "reduce JPG size",
      "compress JPG online",
      "make JPG file smaller",
      "reduce JPEG file size",
    ],
    excerpt:
      "A practical guide to making JPG images smaller for uploads, websites, documents and sharing without unnecessarily sacrificing visual quality.",
    intro:
      "JPG images are widely used because they can store photographs and other complex images efficiently. However, photos from modern phones and cameras can still be much larger than necessary for a particular upload or website. Reducing the JPG file size can make files easier to store, upload and share while keeping the image useful for its intended purpose.",
    sections: [
      {
        heading: "1. Check the JPG dimensions first",
        paragraphs: [
          "A JPG can have a large file size because of both its pixel dimensions and the amount of image data stored inside it. Before compressing the file, check whether the image is actually larger than the space where it will be displayed.",
          "For example, a high-resolution camera photo may contain thousands of pixels across even when it will only appear as a small image on a webpage. In that situation, reducing the dimensions can remove unnecessary data before or alongside compression.",
        ],
      },
      {
        heading: "2. Compress the JPG",
        paragraphs: [
          "JPG compression reduces the amount of data needed to represent the image. The goal is not necessarily to make the file as small as possible, but to find a practical balance between file size and visual quality.",
          "For everyday uploads and sharing, a moderate reduction can often provide a useful improvement without making obvious changes to the image. Always compare the compressed result with the original before replacing or deleting the source file.",
        ],
      },
      {
        heading: "3. Avoid repeated compression",
        paragraphs: [
          "JPG is a lossy image format, which means repeated editing and saving can gradually reduce image quality. If you need to make an image smaller, work from the original whenever possible rather than repeatedly compressing an already-compressed copy.",
          "Keeping the original also gives you a safe version to return to if a particular compression result is too aggressive.",
        ],
      },
      {
        heading: "4. Choose the right balance between quality and size",
        paragraphs: [
          "There is no single JPG file size that is appropriate for every situation. A website thumbnail, an email attachment and a high-quality document image can have very different requirements.",
          "Instead of targeting the smallest possible file, consider the purpose of the image. Preserve more visual detail when fine textures, faces, text or other important elements need to remain clear.",
        ],
        bullets: [
          "Website images: prioritize efficient loading and appropriate dimensions.",
          "Email attachments: reduce unnecessary file size for easier sharing.",
          "Documents: keep text and important details readable.",
          "Social sharing: balance acceptable quality with quick uploads.",
        ],
      },
      {
        heading: "5. Compare the original and compressed JPG",
        paragraphs: [
          "After compression, inspect the image at the size people will actually see. Pay particular attention to faces, text, sharp edges, gradients and areas with fine detail.",
          "If you can see distracting artifacts or important details have become unclear, use a less aggressive compression level or reduce the dimensions more deliberately instead of continuing to compress the same file.",
        ],
      },
      {
        heading: "A simple JPG size-reduction workflow",
        paragraphs: [
          "For most everyday situations, reducing JPG size can be handled with a simple sequence. Start with the original image, determine where it will be used, check whether the dimensions are larger than necessary, then compress the file and review the result.",
        ],
        bullets: [
          "Start with the original JPG.",
          "Identify where the image will be used.",
          "Check whether the pixel dimensions are unnecessarily large.",
          "Resize when the dimensions exceed the actual requirement.",
          "Compress the JPG.",
          "Compare the result with the original.",
          "Keep the original until the smaller version is confirmed.",
        ],
      },
      {
        heading: "Why reduce JPG file size?",
        paragraphs: [
          "Smaller JPG files can be easier to upload, share and store. On websites, appropriately sized images can also reduce the amount of data that needs to be transferred to visitors.",
          "Reducing file size is especially useful when an upload has a file-size limit or when many images need to be prepared for the same website, document or digital workflow.",
        ],
      },
      {
        heading: "Reduce your JPG file size with iClaude",
        paragraphs: [
          "If your JPG is larger than you need, you can use the iClaude image compressor to create a smaller version without opening a full desktop image editor. If the image dimensions are also too large, the iClaude image resizer can be used as a separate step in the workflow.",
        ],
      },
    ],
    relatedToolSlug: "image-compressor",
    relatedToolLabel: "Compress a JPG image",
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