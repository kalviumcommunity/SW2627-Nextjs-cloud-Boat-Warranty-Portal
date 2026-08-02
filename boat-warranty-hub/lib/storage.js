import { Storage } from "@google-cloud/storage";
import path from "path";

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

function getStorage() {
  const storageOptions = {};

  if (process.env.GOOGLE_CLOUD_PROJECT_ID) {
    storageOptions.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    storageOptions.keyFilename = path.isAbsolute(credentialsPath)
      ? credentialsPath
      : path.resolve(process.cwd(), credentialsPath);
  }

  return new Storage(storageOptions);
}

function getBucket() {
  if (!bucketName) {
    throw new Error("GOOGLE_CLOUD_BUCKET_NAME must be set in the environment.");
  }

  const storage = getStorage();
  return storage.bucket(bucketName);
}

export async function generateSignedUrl(fileName) {
  const bucket = getBucket();
  const file = bucket.file(fileName);
  const [url] = await file.getSignedUrl({
    version: "v4",
    action: "read",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });
  return url;
}

export async function uploadWarrantyPdf(file, fileName) {
  const bucket = getBucket();
  const uniqueFileName = `${Date.now()}-${fileName}`;
  const blob = bucket.file(uniqueFileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await blob.save(buffer, {
    metadata: {
      contentType: file.type,
    },
  });

  return uniqueFileName;
}
