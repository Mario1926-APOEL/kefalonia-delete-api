const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { publicId, resourceType } = req.body;
  if (!publicId) return res.status(400).json({ error: "Missing publicId" });

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType || "image",
    });
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
{
  "name": "kefalonia-delete-api",
  "version": "1.0.0",
  "dependencies": {
    "cloudinary": "^1.41.0"
  }
}
{
  "functions": {
    "api/delete-cloudinary.js": {
      "memory": 128,
      "maxDuration": 10
    }
  }
}
