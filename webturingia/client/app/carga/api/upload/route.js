import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file || !(file instanceof Blob)) {
      return new Response(
        JSON.stringify({ message: "No file provided or file is not a valid Blob" }),
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const dirPath = "C:\\Users\\crist\\Desktop\\modelo\\modeloautoscoches";
    const filePath = path.join(dirPath, file.name);

    // Verifica que la ruta de destino exista y, si no, créala
    await mkdir(dirPath, { recursive: true });

    await writeFile(filePath, buffer);
    console.log(`File saved at ${filePath}`);

    return new Response(
      JSON.stringify({ message: "File uploaded successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return new Response(
      JSON.stringify({ message: "Failed to upload file" }),
      { status: 500 }
    );
  }
}
