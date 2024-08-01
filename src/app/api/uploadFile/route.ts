import { IncomingForm } from "formidable";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(request: Request) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      // filename: (name, ext) => `file-${Date.now()}${ext}`
    });

    form.parse(request, (err, fields, files) => {
      if (err) {
        return reject(
          NextResponse.json(
            { error: `Sorry something happened! ${err.message}` },
            { status: 500 }
          )
        );
      }

      // `files` contains uploaded files
      const uploadedFile = files.file[0];
      const fileUrl = `/uploads/${path.basename(uploadedFile.filepath)}`;
      resolve(NextResponse.json({ success: 1, file: { url: fileUrl } }));
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
