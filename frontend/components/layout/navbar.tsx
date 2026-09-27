"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";

/* ============================================================
   TOOL GROUPS
   ============================================================ */

const toolGroups = [
  {
    label: "Images",
    items: [
      {
        label: "Image Compressor",
        href: "/image-compressor/",
        detail: "Reduce image file size",
      },
      {
        label: "Image Resizer",
        href: "/image-resizer/",
        detail: "Resize images quickly",
      },
      {
        label: "Remove Background",
        href: "/remove-background/",
        detail: "Clean image backgrounds",
      },
      {
        label: "QR Code Generator",
        href: "/qr-code-generator/",
        detail: "Create QR codes instantly",
      },
      {
        label: "OCR Image to Text",
        href: "/ocr-image-to-text/",
        detail: "Extract text from images",
      },
      {
        label: "Image to Text",
        href: "/image-to-text/",
        detail: "Convert images into text",
      },
    ],
  },

{
  label: "Documents",
  items: [
    {
      label: "Merge PDF",
      href: "/merge-pdf/",
      detail: "Combine multiple PDF files",
    },
    {
      label: "PDF to Word",
      href: "/pdf-to-word/",
      detail: "Make PDFs editable",
    },
    {
      label: "PDF to Excel",
      href: "/pdf-to-excel/",
      detail: "Convert PDFs into spreadsheets",
    },
    {
      label: "PDF to JPG",
      href: "/pdf-to-jpg/",
      detail: "Convert PDF pages to images",
    },
    {
      label: "JPG to PDF",
      href: "/jpg-to-pdf/",
      detail: "Convert images into PDF files",
    },
    {
      label: "Screenshot to PDF",
      href: "/screenshot-to-pdf/",
      detail: "Turn screenshots into PDFs",
    },
  ],
},

  {
    label: "Video",
    items: [
      {
        label: "Video Studio",
        href: "/video-studio/",
        detail: "Trim, compress & convert videos",
      },
      {
        label: "YouTube Thumbnail Downloader",
        href: "/youtube-thumbnail-downloader/",
        detail: "Download YouTube thumbnails",
      },
      {
        label: "YouTube Video Downloader",
        href: "/youtube-video-downloader/",
        detail: "Download YouTube videos",
      },
      {
        label: "Instagram Video Downloader",
        href: "/instagram-video-downloader/",
        detail: "Download Instagram videos",
      },
      {
        label: "TikTok Video Downloader",
        href: "/tiktok-video-downloader/",
        detail: "Download TikTok videos",
      },
      {
        label: "Video to GIF",
        href: "/video-to-gif/",
        detail: "Convert videos into GIFs",
      },
      {
        label: "GIF to MP4",
        href: "/gif-to-mp4/",
        detail: "Convert GIFs into MP4 videos",
      },
    ],
  },

  {
    label: "Audio & AI",
    items: [
      {
        label: "Audio Cutter",
        href: "/audio-cutter/",
        detail: "Cut and trim audio files",
      },
      {
        label: "Speech to Text",
        href: "/speech-to-text/",
        detail: "Convert speech into text",
      },
      {
        label: "Text to Speech",
        href: "/text-to-speech/",
        detail: "Convert text into natural speech",
      },
    ],
  },
];

const navigation = [
  { label: "Tools", href: "/tools/" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

/* ============================================================
   ANIMATIONS
   ============================================================ */

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: {
      duration: 0.14,
      ease: "easeIn",
    },
  },
};

const groupVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const mobileContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.045,
    },
  },

  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.15,
    },
  },
};

const mobileItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -8,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ============================================================
   ICONS
   ============================================================ */

function ArrowIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 10h11" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <motion.svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      animate={{ rotate: 0 }}
      aria-hidden="true"
    >
      <path d="m5 7.5 5 5 5-5" />
    </motion.svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <motion.path
        d="M4 7h16"
        animate={{ rotate: 0, y: 0 }}
      />

      <motion.path
        d="M4 12h16"
        animate={{ opacity: 1 }}
      />

      <motion.path
        d="M4 17h16"
        animate={{ rotate: 0, y: 0 }}
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <motion.path
        d="m6 6 12 12"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.2 }}
      />

      <motion.path
        d="m18 6-12 12"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.2,
          delay: 0.05,
        }}
      />
    </svg>
  );
}

function ToolIcon({
  type,
}: {
  type: "image" | "document" | "video" | "audio";
}) {
  if (type === "document") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    );
  }

  if (type === "video") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="6"
          width="13"
          height="12"
          rx="2"
        />

        <path d="m16 10 5-3v10l-5-3z" />
      </svg>
    );
  }

  if (type === "audio") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path d="M9 18V6l10-2v12" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="16" cy="16" r="3" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
      />

      <circle
        cx="8.5"
        cy="9"
        r="1.4"
      />

      <path d="m21 15-5-5-7 7-2-2-4 4" />
    </svg>
  );
}

/* ============================================================
   TOOL GROUP ICON TYPE
   ============================================================ */

function getToolIconType(
  groupLabel: string,
): "image" | "document" | "video" | "audio" {
  if (groupLabel === "Documents") {
    return "document";
  }

  if (groupLabel === "Video") {
    return "video";
  }

  if (groupLabel === "Audio & AI") {
    return "audio";
  }

  return "image";
}

/* ============================================================
   NAVBAR
   ============================================================ */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  function closeMenus() {
    setMobileOpen(false);
    setToolsOpen(false);
  }

  /*
   * Keep the mobile list controlled.
   *
   * This prevents the mobile navbar from becoming an extremely
   * long page now that many tools are being added.
   */
  const mobilePopularTools = toolGroups
    .flatMap((group) => group.items)
    .slice(0, 8);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-2xl">
      <div className="iclaude-container">
        <div className="flex h-[76px] items-center justify-between gap-4">

          {/* ==================================================
              LOGO
              ================================================== */}

          <Link
            href="/"
            onClick={closeMenus}
            className="group flex shrink-0 items-center gap-3"
            aria-label="iclaude home"
          >
            <motion.span
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm"
              whileHover={{
                y: -2,
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <Image
                src="/icon.png"
                alt="iclaude logo"
                width={40}
                height={40}
                priority
                className="h-full w-full object-contain"
              />
            </motion.span>

            <span className="hidden sm:block">
              <motion.span
                className="block text-[18px] font-black tracking-[-0.04em] text-slate-950"
                whileHover={{ x: 1 }}
              >
                iclaude
              </motion.span>

              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                File tools, simplified
              </span>
            </span>
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
              ================================================== */}

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {/* =================================================
                TOOLS
                ================================================= */}

            <div className="relative">
              <motion.button
                type="button"
                onClick={() =>
                  setToolsOpen((open) => !open)
                }
                className="group relative inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition"
                whileTap={{ scale: 0.97 }}
                aria-expanded={toolsOpen}
                aria-haspopup="true"
              >
                <span className="relative">
                  Tools

                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{
                      width: toolsOpen ? "100%" : 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  />
                </span>

                <motion.span
                  animate={{
                    rotate: toolsOpen ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <ChevronIcon />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-1/2 top-[calc(100%+12px)] z-50 w-[700px] max-w-[calc(100vw-32px)] -translate-x-1/2 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.16)]"
                  >
                    {/* Scrollable tool area */}
                    <div className="max-h-[min(70vh,620px)] overflow-y-auto overscroll-contain pr-1">
                      <motion.div
                        variants={groupVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 gap-2 lg:grid-cols-4"
                      >
                        {toolGroups.map((group) => (
                          <motion.div
                            key={group.label}
                            variants={itemVariants}
                            className="rounded-2xl bg-slate-50 p-3"
                          >
                            <p className="px-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                              {group.label}
                            </p>

                            <div className="mt-2 space-y-1">
                              {group.items.map((item) => (
                                <motion.div
                                  key={item.href}
                                  variants={itemVariants}
                                >
                                  <Link
                                    href={item.href}
                                    onClick={closeMenus}
                                    className="group/item block rounded-xl p-2.5 transition hover:bg-white"
                                  >
                                    <motion.span
                                      className="flex items-center gap-2 text-xs font-bold text-slate-800"
                                      whileHover={{ x: 3 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                      }}
                                    >
                                      <motion.span
                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm"
                                        whileHover={{
                                          scale: 1.08,
                                          rotate: -3,
                                        }}
                                        transition={{
                                          type: "spring",
                                          stiffness: 400,
                                          damping: 18,
                                        }}
                                      >
                                        <ToolIcon
                                          type={getToolIconType(
                                            group.label,
                                          )}
                                        />
                                      </motion.span>

                                      <span>
                                        {item.label}
                                      </span>
                                    </motion.span>

                                    <span className="mt-1 block pl-9 text-[10px] leading-4 text-slate-500">
                                      {item.detail}
                                    </span>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Complete toolbox CTA */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.16,
                        duration: 0.2,
                      }}
                    >
                      <Link
                        href="/tools/"
                        onClick={closeMenus}
                        className="mt-2 flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-blue-600"
                      >
                        View the complete toolbox

                        <motion.span
                          whileHover={{ x: 4 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          }}
                        >
                          <ArrowIcon />
                        </motion.span>
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* =================================================
                OTHER LINKS
                ================================================= */}

            {navigation.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
              >
                {item.label}

                <motion.span
                  className="absolute bottom-1 left-4 right-4 h-[2px] origin-left rounded-full bg-blue-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{
                    duration: 0.2,
                  }}
                />
              </Link>
            ))}
          </nav>

          {/* ==================================================
              DESKTOP CTA
              ================================================== */}

          <motion.div
            className="hidden md:block"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <Link
              href="/tools/"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(15,23,42,0.14)] transition hover:bg-blue-600 hover:shadow-[0_14px_34px_rgba(37,99,235,0.25)]"
            >
              Explore tools

              <motion.span
                whileHover={{ x: 4 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <ArrowIcon />
              </motion.span>
            </Link>
          </motion.div>

          {/* ==================================================
              MOBILE MENU BUTTON
              ================================================== */}

          <motion.button
            type="button"
            onClick={() =>
              setMobileOpen((open) => !open)
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
            whileTap={{ scale: 0.9 }}
            aria-label={
              mobileOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.span
                key={
                  mobileOpen ? "close" : "menu"
                }
                initial={{
                  opacity: 0,
                  rotate: -45,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 45,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.16,
                }}
              >
                {mobileOpen ? (
                  <CloseIcon />
                ) : (
                  <MenuIcon />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* ====================================================
            MOBILE NAVIGATION
            ==================================================== */}

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden md:hidden"
            >
              <motion.nav
                aria-label="Mobile navigation"
                variants={mobileContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="border-t border-slate-100 pb-5 pt-4"
              >
                {/* Main links */}
                <div className="grid gap-1 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                  {navigation.map((item) => (
                    <motion.div
                      key={item.href}
                      variants={mobileItemVariants}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenus}
                        className="group flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 active:scale-[0.985]"
                      >
                        <span>{item.label}</span>

                        <motion.span
                          className="text-slate-300"
                          whileHover={{ x: 4 }}
                        >
                          <ArrowIcon />
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* =================================================
                    MOBILE POPULAR TOOLS

                    Only a limited number are displayed here so
                    adding more tools does not make the mobile
                    navbar excessively long.
                    ================================================= */}

                <motion.div
                  variants={mobileItemVariants}
                  className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex items-center justify-between px-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                      Popular tools
                    </p>

                    <Link
                      href="/tools/"
                      onClick={closeMenus}
                      className="text-[10px] font-bold text-blue-600"
                    >
                      View all
                    </Link>
                  </div>

                  <div className="mt-2 grid gap-1">
                    {mobilePopularTools.map(
                      (item) => (
                        <motion.div
                          key={item.href}
                          variants={mobileItemVariants}
                        >
                          <Link
                            href={item.href}
                            onClick={closeMenus}
                            className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-950"
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ),
                    )}
                  </div>
                </motion.div>

                {/* =================================================
                    MOBILE CTA
                    ================================================= */}

                <motion.div
                  variants={mobileItemVariants}
                >
                  <Link
                    href="/tools/"
                    onClick={closeMenus}
                    className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
                  >
                    Explore all tools

                    <ArrowIcon />
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
