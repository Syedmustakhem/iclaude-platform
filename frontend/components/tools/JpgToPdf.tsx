"use client";

import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";

type ImageItem = {
  id: string;
  file: File;
  preview: string;
};

export default function JpgToPdf() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  function addImages(files: FileList | File[]) {
    setError("");

    const selectedFiles = Array.from(files).filter((file) =>
      ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        file.type,
      ),
    );

    if (!selectedFiles.length) {
      setError("Please select JPG, JPEG, PNG, or WebP images.");
      return;
    }

    const newImages: ImageItem[] = selectedFiles.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((current) => [...current, ...newImages]);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      addImages(event.target.files);
    }

    event.target.value = "";
  }

  function removeImage(id: string) {
    setImages((current) => {
      const image = current.find((item) => item.id === id);

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return current.filter((item) => item.id !== id);
    });
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((current) => {
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= current.length) {
        return current;
      }

      const next = [...current];
      [next[index], next[targetIndex]] = [
        next[targetIndex],
        next[index],
      ];

      return next;
    });
  }

  function clearImages() {
    images.forEach((image) => URL.revokeObjectURL(image.preview));
    setImages([]);
    setError("");
  }

  async function generatePdf() {
    if (!images.length) {
      setError("Add at least one image before creating your PDF.");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      for (let index = 0; index < images.length; index += 1) {
        const image = images[index];

        if (index > 0) {
          pdf.addPage("a4", "portrait");
        }

        const dataUrl = await fileToDataUrl(image.file);
        const dimensions = await getImageDimensions(dataUrl);

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;

        const availableWidth = pageWidth - margin * 2;
        const availableHeight = pageHeight - margin * 2;

        const ratio = Math.min(
          availableWidth / dimensions.width,
          availableHeight / dimensions.height,
        );

        const width = dimensions.width * ratio;
        const height = dimensions.height * ratio;

        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;

        const format = getPdfImageFormat(image.file.type);

        pdf.addImage(
          dataUrl,
          format,
          x,
          y,
          width,
          height,
          undefined,
          "FAST",
        );
      }

      pdf.save("iclaude-jpg-to-pdf.pdf");
    } catch {
      setError("Something went wrong while creating the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="p-5 sm:p-8">
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-blue-300 hover:bg-blue-50/30 sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16.5V19a1 1 0 001 1h14a1 1 0 001-1v-2.5M12 4v11m0 0l-4-4m4 4l4-4"
              />
            </svg>
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Convert JPG images to PDF
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Upload one or multiple images and turn them into a single PDF
            document directly in your browser.
          </p>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Choose images
          </button>

          <p className="mt-3 text-xs text-slate-400">
            JPG, JPEG, PNG and WebP
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {images.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Selected images
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {images.length}{" "}
                  {images.length === 1 ? "image" : "images"} selected
                </p>
              </div>

              <button
                type="button"
                onClick={clearImages}
                className="text-left text-sm font-semibold text-slate-500 transition hover:text-red-600 sm:text-right"
              >
                Clear all
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <img
                      src={image.preview}
                      alt={image.file.name}
                      className="h-full w-full object-contain"
                    />

                    <div className="absolute left-2 top-2 rounded-lg bg-slate-900/75 px-2 py-1 text-xs font-semibold text-white">
                      {index + 1}
                    </div>
                  </div>

                  <div className="p-3">
                    <p
                      className="truncate text-sm font-medium text-slate-700"
                      title={image.file.name}
                    >
                      {image.file.name}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => moveImage(index, -1)}
                        disabled={index === 0}
                        aria-label="Move image left"
                        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ←
                      </button>

                      <button
                        type="button"
                        onClick={() => moveImage(index, 1)}
                        disabled={index === images.length - 1}
                        aria-label="Move image right"
                        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        →
                      </button>

                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="ml-auto rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Add more images
              </button>

              <button
                type="button"
                onClick={generatePdf}
                disabled={isGenerating}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGenerating ? "Creating PDF..." : "Convert to PDF"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-8">
        <p className="text-center text-xs leading-5 text-slate-500">
          Your images are processed directly in your browser. They are not
          uploaded to our server.
        </p>
      </div>
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Unable to read image."));
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function getImageDimensions(
  dataUrl: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => reject(new Error("Unable to load image."));
    image.src = dataUrl;
  });
}

function getPdfImageFormat(type: string): "JPEG" | "PNG" {
  return type === "image/png" ? "PNG" : "JPEG";
}