import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function POST(req) {
    try {
        const data = await req.formData();
        const files = data.get("files");
        console.log("File haha: ",files);
        

        if (!files) {
            return Response.json({ error: "No file uploaded" }, { status: 400 });
        }

        const s3Client = new S3Client({
            region: "eu-north-1", 
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            }
        });

        const ext = files.name.split(".").pop();
        const newFileName = `${crypto.randomUUID()}.${ext}`;

        const buffer = Buffer.from(await files.arrayBuffer());

        const bucket = "pizzeria98";

        await s3Client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: newFileName,
                ACL: 'public-read', 
                ContentType: files.type || "application/octet-stream",
                Body: buffer,
            })
        );

        const link = `https://${bucket}.s3.eu-north-1.amazonaws.com/${newFileName}`;

        return Response.json({ link });
    } catch (error) {
        console.error("Upload Error:", error);
        return Response.json({ error: "File upload failed" }, { status: 500 });
    }
}
