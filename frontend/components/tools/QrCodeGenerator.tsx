
"use client";

import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";

type QRType =
  | "url"
  | "text"
  | "whatsapp"
  | "phone"
  | "email"
  | "wifi"
  | "upi"
  | "vcard";

type WifiSecurity = "WPA" | "WEP" | "nopass";

type QRCodeModule = typeof import("qrcode");

const QR_TYPES: Array<{
  id: QRType;
  label: string;
  description: string;
}> = [
  {
    id: "url",
    label: "URL",
    description: "Website or landing page",
  },
  {
    id: "text",
    label: "Text",
    description: "Plain text",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Chat link",
  },
  {
    id: "phone",
    label: "Phone",
    description: "Phone number",
  },
  {
    id: "email",
    label: "Email",
    description: "Email address",
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    description: "Network access",
  },
  {
    id: "upi",
    label: "UPI",
    description: "UPI payment",
  },
  {
    id: "vcard",
    label: "Contact",
    description: "Contact card",
  },
];

const DEFAULT_FOREGROUND = "#111827";
const DEFAULT_BACKGROUND = "#ffffff";

function escapeWifiValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/:/g, "\\:");
}

function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, "");
}

function buildVCardValue(
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  organization: string,
): string {
  const fullName = `${firstName} ${lastName}`.trim();

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lastName};${firstName};;;`,
    `FN:${fullName || "Contact"}`,
    organization ? `ORG:${organization}` : "",
    phone ? `TEL:${normalizePhone(phone)}` : "",
    email ? `EMAIL:${email.trim()}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function QrCodeGenerator() {
  const [type, setType] = useState<QRType>("url");

  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] =
    useState<WifiSecurity>("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  const [upiId, setUpiId] = useState("");
  const [upiName, setUpiName] = useState("");
  const [upiAmount, setUpiAmount] = useState("");
  const [upiNote, setUpiNote] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [organization, setOrganization] = useState("");

  const [foreground, setForeground] = useState(
    DEFAULT_FOREGROUND,
  );
  const [background, setBackground] = useState(
    DEFAULT_BACKGROUND,
  );

  const [size, setSize] = useState(360);
  const [margin, setMargin] = useState(4);

  const [qrPng, setQrPng] = useState("");
  const [qrSvg, setQrSvg] = useState("");

  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const selectedType = useMemo(
    () => QR_TYPES.find((item) => item.id === type),
    [type],
  );

  const buildQrValue = useCallback((): string => {
    switch (type) {
      case "url": {
        return url.trim();
      }

      case "text": {
        return text;
      }

      case "whatsapp": {
        const number = normalizePhone(whatsapp);

        if (!number) {
          return "";
        }

        return `https://wa.me/${number.replace(/^\+/, "")}`;
      }

      case "phone": {
        const number = normalizePhone(phone);

        return number ? `tel:${number}` : "";
      }

      case "email": {
        const address = email.trim();

        return address ? `mailto:${address}` : "";
      }

      case "wifi": {
        if (!wifiSsid.trim()) {
          return "";
        }

        return [
          "WIFI:",
          `T:${wifiSecurity};`,
          `S:${escapeWifiValue(wifiSsid.trim())};`,
          `P:${escapeWifiValue(wifiPassword)};`,
          `H:${wifiHidden ? "true" : "false"};;`,
        ].join("");
      }

      case "upi": {
        const id = upiId.trim();

        if (!id) {
          return "";
        }

        const params = new URLSearchParams();

        params.set("pa", id);

        if (upiName.trim()) {
          params.set("pn", upiName.trim());
        }

        if (upiAmount.trim()) {
          params.set("am", upiAmount.trim());
        }

        if (upiNote.trim()) {
          params.set("tn", upiNote.trim());
        }

        params.set("cu", "INR");

        return `upi://pay?${params.toString()}`;
      }

      case "vcard": {
        return buildVCardValue(
          firstName.trim(),
          lastName.trim(),
          contactPhone.trim(),
          contactEmail.trim(),
          organization.trim(),
        );
      }

      default:
        return "";
    }
  }, [
    type,
    url,
    text,
    whatsapp,
    phone,
    email,
    wifiSsid,
    wifiPassword,
    wifiSecurity,
    wifiHidden,
    upiId,
    upiName,
    upiAmount,
    upiNote,
    firstName,
    lastName,
    contactPhone,
    contactEmail,
    organization,
  ]);

  const validate = useCallback(
    (value: string): string => {
      if (!value.trim()) {
        return `Enter the ${selectedType?.label.toLowerCase() ?? "required"} information first.`;
      }

      if (type === "url") {
        try {
          const parsed = new URL(value.trim());

          if (!["http:", "https:"].includes(parsed.protocol)) {
            return "Enter a valid HTTP or HTTPS URL.";
          }
        } catch {
          return "Enter a valid website URL, for example https://example.com.";
        }
      }

      if (type === "email") {
        const emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.trim())) {
          return "Enter a valid email address.";
        }
      }

      if (type === "whatsapp") {
        const number = normalizePhone(value);

        if (number.length < 7) {
          return "Enter a valid WhatsApp phone number.";
        }
      }

      if (type === "phone") {
        const number = normalizePhone(value);

        if (number.length < 7) {
          return "Enter a valid phone number.";
        }
      }

      if (type === "wifi" && !wifiSsid.trim()) {
        return "Enter your Wi-Fi network name.";
      }

      if (type === "upi") {
        if (!upiId.trim() || !upiId.includes("@")) {
          return "Enter a valid UPI ID, for example name@upi.";
        }

        if (
          upiAmount.trim() &&
          Number.isNaN(Number(upiAmount))
        ) {
          return "Enter a valid UPI amount.";
        }
      }

      if (type === "vcard") {
        const hasContactData =
          firstName.trim() ||
          lastName.trim() ||
          contactPhone.trim() ||
          contactEmail.trim() ||
          organization.trim();

        if (!hasContactData) {
          return "Enter at least one contact detail.";
        }

        if (
          contactEmail.trim() &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            contactEmail.trim(),
          )
        ) {
          return "Enter a valid contact email address.";
        }
      }

      return "";
    },
    [
      selectedType,
      type,
      wifiSsid,
      upiId,
      upiAmount,
      firstName,
      lastName,
      contactPhone,
      contactEmail,
      organization,
    ],
  );

  const loadQRCode = useCallback(async (): Promise<QRCodeModule> => {
    return import("qrcode");
  }, []);

  const generateQr = useCallback(async () => {
    const value = buildQrValue();
    const validationError = validate(value);

    setError(validationError);
    setCopied(false);

    if (validationError) {
      setQrPng("");
      setQrSvg("");
      return;
    }

    setGenerating(true);

    try {
      const QRCode = await loadQRCode();

      const options = {
        errorCorrectionLevel: "M" as const,
        margin,
        width: size,
        color: {
          dark: foreground,
          light: background,
        },
      };

      const [png, svg] = await Promise.all([
        QRCode.toDataURL(value, options),
        QRCode.toString(value, {
          ...options,
          type: "svg",
        }),
      ]);

      setQrPng(png);
      setQrSvg(svg);
      setError("");
    } catch {
      setQrPng("");
      setQrSvg("");
      setError(
        "Unable to generate the QR code. Please check your information and try again.",
      );
    } finally {
      setGenerating(false);
    }
  }, [
    buildQrValue,
    validate,
    loadQRCode,
    margin,
    size,
    foreground,
    background,
  ]);


  const reset = () => {
    setType("url");

    setUrl("");
    setText("");
    setWhatsapp("");
    setPhone("");
    setEmail("");

    setWifiSsid("");
    setWifiPassword("");
    setWifiSecurity("WPA");
    setWifiHidden(false);

    setUpiId("");
    setUpiName("");
    setUpiAmount("");
    setUpiNote("");

    setFirstName("");
    setLastName("");
    setContactPhone("");
    setContactEmail("");
    setOrganization("");

    setForeground(DEFAULT_FOREGROUND);
    setBackground(DEFAULT_BACKGROUND);
    setSize(360);
    setMargin(4);

    setQrPng("");
    setQrSvg("");
    setError("");
    setCopied(false);
  };

  const downloadPng = () => {
    if (!qrPng) {
      return;
    }

    const link = document.createElement("a");

    link.href = qrPng;
    link.download = "iclaude-qr-code.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const downloadSvg = () => {
    if (!qrSvg) {
      return;
    }

    const blob = new Blob([qrSvg], {
      type: "image/svg+xml;charset=utf-8",
    });

    const urlObject = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = urlObject;
    link.download = "iclaude-qr-code.svg";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(urlObject);
  };

  const copyValue = async () => {
    const value = buildQrValue();

    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleColorChange =
    (
      setter: (value: string) => void,
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const renderInput = () => {
    switch (type) {
      case "url":
        return (
          <Field
            label="Website URL"
            placeholder="https://example.com"
            value={url}
            onChange={setUrl}
            type="url"
            autoComplete="url"
          />
        );

      case "text":
        return (
          <TextareaField
            label="Text"
            placeholder="Enter the text you want to encode..."
            value={text}
            onChange={setText}
          />
        );

      case "whatsapp":
        return (
          <Field
            label="WhatsApp number"
            placeholder="+91 9876543210"
            value={whatsapp}
            onChange={setWhatsapp}
            type="tel"
            helper="Include your country code."
          />
        );

      case "phone":
        return (
          <Field
            label="Phone number"
            placeholder="+91 9876543210"
            value={phone}
            onChange={setPhone}
            type="tel"
            helper="Include your country code for international numbers."
          />
        );

      case "email":
        return (
          <Field
            label="Email address"
            placeholder="hello@example.com"
            value={email}
            onChange={setEmail}
            type="email"
          />
        );

      case "wifi":
        return (
          <div className="space-y-4">
            <Field
              label="Network name"
              placeholder="My Wi-Fi"
              value={wifiSsid}
              onChange={setWifiSsid}
            />

            <Field
              label="Password"
              placeholder="Wi-Fi password"
              value={wifiPassword}
              onChange={setWifiPassword}
              type="text"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Security
                </span>

                <select
                  value={wifiSecurity}
                  onChange={(event) =>
                    setWifiSecurity(
                      event.target.value as WifiSecurity,
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                >
                  <option value="WPA">WPA / WPA2 / WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No password</option>
                </select>
              </label>

              <label className="flex items-center gap-3 self-end rounded-xl border border-slate-200 bg-white px-4 py-3">
                <input
                  type="checkbox"
                  checked={wifiHidden}
                  onChange={(event) =>
                    setWifiHidden(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300"
                />

                <span className="text-sm font-medium text-slate-700">
                  Hidden network
                </span>
              </label>
            </div>
          </div>
        );

      case "upi":
        return (
          <div className="space-y-4">
            <Field
              label="UPI ID"
              placeholder="yourname@upi"
              value={upiId}
              onChange={setUpiId}
              helper="Example: merchant@upi"
            />

            <Field
              label="Payee name"
              placeholder="Your name or business name"
              value={upiName}
              onChange={setUpiName}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Amount"
                placeholder="Optional"
                value={upiAmount}
                onChange={setUpiAmount}
                type="number"
                min="0"
                step="0.01"
              />

              <Field
                label="Payment note"
                placeholder="Optional"
                value={upiNote}
                onChange={setUpiNote}
              />
            </div>
          </div>
        );

      case "vcard":
        return (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="First name"
                placeholder="Syed"
                value={firstName}
                onChange={setFirstName}
              />

              <Field
                label="Last name"
                placeholder="Mustakhem"
                value={lastName}
                onChange={setLastName}
              />
            </div>

            <Field
              label="Phone"
              placeholder="+91 9876543210"
              value={contactPhone}
              onChange={setContactPhone}
              type="tel"
            />

            <Field
              label="Email"
              placeholder="hello@example.com"
              value={contactEmail}
              onChange={setContactEmail}
              type="email"
            />

            <Field
              label="Organization"
              placeholder="Company or business"
              value={organization}
              onChange={setOrganization}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Controls */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              QR Code Generator
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              Create your QR code
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Generate a QR code for a website, text, WhatsApp,
              Wi-Fi, UPI, email, phone number or contact.
            </p>
          </div>

          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-slate-800">
              QR code type
            </label>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {QR_TYPES.map((item) => {
                const active = item.id === type;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setType(item.id);
                      setError("");
                    }}
                    className={[
                      "rounded-2xl border px-3 py-3 text-left transition",
                      active
                        ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <span className="block text-sm font-semibold">
                      {item.label}
                    </span>

                    <span
                      className={[
                        "mt-1 block text-[11px] leading-4",
                        active
                          ? "text-slate-300"
                          : "text-slate-400",
                      ].join(" ")}
                    >
                      {item.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            {renderInput()}

            <div className="border-t border-slate-100 pt-5">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-800">
                  Appearance
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Customize the QR code before downloading it.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <input
                    type="color"
                    value={foreground}
                    onChange={handleColorChange(setForeground)}
                    className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                    aria-label="QR code foreground color"
                  />

                  <span>
                    <span className="block text-sm font-medium text-slate-700">
                      QR color
                    </span>
                    <span className="block text-xs text-slate-400">
                      Foreground
                    </span>
                  </span>
                </label>

                <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <input
                    type="color"
                    value={background}
                    onChange={handleColorChange(setBackground)}
                    className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                    aria-label="QR code background color"
                  />

                  <span>
                    <span className="block text-sm font-medium text-slate-700">
                      Background
                    </span>
                    <span className="block text-xs text-slate-400">
                      Background color
                    </span>
                  </span>
                </label>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>Size</span>
                    <span className="text-xs font-normal text-slate-400">
                      {size}px
                    </span>
                  </span>

                  <input
                    type="range"
                    min="180"
                    max="1000"
                    step="10"
                    value={size}
                    onChange={(event) =>
                      setSize(Number(event.target.value))
                    }
                    className="w-full accent-slate-900"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>Margin</span>
                    <span className="text-xs font-normal text-slate-400">
                      {margin}
                    </span>
                  </span>

                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="1"
                    value={margin}
                    onChange={(event) =>
                      setMargin(Number(event.target.value))
                    }
                    className="w-full accent-slate-900"
                  />
                </label>
              </div>
            </div>
          </div>

          {error ? (
            <div
              role="alert"
              className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void generateQr()}
              disabled={generating}
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {generating ? "Generating..." : "Generate QR Code"}
            </button>

            <button
              type="button"
              onClick={reset}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => void copyValue()}
              disabled={!qrPng}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? "Copied" : "Copy data"}
            </button>
          </div>
        </section>

        {/* Preview */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    QR preview
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {selectedType?.label ?? "QR Code"}
                  </p>
                </div>

                {generating ? (
                  <span className="text-xs font-medium text-slate-400">
                    Updating...
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex min-h-[390px] items-center justify-center bg-slate-50 p-6">
              {qrPng ? (
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  <img
                    src={qrPng}
                    alt="Generated QR code"
                    width={Math.min(size, 320)}
                    height={Math.min(size, 320)}
                    className="h-auto max-w-full"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-4 grid h-28 w-28 place-items-center rounded-2xl border-2 border-dashed border-slate-300 bg-white">
                    <span className="text-4xl text-slate-300">
                      QR
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-600">
                    Your QR code will appear here
                  </p>

                 <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
  Enter your information and click Generate QR Code to create
  your QR code.
</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-slate-100 p-4">
              <button
                type="button"
                onClick={downloadPng}
                disabled={!qrPng}
                className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Download PNG
              </button>

              <button
                type="button"
                onClick={downloadSvg}
                disabled={!qrSvg}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Download SVG
              </button>
            </div>
          </section>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs leading-5 text-slate-500">
              <strong className="font-semibold text-slate-700">
                Privacy:
              </strong>{" "}
              QR data is processed in your browser for this
              generator. It does not need to be uploaded to a
              backend to create the QR code.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  helper,
  autoComplete,
  min,
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  helper?: string;
  autoComplete?: string;
  min?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        step={step}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      />

      {helper ? (
        <span className="mt-1.5 block text-xs text-slate-400">
          {helper}
        </span>
      ) : null}
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={6}
        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      />
    </label>
  );
}

