import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function POST(req) {
  try {
    const data = await req.formData();
    const files = data.getAll("files");

    if (!files || files.length === 0) {
      return Response.json({ error: "No files uploaded" }, { status: 400 });
    }

    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY,
        secretAccessKey: process.env.MY_AWS_SECRET_KEY,
      },
    });

    const uploadedLinks = [];

    for (const file of files) {
      const ext = file.name.split(".").pop();
      const newFileName = `${crypto.randomUUID()}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      await s3Client.send(
        new PutObjectCommand({
          Bucket: "pizzeria98",
          Key: newFileName,
          ACL: "public-read",
          ContentType: file.type || "application/octet-stream",
          Body: buffer,
        })
      );

      const link = `https://pizzeria98.s3.eu-north-1.amazonaws.com/${newFileName}`;
      uploadedLinks.push(link);
    }

    return Response.json({ link: uploadedLinks.length === 1 ? uploadedLinks[0] : uploadedLinks });
  } catch (error) {
    console.error("Upload Error:", error);
    return Response.json({ error: "File upload failed" }, { status: 500 });
  }
}
