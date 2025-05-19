import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const imagesDir = "D:/github student stuff/tennis-app/public/images";
  const files = await readdir(imagesDir);
  const imageFiles = files.filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  return NextResponse.json(imageFiles.map((f) => `/images/${f}`));
}
