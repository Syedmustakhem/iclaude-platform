import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://iclaude.in"),
  title: {
    default: "iclaude — Simple Online Tools for Files",
    template: "%s | iclaude",
  },
  description:
    "Simple, fast online tools to compress, resize, convert and process images, PDFs, videos and other digital files.",
  keywords: [
    "online tools",
    "file tools",
    "image compressor",
    "image resizer",
    "PDF tools",
    "video compressor",
    "background remover",
  ],
  applicationName: "iclaude",
  authors: [{ name: "iclaude" }],
  creator: "iclaude",
  publisher: "iclaude",
  alternates: {
    canonical: "https://iclaude.in",
  },
  openGraph: {
    title: "iclaude — Simple Online Tools for Files",
    description:
      "Compress, resize, convert and process your files with simple online tools.",
    url: "https://iclaude.in",
    siteName: "iclaude",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iclaude — Simple Online Tools for Files",
    description:
      "Simple online tools for images, PDFs, videos and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}