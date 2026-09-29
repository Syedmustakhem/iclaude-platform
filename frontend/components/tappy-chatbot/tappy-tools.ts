// Tappy tool catalog — every tool on iclaude.in, runnable inside the chat.
// Each entry describes how Tappy collects input and runs the tool.

export type TappyOptionField =
  | {
      kind: "select";
      key: string;
      label: string;
      defaultValue: string;
      options: { value: string; label: string }[];
    }
  | {
      kind: "number";
      key: string;
      label: string;
      defaultValue: number;
      min: number;
      max: number;
    };

export type TappyTextInput = {
  label: string;
  placeholder: string;
  buttonLabel: string;
};

// job     → runs on the iclaude backend job API (upload → process → download)
// qr      → generated in the browser with the `qrcode` package
// youtube → thumbnail URLs built in the browser (i.ytimg.com)
// ai-image→ generated via Pollinations (free, no key)
// link    → opens the full tool page (for tools that need their own page)
export type TappyToolHandler =
  | "job"
  | "qr"
  | "youtube"
  | "ai-image"
  | "link";

export type TappyTool = {
  slug: string;
  name: string;
  tagline: string;
  category: "Images" | "PDF" | "Video" | "Everyday" | "AI";
  handler: TappyToolHandler;
  href: string;
  /** file input accept attribute; "" means no file needed */
  accepts: string;
  multiple: boolean;
  maxSizeMB: number;
  keywords: string[];
  optionFields: TappyOptionField[];
  textInput?: TappyTextInput;
  /** short intro shown when the tool is picked */
  helpText: string;
  buildOptions?: (
    values: Record<string, string | number>,
  ) => Record<string, unknown>;
};

const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";

export const TOOLS: TappyTool[] = [
  {
    slug: "image-compressor",
    name: "Image Compressor",
    tagline: "Make images smaller, keep them sharp",
    category: "Images",
    handler: "job",
    href: "/image-compressor/",
    accepts: IMAGE_ACCEPT,
    multiple: false,
    maxSizeMB: 50,
    keywords: [
      "compress",
      "smaller",
      "reduce size",
      "reduce file size",
      "shrink",
      "kb",
      "mb",
    ],
    helpText:
      "I'll shrink your image for you. Pick a quality level first, then send me the image.",
    optionFields: [
      {
        kind: "select",
        key: "quality",
        label: "Quality",
        defaultValue: "70",
        options: [
          { value: "85", label: "High quality (bigger file)" },
          { value: "70", label: "Balanced (recommended)" },
          { value: "50", label: "Smallest file" },
        ],
      },
      {
        kind: "select",
        key: "format",
        label: "Output format",
        defaultValue: "webp",
        options: [
          { value: "webp", label: "WebP (smallest)" },
          { value: "jpeg", label: "JPEG (widest support)" },
          { value: "png", label: "PNG (lossless)" },
        ],
      },
    ],
    buildOptions: (v) => ({
      compression: {
        quality: Number(v.quality),
        format: v.format,
      },
    }),
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    tagline: "Change width & height in pixels",
    category: "Images",
    handler: "job",
    href: "/image-resizer/",
    accepts: IMAGE_ACCEPT,
    multiple: false,
    maxSizeMB: 50,
    keywords: [
      "resize",
      "dimensions",
      "width",
      "height",
      "pixels",
      "make it bigger",
      "make it smaller",
      "profile picture",
      "thumbnail size",
    ],
    helpText:
      "Tell me the size you want in pixels, then send me the image.",
    optionFields: [
      {
        kind: "number",
        key: "width",
        label: "Width (px)",
        defaultValue: 800,
        min: 1,
        max: 10000,
      },
      {
        kind: "number",
        key: "height",
        label: "Height (px)",
        defaultValue: 600,
        min: 1,
        max: 10000,
      },
      {
        kind: "select",
        key: "format",
        label: "Output format",
        defaultValue: "webp",
        options: [
          { value: "webp", label: "WebP" },
          { value: "jpeg", label: "JPEG" },
          { value: "png", label: "PNG" },
        ],
      },
    ],
    buildOptions: (v) => ({
      resize: {
        width: Number(v.width),
        height: Number(v.height),
        fit: "contain",
        format: v.format,
      },
    }),
  },
  {
    slug: "remove-background",
    name: "Remove Background",
    tagline: "Cut out the subject, transparent background",
    category: "Images",
    handler: "job",
    href: "/remove-background/",
    accepts: IMAGE_ACCEPT,
    multiple: false,
    maxSizeMB: 50,
    keywords: [
      "background",
      "remove bg",
      "transparent",
      "cut out",
      "cutout",
      "subject",
    ],
    helpText:
      "Send me a photo and I'll cut out the background for you.",
    optionFields: [
      {
        kind: "select",
        key: "format",
        label: "Output format",
        defaultValue: "png",
        options: [
          { value: "png", label: "PNG (keeps transparency)" },
          { value: "webp", label: "WebP" },
        ],
      },
    ],
    buildOptions: (v) => ({
      removeBackground: { format: v.format },
    }),
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG",
    tagline: "Convert JPG images to PNG",
    category: "Images",
    handler: "job",
    href: "/jpg-to-png/",
    accepts: "image/jpeg",
    multiple: false,
    maxSizeMB: 50,
    keywords: ["jpg to png", "jpeg to png", "convert to png"],
    helpText: "Send me a JPG and I'll convert it to PNG.",
    optionFields: [],
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG",
    tagline: "Convert PNG images to JPG",
    category: "Images",
    handler: "job",
    href: "/png-to-jpg/",
    accepts: "image/png",
    multiple: false,
    maxSizeMB: 50,
    keywords: ["png to jpg", "png to jpeg", "convert to jpg", "convert to jpeg"],
    helpText: "Send me a PNG and I'll convert it to JPG.",
    optionFields: [],
  },
  {
    slug: "webp-to-jpg",
    name: "WebP to JPG",
    tagline: "Convert WebP images to JPG",
    category: "Images",
    handler: "job",
    href: "/webp-to-jpg/",
    accepts: "image/webp",
    multiple: false,
    maxSizeMB: 50,
    keywords: ["webp to jpg", "webp to jpeg", "convert webp"],
    helpText: "Send me a WebP image and I'll convert it to JPG.",
    optionFields: [],
  },
  {
    slug: "heic-to-jpg",
    name: "HEIC to JPG",
    tagline: "Convert iPhone HEIC photos to JPG",
    category: "Images",
    handler: "job",
    href: "/heic-to-jpg/",
    accepts: "image/heic,image/heif",
    multiple: false,
    maxSizeMB: 50,
    keywords: [
      "heic",
      "heif",
      "iphone photo",
      "ios photo",
      "convert heic",
    ],
    helpText:
      "Send me an iPhone (HEIC) photo and I'll convert it to JPG.",
    optionFields: [],
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    tagline: "Combine multiple PDFs into one",
    category: "PDF",
    handler: "job",
    href: "/merge-pdf/",
    accepts: "application/pdf",
    multiple: true,
    maxSizeMB: 100,
    keywords: [
      "merge",
      "combine",
      "join pdf",
      "multiple pdf",
      "pdfs into one",
    ],
    helpText:
      "Send me 2 or more PDF files and I'll combine them into one PDF, in the order you send them.",
    optionFields: [],
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    tagline: "Convert PDF into an editable Word file",
    category: "PDF",
    handler: "job",
    href: "/pdf-to-word/",
    accepts: "application/pdf",
    multiple: false,
    maxSizeMB: 100,
    keywords: [
      "pdf to word",
      "pdf to docx",
      "editable",
      "convert pdf",
      "word document",
    ],
    helpText:
      "Send me a PDF and I'll convert it into an editable Word (.docx) file.",
    optionFields: [],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    tagline: "Turn images into a PDF document",
    category: "PDF",
    handler: "job",
    href: "/jpg-to-pdf/",
    accepts: IMAGE_ACCEPT,
    multiple: true,
    maxSizeMB: 100,
    keywords: [
      "jpg to pdf",
      "image to pdf",
      "images to pdf",
      "photos to pdf",
      "make pdf",
      "create pdf",
    ],
    helpText:
      "Send me one or more images and I'll pack them into a single PDF.",
    optionFields: [],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    tagline: "Make a QR code from any text or link",
    category: "Everyday",
    handler: "qr",
    href: "/qr-code-generator/",
    accepts: "",
    multiple: false,
    maxSizeMB: 0,
    keywords: ["qr", "qr code", "barcode"],
    helpText: "Type the text or link you want inside the QR code.",
    optionFields: [],
    textInput: {
      label: "Text or link",
      placeholder: "https://example.com",
      buttonLabel: "Generate QR",
    },
  },
  {
    slug: "youtube-thumbnail-downloader",
    name: "YouTube Thumbnail Downloader",
    tagline: "Save any YouTube video's thumbnail",
    category: "Everyday",
    handler: "youtube",
    href: "/youtube-thumbnail-downloader/",
    accepts: "",
    multiple: false,
    maxSizeMB: 0,
    keywords: [
      "youtube",
      "thumbnail",
      "yt thumbnail",
      "video thumbnail",
      "download thumbnail",
    ],
    helpText: "Paste a YouTube video link and I'll grab its thumbnail.",
    optionFields: [],
    textInput: {
      label: "YouTube link",
      placeholder: "https://youtube.com/watch?v=...",
      buttonLabel: "Get thumbnail",
    },
  },
  {
    slug: "ai-image-generator",
    name: "AI Image Generator",
    tagline: "Create images from words, free",
    category: "AI",
    handler: "ai-image",
    href: "/ai-image-generator/",
    accepts: "",
    multiple: false,
    maxSizeMB: 0,
    keywords: [
      "ai image",
      "generate image",
      "create image",
      "text to image",
      "draw",
      "picture of",
    ],
    helpText:
      "Describe the image you want and I'll generate it for you. Free, no sign-up.",
    optionFields: [],
    textInput: {
      label: "Describe your image",
      placeholder: "A cute robot drinking chai at sunset...",
      buttonLabel: "Generate",
    },
  },
  {
    slug: "video-compressor",
    name: "Video Compressor",
    tagline: "Shrink video files",
    category: "Video",
    handler: "link",
    href: "/video-compressor/",
    accepts: "",
    multiple: false,
    maxSizeMB: 0,
    keywords: ["compress video", "shrink video", "video size", "reduce video"],
    helpText:
      "Video compression needs its own workspace — I'll open it for you.",
    optionFields: [],
  },
  {
    slug: "video-studio",
    name: "Video Studio",
    tagline: "Trim & convert videos in your browser",
    category: "Video",
    handler: "link",
    href: "/video-studio/",
    accepts: "",
    multiple: false,
    maxSizeMB: 0,
    keywords: [
      "trim video",
      "cut video",
      "edit video",
      "convert video",
      "video studio",
    ],
    helpText:
      "Video Studio runs in your browser — I'll open it for you.",
    optionFields: [],
  },
];

export const CATEGORIES = [
  "Images",
  "PDF",
  "Video",
  "Everyday",
  "AI",
] as const;

export function toolsByCategory(
  category: (typeof CATEGORIES)[number],
) {
  return TOOLS.filter((t) => t.category === category);
}

export function getTool(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}
