import { Storage } from "@google-cloud/storage";
import path from "path";

const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename:path.join(
        process.cwd(),
        process.env.GOOGLE_APPLICATION_CREDENTIALS
    ),
});

export async function generateSignedUrl(fileName) {

    const file = bucket.file(fileName);

    const [url] = await file.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

    return url;
}

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

export async function uploadWarrantyPdf(file,fileName){

    const uniqueFileName = `${Date.now()}-${fileName}`;

    const blob = bucket.file(uniqueFileName);

    const buffer = Buffer.from(await file.arrayBuffer());

    await blob.save(buffer,{
        metadata:{
            contentType: file.type,
        }
    });

    return uniqueFileName;
}
