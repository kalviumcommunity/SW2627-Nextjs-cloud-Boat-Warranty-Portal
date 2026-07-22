import { Storage } from "@google-cloud/storage";
import path from "path";

const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  ? path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS)
  : undefined;

const storageOptions = {};
if (process.env.GOOGLE_CLOUD_PROJECT_ID) {
  storageOptions.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
}
if (credentialsPath) {
  storageOptions.keyFilename = credentialsPath;
}

const storage = new Storage(storageOptions);

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME || 'boat-warranty-bucket';
const bucket = storage.bucket(bucketName);

export async function generateSignedUrl(fileName) {
  const file = bucket.file(fileName);
  const [url] = await file.getSignedUrl({
    version: "v4",
    action: "read",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });
  return url;
}

export async function uploadWarrantyPdf(file, fileName) {
  const uniqueFileName = `${Date.now()}-${fileName}`;
  const blob = bucket.file(uniqueFileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await blob.save(buffer, {
    metadata: {
      contentType: file.type,
    }
  });

  return uniqueFileName;
}
