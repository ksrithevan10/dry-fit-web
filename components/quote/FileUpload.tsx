"use client";

import { upload } from "@vercel/blob/client";
import { useId, useRef, useState } from "react";
import { FieldError } from "@/components/ui/form";
import { quoteForm } from "@/content/quote";
import {
  ACCEPT,
  contentTypeFor,
  MAX_FILE_BYTES,
  MAX_FILES,
} from "@/lib/quote/files";

type Item = {
  key: string;
  name: string;
  status: "uploading" | "done" | "error";
  url?: string;
};

type FileUploadProps = {
  id: string;
  /** False when Vercel Blob is not configured: names are sent, files are not. */
  uploadsEnabled: boolean;
  onBusyChange: (busy: boolean) => void;
  error?: string;
};

/**
 * Kitchen plan picker. Each file uploads straight to Vercel Blob as soon as
 * it's chosen; the form then submits only the file links.
 */
export function FileUpload({
  id,
  uploadsEnabled,
  onBusyChange,
  error,
}: FileUploadProps) {
  const { fields, errors } = quoteForm;
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const hintId = useId();

  function update(key: string, patch: Partial<Item>) {
    setItems((current) => {
      const next = current.map((item) =>
        item.key === key ? { ...item, ...patch } : item,
      );
      onBusyChange(next.some((item) => item.status === "uploading"));
      return next;
    });
  }

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setMessage(undefined);
    const chosen = Array.from(files);

    if (items.length + chosen.length > MAX_FILES) {
      setMessage(errors.fileCount);
      return;
    }
    for (const file of chosen) {
      if (!contentTypeFor(file.name)) return setMessage(errors.fileType);
      if (file.size > MAX_FILE_BYTES) return setMessage(errors.fileSize);
    }

    const added = chosen.map((file) => ({
      file,
      item: {
        key: `${file.name}-${file.size}-${crypto.randomUUID()}`,
        name: file.name,
        status: uploadsEnabled ? "uploading" : "done",
      } as Item,
    }));
    setItems((current) => [...current, ...added.map(({ item }) => item)]);
    if (inputRef.current) inputRef.current.value = "";
    if (!uploadsEnabled) return;

    onBusyChange(true);
    await Promise.all(
      added.map(async ({ file, item }) => {
        try {
          const blob = await upload(`plans/${file.name}`, file, {
            access: "public",
            handleUploadUrl: "/api/plan-upload",
            contentType: contentTypeFor(file.name),
            multipart: file.size > 5 * 1024 * 1024,
          });
          update(item.key, { status: "done", url: blob.url });
        } catch {
          update(item.key, { status: "error" });
        }
      }),
    );
  }

  function remove(key: string) {
    setItems((current) => {
      const next = current.filter((item) => item.key !== key);
      onBusyChange(next.some((item) => item.status === "uploading"));
      return next;
    });
  }

  const shownError = message ?? error;

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-sm font-semibold">
        {fields.plan.label}
      </label>
      <p id={hintId} className="text-sm text-muted">
        {fields.plan.hint}
      </p>
      <input
        ref={inputRef}
        id={id}
        type="file"
        multiple
        accept={ACCEPT}
        aria-describedby={[hintId, shownError && `${id}-error`]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={shownError ? true : undefined}
        disabled={items.length >= MAX_FILES}
        onChange={(event) => addFiles(event.target.files)}
        className="min-h-touch w-full cursor-pointer rounded-input border-[1.5px] border-dashed border-option-border bg-card p-4 text-sm text-muted file:mr-4 file:cursor-pointer file:rounded-pill file:border-0 file:bg-ink file:px-4 file:py-2 file:font-semibold file:text-on-dark disabled:cursor-not-allowed"
      />
      {shownError && <FieldError id={`${id}-error`}>{shownError}</FieldError>}

      {items.length > 0 && (
        <ul aria-live="polite" className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.key}
              className="flex items-center justify-between gap-3 rounded-input bg-card px-4 py-2 text-sm"
            >
              <span className="min-w-0 truncate font-semibold">
                {item.name}
              </span>
              <span className="flex shrink-0 items-center gap-3">
                {item.status === "uploading" && (
                  <span className="text-muted">{fields.plan.uploading}</span>
                )}
                {item.status === "error" && (
                  <span className="text-error">{errors.upload}</span>
                )}
                <button
                  type="button"
                  onClick={() => remove(item.key)}
                  className="min-h-touch px-2 font-semibold underline underline-offset-4"
                >
                  {fields.plan.remove}
                  <span className="sr-only"> {item.name}</span>
                </button>
              </span>
              {item.status === "done" && (
                <>
                  <input type="hidden" name="planName" value={item.name} />
                  {item.url && (
                    <input type="hidden" name="planUrl" value={item.url} />
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
