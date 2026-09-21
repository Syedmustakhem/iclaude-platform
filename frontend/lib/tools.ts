export type ToolCategory = "Images" | "PDF" | "Video";

export type ToolDefinition = {
  slug: string;
  name: string;
  shortName: string;
  category: ToolCategory;

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

    description:
      "Compress JPG, PNG and WebP images online while reducing file size and keeping the image quality suitable for web, sharing and everyday use.",

    shortDescription:
      "Reduce image file size quickly without unnecessary steps.",

    seoTitle:
      "Image Compressor Online — Compress JPG, PNG & WebP",

    seoDescription:
      "Compress JPG, PNG and WebP images online. Reduce image file size for websites, email, WhatsApp and sharing while keeping useful image quality.",

    keywords: [
      "image compressor",
      "compress image",
      "compress image online",
      "reduce image size",
      "reduce JPG size",
      "compress JPG",
      "compress PNG",
      "compress WebP",
      "image size reducer",
    ],

    icon: "compress",

    href: "/image-compressor",

    popularSearches: [
      "compress image online",
      "reduce image size",
      "compress JPG to smaller size",
      "compress PNG online",
      "reduce photo file size",
      "compress image for website",
      "compress image for email",
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
      "Simple upload and download workflow",
    ],

    relatedTools: [
      "image-resizer",
      "remove-background",
    ],

    content: {
      introduction:
        "Large image files can slow websites, consume storage and make sharing inconvenient. iclaude's image compressor is designed to make image files smaller while preserving practical image quality for everyday use.",

      howItWorks: [
        "Choose an image from your device.",
        "Upload the image to the compressor.",
        "The image is processed according to the selected compression settings.",
        "Preview the result and compare the file size.",
        "Download the compressed image.",
      ],

      useCases: [
        "Optimizing images before uploading them to a website.",
        "Reducing photo sizes for email attachments.",
        "Making images easier to share through messaging applications.",
        "Reducing storage requirements for image collections.",
        "Preparing images for online forms with file-size limits.",
      ],

      tips: [
        "Start with the original image whenever possible.",
        "Use JPG for many photographic images.",
        "Use PNG when transparency or lossless quality is important.",
        "Use WebP when your workflow supports modern web image formats.",
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
          "The initial iclaude image compressor is designed for common formats including JPG, JPEG, PNG and WebP.",
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

    description:
      "Resize images online to specific dimensions for websites, documents, social media, forms and other digital uses.",

    shortDescription:
      "Change image dimensions quickly while keeping the workflow simple.",

    seoTitle:
      "Image Resizer Online — Resize JPG, PNG & WebP Images",

    seoDescription:
      "Resize images online by width and height. Change JPG, PNG and WebP image dimensions for websites, documents, forms and digital projects.",

    keywords: [
      "image resizer",
      "resize image online",
      "resize photo",
      "change image dimensions",
      "resize JPG",
      "resize PNG",
      "resize WebP",
      "image size changer",
    ],

    icon: "resize",

    href: "/image-resizer",

    popularSearches: [
      "resize image online",
      "resize photo to specific size",
      "change image dimensions",
      "resize JPG image",
      "resize PNG image",
      "resize image for website",
      "resize image for form",
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
      "Simple upload and download workflow",
    ],

    relatedTools: [
      "image-compressor",
      "remove-background",
    ],

    content: {
      introduction:
        "Different websites, documents and applications often require images with specific dimensions. An image resizer lets you change the width and height of an image to fit those requirements.",

      howItWorks: [
        "Choose an image.",
        "Upload it to the image resizer.",
        "Enter the desired width and height.",
        "Process the image.",
        "Download the resized result.",
      ],

      useCases: [
        "Preparing images for websites.",
        "Creating images with consistent dimensions.",
        "Resizing images for online forms.",
        "Preparing photos for documents.",
        "Creating smaller versions of large images.",
      ],

      tips: [
        "Keep the aspect ratio when you want to avoid distortion.",
        "Use the original image when possible.",
        "Choose dimensions based on the destination where the image will be used.",
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
          "Yes. The initial iclaude image resizer supports common formats such as JPG, JPEG, PNG and WebP.",
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

    description:
      "Remove the background from an image and create a cleaner subject-focused result for products, profiles, designs and creative projects.",

    shortDescription:
      "Remove image backgrounds and isolate the main subject.",

    seoTitle:
      "Remove Background From Image Online — Free Background Remover",

    seoDescription:
      "Remove backgrounds from images online and isolate people, products or objects. Create cleaner transparent-background images for designs and projects.",

    keywords: [
      "background remover",
      "remove background from image",
      "remove image background",
      "background removal",
      "transparent background",
      "remove photo background",
      "image background remover",
    ],

    icon: "background",

    href: "/remove-background",

    popularSearches: [
      "remove background from image",
      "remove photo background",
      "make image background transparent",
      "background remover online",
      "remove background from product photo",
      "cut out image background",
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
      "Simple upload and download workflow",
    ],

    relatedTools: [
      "image-compressor",
      "image-resizer",
    ],

    content: {
      introduction:
        "Removing an image background can help isolate a person, product or other subject from its original surroundings. This is useful for product photography, presentations, profile images and graphic design.",

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
      ],

      tips: [
        "Use an image where the main subject is clearly visible.",
        "Images with good contrast between the subject and background can be easier to process.",
        "Check fine details such as hair, transparent objects and thin edges after processing.",
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
    ],
  },

  {
    slug: "pdf-to-word",

    name: "PDF to Word Converter",

    shortName: "PDF to Word",

    category: "PDF",

    description:
      "Convert PDF documents into editable Word-compatible documents for editing, reuse and document workflows.",

    shortDescription:
      "Turn PDF documents into editable Word-compatible files.",

    seoTitle:
      "PDF to Word Converter Online — Convert PDF to Editable Word",

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
    ],

    icon: "pdf-word",

    href: "/pdf-to-word",

    popularSearches: [
      "convert PDF to Word",
      "PDF to Word converter online",
      "PDF to DOCX",
      "make PDF editable",
      "convert PDF document to Word",
      "turn PDF into editable document",
    ],

    supportedFormats: [
      "PDF",
    ],

    benefits: [
      "Convert PDF documents into editable files",
      "Useful for document editing workflows",
      "Simple upload-based process",
      "Download the converted result",
    ],

    relatedTools: [
      "image-compressor",
    ],

    content: {
      introduction:
        "PDF files are useful for sharing and preserving document layouts, but they are not always convenient to edit. A PDF to Word converter can transform document content into an editable Word-compatible format.",

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
    ],
  },

  {
    slug: "video-compressor",

    name: "Video Compressor",

    shortName: "Compress Video",

    category: "Video",

    description:
      "Compress video files to reduce file size for sharing, storage and online publishing while balancing size and visual quality.",

    shortDescription:
      "Reduce video file size for sharing, storage and online use.",

    seoTitle:
      "Video Compressor Online — Reduce Video File Size",

    seoDescription:
      "Compress video files online and reduce file size for sharing, storage and websites. Balance video quality and file size with a simple workflow.",

    keywords: [
      "video compressor",
      "compress video",
      "compress video online",
      "reduce video size",
      "reduce MP4 size",
      "video size reducer",
      "compress MP4",
    ],

    icon: "video-compress",

    href: "/video-compressor",

    popularSearches: [
      "compress video online",
      "reduce video file size",
      "compress MP4",
      "reduce MP4 size",
      "make video smaller",
      "compress video for sharing",
      "compress video for website",
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
    ],

    relatedTools: [
      "image-compressor",
    ],

    content: {
      introduction:
        "Video files can become very large because they contain many frames and often use high resolutions and bitrates. Video compression reduces the amount of data needed to store or transmit a video.",

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
        "Choose the output settings based on where the video will be used.",
        "Keep an original copy before performing destructive compression.",
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
    ],
  },
];

export function getToolBySlug(
  slug: string,
): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(
  category: ToolCategory,
): ToolDefinition[] {
  return tools.filter((tool) => tool.category === category);
}

export function getRelatedTools(
  tool: ToolDefinition,
): ToolDefinition[] {
  return tool.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter((related): related is ToolDefinition => Boolean(related));
}