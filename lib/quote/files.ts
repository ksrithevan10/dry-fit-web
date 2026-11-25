/** Plan upload limits, shared by the browser and the upload route. */

export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 20 * 1024 * 1024;

export const ALLOWED_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  heic: "image/heic",
  heif: "image/heif",
};

export const ACCEPT =
  ".pdf,.jpg,.jpeg,.png,.heic,.heif,application/pdf,image/jpeg,image/png,image/heic,image/heif";

/**
 * Content type for an upload, from its extension. Some browsers report an
 * empty type for HEIC photos, so the extension is the reliable signal.
 */
export function contentTypeFor(fileName: string): string | undefined {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  return ALLOWED_TYPES[extension];
}

/** Vercel Blob public URLs look like https://<store>.public.blob.vercel-storage.com/... */
export function isBlobUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname.endsWith(".public.blob.vercel-storage.com")
    );
  } catch {
    return false;
  }
}
