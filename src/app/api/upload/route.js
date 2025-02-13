import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { unique } from "next/dist/build/utils";

export async function POST(req){
    const data = await req.formData();
    if(data.get('file')){
        // upload the file
        const file = data.get('file');
        
        const s3Client = new S3Client({
            region: 'ap-south-1',
            credentials:{
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            }
        });

        const ext = file.name.split('.').slice(-1)[0];
        const newFileName = unique() + '.' + ext;

        const chunks = [];
        for await (const chunk of file.stream()){
            chunks.push(chunk);
        }

        await s3Client.send(new PutObjectCommand({
            Bucket: 'pizzeria98',
            key:'newFileName',
            ACL: 'public-read',
            ContentType: file.type,
        }))

    }
    
    return Response.json(true);
}
