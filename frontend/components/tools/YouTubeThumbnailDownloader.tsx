"use client";

import { useMemo, useState } from "react";

type Thumbnail = {
  name: string;
  url: string;
  description: string;
};

function extractYouTubeVideoId(value: string): string | null {
  const input = value.trim();

  if (!input) return null;

  try {
    const url = new URL(
      input.startsWith("http://") || input.startsWith("https://")
        ? input
        : `https://${input}`,
    );

    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "music.youtube.com"
    ) {
      const watchId = url.searchParams.get("v");
      if (watchId) return watchId;

      const parts = url.pathname.split("/").filter(Boolean);

      if (parts[0] === "shorts" && parts[1]) {
        return parts[1];
      }

      if (parts[0] === "embed" && parts[1]) {
        return parts[1];
      }

      if (parts[0] === "live" && parts[1]) {
        return parts[1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

function isValidVideoId(videoId: string): boolean {
  return /^[A-Za-z0-9_-]{11}$/.test(videoId);
}

export default function YouTubeThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const thumbnails = useMemo<Thumbnail[]>(() => {
    if (!videoId) return [];

    return [
      {
        name: "Maximum Resolution",
        url: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        description: "Highest available thumbnail resolution.",
      },
      {
        name: "High Quality",
        url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        description: "High-quality YouTube thumbnail.",
      },
      {
        name: "Medium Quality",
        url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        description: "Medium-quality thumbnail.",
      },
      {
        name: "Standard Quality",
        url: `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
        description: "Standard thumbnail resolution.",
      },
    ];
  }, [videoId]);

  function handleGenerate() {
    setError("");
    setVideoId(null);

    const extractedId = extractYouTubeVideoId(url);

    if (!extractedId || !isValidVideoId(extractedId)) {
      setError(
        "Enter a valid YouTube video URL, such as https://www.youtube.com/watch?v=...",
      );
      return;
    }

    setLoading(true);

    window.setTimeout(() => {
      setVideoId(extractedId);
      setLoading(false);
    }, 250);
  }

  function handleClear() {
    setUrl("");
    setVideoId(null);
    setError("");
  }

  function handleDownload(thumbnailUrl: string, name: string) {
    const link = document.createElement("a");

    link.href = thumbnailUrl;
    link.download = `youtube-thumbnail-${name
      .toLowerCase()
      .replace(/\s+/g, "-")}.jpg`;

    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-br from-red-50 via-white to-slate-50 px-5 py-8 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-100">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Download YouTube Thumbnail
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Paste a YouTube video URL to preview available thumbnail
              images and download the resolution you need.
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <label
            htmlFor="youtube-url"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            YouTube video URL
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="youtube-url"
              type="url"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                if (error) setError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleGenerate();
                }
              }}
              placeholder="https://www.youtube.com/watch?v=..."
              className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-50"
              aria-describedby={error ? "youtube-error" : undefined}
            />

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !url.trim()}
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Loading..." : "Get Thumbnail"}
            </button>
          </div>

          {error && (
            <p
              id="youtube-error"
              role="alert"
              className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {!videoId && !error && (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 12 2 2 4-4"
                  />
                </svg>
              </div>

              <p className="mt-4 font-semibold text-slate-800">
                Your thumbnail will appear here
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Enter a YouTube URL above to get started.
              </p>
            </div>
          )}

          {videoId && (
            <div className="mt-8">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Available thumbnails
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose a resolution and download the image.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClear}
                  className="self-start rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {thumbnails.map((thumbnail) => (
                  <ThumbnailCard
                    key={thumbnail.name}
                    thumbnail={thumbnail}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <InfoCard
          title="Simple"
          description="Paste a YouTube URL and preview the available thumbnail."
        />

        <InfoCard
          title="Fast"
          description="The video ID is processed directly in your browser."
        />

        <InfoCard
          title="Multiple sizes"
          description="Choose from available YouTube thumbnail resolutions."
        />
      </div>
    </div>
  );
}

function ThumbnailCard({
  thumbnail,
  onDownload,
}: {
  thumbnail: Thumbnail;
  onDownload: (url: string, name: string) => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {!imageError ? (
          <img
            src={thumbnail.url}
            alt={`${thumbnail.name} YouTube thumbnail`}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <p className="text-sm text-slate-500">
              This resolution is not available for this video.
            </p>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold text-slate-900">
              {thumbnail.name}
            </h4>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {thumbnail.description}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            JPG
          </span>
        </div>

        <button
          type="button"
          onClick={() => onDownload(thumbnail.url, thumbnail.name)}
          disabled={imageError}
          className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Download
        </button>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}