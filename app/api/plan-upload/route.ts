import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { ALLOWED_TYPES, MAX_FILE_BYTES } from "@/lib/quote/files";

/**
 * Issues short-lived tokens so the browser can upload kitchen plans straight
 * to Vercel Blob. Files never pass through this function, which avoids
 * Vercel's 4.5MB request limit. Needs BLOB_READ_WRITE_TOKEN.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Uploads are not configured" },
      { status: 503 },
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("plans/")) throw new Error("Invalid path");
        return {
          allowedContentTypes: [...new Set(Object.values(ALLOWED_TYPES))],
          maximumSizeInBytes: MAX_FILE_BYTES,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
