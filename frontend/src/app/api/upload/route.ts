import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename)
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });

    if (!request.body)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const buffer = Buffer.from(await request.arrayBuffer());

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    await writeFile(path.join(uploadDir, safeName), buffer);

    const url = `/uploads/${safeName}`;
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
