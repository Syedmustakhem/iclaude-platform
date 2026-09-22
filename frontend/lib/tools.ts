export type ToolCategory =
  | "Images"
  | "PDF"
  | "Video"
  | "AI";

export type ToolStatus =
  | "available"
  | "coming-soon";

export type ToolDefinition = {
  slug: string;
  name: string;
  shortName: string;
  category: ToolCategory;
  status: ToolStatus;

  description: string;
  shortDescription: string;

  seoTitle: string;
  seoDescription: string;

  keywords: string[];

  icon: string;

  href: string;

  popularSearches: string[];

  supportedFormats: string[];

  benefits: string[];

  relatedTools: string[];

  content: {
    introduction: string;
    howItWorks: string[];
    useCases: string[];
    tips: string[];
  };

  faq: {
    question: string;
    answer: string;
  }[];
};

export const tools: ToolDefinition[] = [
  {
    slug: "image-compressor",

    name: "Image Compressor",

    shortName: "Compress Image",

    category: "Images",

    status: "available",

    description:
      "Compress JPG, PNG and WebP images online to reduce file size while keeping practical image quality for websites, email, forms and everyday sharing.",

    shortDescription:
      "Reduce image file size quickly without unnecessary steps.",

    seoTitle:
      "Image Compressor Online — Compress JPG, PNG & WebP",

    seoDescription:
      "Compress JPG, PNG and WebP images online and reduce image file size for websites, email, forms and sharing while keeping useful visual quality.",

    keywords: [
      "image compressor",
      "compress image",
      "compress image online",
      "reduce image size",
      "reduce image file size",
      "reduce JPG size",
      "compress JPG",
      "compress PNG",
      "compress WebP",
      "image size reducer",
    ],

    icon: "compress",

    href: "/image-compressor/",

    popularSearches: [
      "compress image online",
      "reduce image size",
      "compress JPG online",
      "compress PNG online",
      "compress WebP online",
      "reduce photo file size",
      "compress image for website",
      "compress image for email",
      "make image file smaller",
    ],

    supportedFormats: [
      "JPG",
      "JPEG",
      "PNG",
      "WebP",
    ],

    benefits: [
      "Reduce image file size",
      "Keep useful visual quality",
      "Works with common image formats",
      "Useful for websites and sharing",
      "Helpful for file-size limits",
      "Simple upload and download workflow",
    ],

    relatedTools: [
      "image-resizer",
      "remove-background",
    ],

    content: {
      introduction:
        "Large image files can slow page loads, consume storage and make uploading or sharing inconvenient. iclaude's image compressor helps reduce image file size while maintaining practical visual quality for everyday digital workflows.",

      howItWorks: [
        "Choose an image from your device.",
        "Upload the image to the compressor.",
        "The image is processed according to the available compression settings.",
        "Preview the result and compare the file size.",
        "Download the compressed image.",
      ],

      useCases: [
        "Optimizing images before uploading them to a website.",
        "Reducing photo sizes for email attachments.",
        "Making images easier to share through messaging applications.",
        "Reducing storage requirements for image collections.",
        "Preparing images for online forms with file-size limits.",
        "Creating smaller image copies for digital projects.",
      ],

      tips: [
        "Start with the original image whenever possible.",
        "Use JPG for many photographic images.",
        "Use PNG when transparency or lossless quality is important.",
        "Use WebP when your workflow supports modern web image formats.",
        "Compare file size and visual quality before replacing the original.",
      ],
    },

    faq: [
      {
        question: "What is an image compressor?",
        answer:
          "An image compressor reduces the amount of data required to store an image. The goal is to create a smaller file while maintaining useful visual quality.",
      },
      {
        question: "Which image formats can I compress?",
        answer:
          "The iclaude image compressor supports common formats including JPG, JPEG, PNG and WebP.",
      },
      {
        question: "Why should I compress images?",
        answer:
          "Smaller images can require less storage and can be easier to upload, send and use on websites.",
      },
      {
        question: "Will compression reduce image quality?",
        answer:
          "Compression can change image quality depending on the method and settings used. The goal is to find a practical balance between file size and visual quality.",
      },
    ],
  },

  {
    slug: "image-resizer",

    name: "Image Resizer",

    shortName: "Resize Image",

    category: "Images",

    status: "available",

    description:
      "Resize JPG, PNG and WebP images online by changing their width and height for websites, documents, forms, social media and other digital uses.",

    shortDescription:
      "Change image dimensions quickly while keeping the workflow simple.",

    seoTitle:
      "Image Resizer Online — Resize JPG, PNG & WebP",

    seoDescription:
      "Resize JPG, PNG and WebP images online by width and height. Change image dimensions for websites, documents, forms and digital projects.",

    keywords: [
      "image resizer",
      "resize image online",
      "resize photo online",
      "change image dimensions",
      "resize JPG",
      "resize PNG",
      "resize WebP",
      "image size changer",
      "change photo size",
      "resize image to specific size",
    ],

    icon: "resize",

    href: "/image-resizer/",

    popularSearches: [
      "resize image online",
      "resize photo online",
      "resize image to specific size",
      "change image dimensions",
      "resize JPG image",
      "resize PNG image",
      "resize WebP image",
      "resize image for website",
      "resize image for form",
      "make image smaller",
    ],

    supportedFormats: [
      "JPG",
      "JPEG",
      "PNG",
      "WebP",
    ],

    benefits: [
      "Set custom image dimensions",
      "Resize common image formats",
      "Useful for websites and documents",
      "Prepare images for digital forms",
      "Create smaller image versions",
      "Simple upload and download workflow",
    ],

    relatedTools: [
      "image-compressor",
      "remove-background",
    ],

    content: {
      introduction:
        "Different websites, documents and applications often require images with specific dimensions. An image resizer lets you change the width and height of an image to fit those requirements while keeping the workflow straightforward.",

      howItWorks: [
        "Choose an image.",
        "Upload it to the image resizer.",
        "Enter the desired width and height.",
        "Process the image.",
        "Preview and download the resized result.",
      ],

      useCases: [
        "Preparing images for websites.",
        "Creating images with consistent dimensions.",
        "Resizing images for online forms.",
        "Preparing photos for documents.",
        "Creating smaller versions of large images.",
        "Preparing images for digital publishing.",
      ],

      tips: [
        "Keep the aspect ratio when you want to avoid distortion.",
        "Use the original image whenever possible.",
        "Choose dimensions based on where the image will be used.",
        "Avoid enlarging small images excessively because it can reduce visual quality.",
      ],
    },

    faq: [
      {
        question: "What does an image resizer do?",
        answer:
          "An image resizer changes the pixel dimensions of an image, such as its width and height.",
      },
      {
        question: "Can I resize JPG and PNG images?",
        answer:
          "Yes. The iclaude image resizer supports common formats such as JPG, JPEG, PNG and WebP.",
      },
      {
        question: "Can I resize an image to specific dimensions?",
        answer:
          "Yes. The tool is designed to let you specify the desired image width and height.",
      },
      {
        question: "Will resizing reduce image quality?",
        answer:
          "Changing image dimensions can affect quality, especially when an image is enlarged significantly. The result depends on the source image and resizing method.",
      },
    ],
  },

  {
    slug: "remove-background",

    name: "Background Remover",

    shortName: "Remove Background",

    category: "Images",

    status: "available",

    description:
      "Remove backgrounds from JPG, PNG and WebP images online and isolate people, products or objects for designs, profiles, presentations and creative projects.",

    shortDescription:
      "Remove image backgrounds and isolate the main subject.",

    seoTitle:
      "Remove Background From Image Online — Free Tool",

    seoDescription:
      "Remove backgrounds from images online and isolate people, products or objects. Create cleaner subject-focused images for designs, profiles and projects.",

    keywords: [
      "background remover",
      "remove background from image",
      "remove image background",
      "background removal",
      "transparent background",
      "remove photo background",
      "image background remover",
      "remove background online",
      "cut out image",
    ],

    icon: "background",

    href: "/remove-background/",

    popularSearches: [
      "remove background from image",
      "remove photo background",
      "make image background transparent",
      "background remover online",
      "remove background from product photo",
      "cut out image background",
      "remove background from JPG",
      "remove background from PNG",
    ],

    supportedFormats: [
      "JPG",
      "JPEG",
      "PNG",
      "WebP",
    ],

    benefits: [
      "Isolate the main subject",
      "Create transparent-background images",
      "Useful for product images",
      "Useful for profile and creative designs",
      "Prepare images for presentations",
      "Simple upload and download workflow",
    ],

    relatedTools: [
      "image-compressor",
      "image-resizer",
    ],

    content: {
      introduction:
        "Removing an image background can help isolate a person, product or other subject from its original surroundings. This is useful for product photography, presentations, profile images, marketing materials and graphic design.",

      howItWorks: [
        "Choose an image containing the subject you want to isolate.",
        "Upload the image.",
        "The background-removal system identifies the main subject.",
        "Preview the processed result.",
        "Download the resulting image.",
      ],

      useCases: [
        "Product photography.",
        "Profile and portrait graphics.",
        "Marketing materials.",
        "Presentation graphics.",
        "Creative design projects.",
        "Online product listings.",
      ],

      tips: [
        "Use an image where the main subject is clearly visible.",
        "Images with good contrast between the subject and background can be easier to process.",
        "Check fine details such as hair, transparent objects and thin edges after processing.",
        "Keep the original image so you can make changes later if necessary.",
      ],
    },

    faq: [
      {
        question: "What does a background remover do?",
        answer:
          "A background remover separates the primary subject of an image from its surrounding background.",
      },
      {
        question: "Can I create a transparent background?",
        answer:
          "The intended output for the background-removal tool is a subject-focused image that can support a transparent background.",
      },
      {
        question: "What types of images work well?",
        answer:
          "Images with a clearly visible main subject and reasonable separation between the subject and background generally provide better conditions for background removal.",
      },
      {
        question: "Can I remove the background from a product photo?",
        answer:
          "Yes. Product photography is a common use case for isolating a product from its original background.",
      },
    ],
  },

  {
    slug: "pdf-to-word",

    name: "PDF to Word Converter",

    shortName: "PDF to Word",

    category: "PDF",

    status: "available",

    description:
      "Convert PDF documents into editable Word-compatible documents for editing, reuse and document workflows.",

    shortDescription:
      "Turn PDF documents into editable Word-compatible files.",

    seoTitle:
      "PDF to Word Converter Online — Convert PDF to Word",

    seoDescription:
      "Convert PDF files to editable Word-compatible documents online. Extract document content for editing and reuse with a simple upload workflow.",

    keywords: [
      "PDF to Word",
      "PDF to Word converter",
      "convert PDF to Word",
      "PDF to DOCX",
      "PDF converter",
      "editable PDF",
      "turn PDF into Word",
      "convert PDF online",
      "PDF to editable Word",
    ],

    icon: "pdf-word",

    href: "/pdf-to-word/",

    popularSearches: [
      "convert PDF to Word",
      "PDF to Word converter online",
      "PDF to DOCX",
      "make PDF editable",
      "convert PDF document to Word",
      "turn PDF into editable document",
      "convert PDF to Word online",
    ],

    supportedFormats: [
      "PDF",
    ],

    benefits: [
      "Convert PDF documents into editable files",
      "Useful for document editing workflows",
      "Reuse content from existing PDFs",
      "Simple upload-based process",
      "Download the converted result",
    ],

    relatedTools: [
      "image-compressor",
    ],

    content: {
      introduction:
        "PDF files are useful for sharing and preserving document layouts, but they are not always convenient to edit. A PDF to Word converter can transform document content into an editable Word-compatible format for further editing and reuse.",

      howItWorks: [
        "Choose a PDF document.",
        "Upload the document.",
        "The document conversion system processes the PDF.",
        "Review the conversion result.",
        "Download the editable document.",
      ],

      useCases: [
        "Editing text from a PDF.",
        "Reusing information from existing documents.",
        "Updating older documents.",
        "Working with document content in an editable format.",
        "Preparing content for further document editing.",
      ],

      tips: [
        "Text-based PDFs generally provide better conversion conditions than scanned documents.",
        "Complex layouts, tables and unusual fonts may require additional review after conversion.",
        "Always review important documents after conversion before publishing or submitting them.",
        "Keep the original PDF so the source document remains available.",
      ],
    },

    faq: [
      {
        question: "What is a PDF to Word converter?",
        answer:
          "A PDF to Word converter transforms content from a PDF document into an editable Word-compatible document.",
      },
      {
        question: "Can every PDF be converted perfectly?",
        answer:
          "No. Conversion quality depends on the PDF structure. Complex layouts, scanned pages, tables and unusual fonts can require additional processing or manual review.",
      },
      {
        question: "Can scanned PDFs be converted?",
        answer:
          "Scanned PDFs may require OCR technology to recognize text before it can be converted into an editable document.",
      },
      {
        question: "Can I edit the converted Word document?",
        answer:
          "The purpose of the conversion is to produce an editable Word-compatible document that can be reviewed and edited after conversion.",
      },
    ],
  },

  {
    slug: "video-compressor",

    name: "Video Compressor",

    shortName: "Compress Video",

    category: "Video",

    status: "available",

    description:
      "Compress MP4, MOV, WebM and MKV videos online to reduce file size for sharing, storage and online publishing while balancing size and visual quality.",

    shortDescription:
      "Reduce video file size for sharing, storage and online use.",

    seoTitle:
      "Video Compressor Online — Compress MP4 & Reduce Size",

    seoDescription:
      "Compress videos online and reduce MP4, MOV, WebM and MKV file sizes for sharing, storage and websites while balancing video quality and file size.",

    keywords: [
      "video compressor",
      "compress video",
      "compress video online",
      "reduce video size",
      "reduce video file size",
      "reduce MP4 size",
      "video size reducer",
      "compress MP4",
      "compress MOV",
      "compress WebM",
    ],

    icon: "video-compress",

    href: "/video-compressor/",

    popularSearches: [
      "compress video online",
      "reduce video file size",
      "compress MP4",
      "reduce MP4 size",
      "make video smaller",
      "compress video for sharing",
      "compress video for website",
      "reduce MOV file size",
    ],

    supportedFormats: [
      "MP4",
      "MOV",
      "WebM",
      "MKV",
    ],

    benefits: [
      "Reduce video file size",
      "Prepare videos for sharing",
      "Reduce storage requirements",
      "Useful for websites and uploads",
      "Balance file size and visual quality",
      "Create smaller copies for everyday use",
    ],

    relatedTools: [
      "image-compressor",
    ],

    content: {
      introduction:
        "Video files can become very large because they contain many frames and often use high resolutions and bitrates. Video compression reduces the amount of data needed to store or transmit a video, making it more practical for sharing, storage and online publishing.",

      howItWorks: [
        "Choose a supported video file.",
        "Upload the video.",
        "Select or use the available compression settings.",
        "The video processing system encodes the compressed version.",
        "Download the resulting video.",
      ],

      useCases: [
        "Preparing videos for website uploads.",
        "Reducing storage requirements.",
        "Making videos easier to share.",
        "Preparing videos for platforms with upload limits.",
        "Creating smaller copies for everyday use.",
      ],

      tips: [
        "Higher resolution and bitrate generally produce larger files.",
        "Choose output settings based on where the video will be used.",
        "Keep an original copy before performing destructive compression.",
        "Review the final video after compression to make sure the quality is suitable.",
      ],
    },

    faq: [
      {
        question: "What does a video compressor do?",
        answer:
          "A video compressor reduces the amount of data used by a video so that the resulting file can be smaller.",
      },
      {
        question: "Will video compression reduce quality?",
        answer:
          "Compression can affect visual quality depending on the encoding settings. The goal is to balance file size with acceptable quality.",
      },
      {
        question: "Which video formats are supported?",
        answer:
          "The initial tool is designed around common formats such as MP4, MOV, WebM and MKV, with final processing support determined by the backend worker.",
      },
      {
        question: "Why should I compress a video?",
        answer:
          "A smaller video can be easier to upload, share and store, especially when a platform or service has file-size limits.",
      },
    ],
  },
];

export function getToolBySlug(
  slug: string,
): ToolDefinition | undefined {
  return tools.find(
    (tool) => tool.slug === slug,
  );
}

export function getToolsByCategory(
  category: ToolCategory,
): ToolDefinition[] {
  return tools.filter(
    (tool) => tool.category === category,
  );
}

export function getRelatedTools(
  tool: ToolDefinition,
): ToolDefinition[] {
  return tool.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter(
      (related): related is ToolDefinition =>
        Boolean(related),
    );
}

export function getAvailableTools(): ToolDefinition[] {
  return tools.filter(
    (tool) => tool.status === "available",
  );
}

export function getComingSoonTools(): ToolDefinition[] {
  return tools.filter(
    (tool) => tool.status === "coming-soon",
  );
}

export function getAvailableToolsByCategory(
  category: ToolCategory,
): ToolDefinition[] {
  return tools.filter(
    (tool) =>
      tool.category === category &&
      tool.status === "available",
  );
}

export function getRequiredToolBySlug(
  slug: string,
): ToolDefinition {
  const tool = getToolBySlug(slug);

  if (!tool) {
    throw new Error(
      `Tool definition not found for slug: ${slug}`,
    );
  }

  return tool;
}