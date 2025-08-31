import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const fileStr = body.data; // 👈 frontend se base64 milega
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "travlink", // optional folder
    });

    return new Response(
      JSON.stringify({ url: uploadedResponse.secure_url }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return new Response(
      JSON.stringify({ error: "Upload failed", details: err.message }),
      { status: 500 }
    );
  }
}
