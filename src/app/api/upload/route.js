import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get("file");
        console.log("File haha: ",file);
        

        if (!file) {
            return Response.json({ error: "No file uploaded" }, { status: 400 });
        }

        const s3Client = new S3Client({
            region: "ap-south-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
        });

        const ext = file.name.split(".").pop();
        const newFileName = `${crypto.randomUUID()}.${ext}`;

        // Convert file stream to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        const bucket = "pizzeria98";

        await s3Client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: newFileName, // Corrected Key
                ContentType: file.type || "application/octet-stream",
                Body: buffer,
            })
        );

        const link = `https://${bucket}.s3.amazonaws.com/${newFileName}`;

        return Response.json({ link });
    } catch (error) {
        console.error("Upload Error:", error);
        return Response.json({ error: "File upload failed" }, { status: 500 });
    }
}
