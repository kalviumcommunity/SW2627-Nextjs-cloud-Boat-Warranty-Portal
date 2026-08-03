import {
    findProductById,
    updateWarrantyPdf,
} from "@/repositories/product.repository";

import { uploadWarrantyPdf, generateSignedUrl, deleteWarrantyPdf, } from "@/lib/storage";

export async function uploadProductWarrantyPdf(productId, file, forceReplace = false) {

    const product = await findProductById(productId);

    if (!product) {
        throw new Error("Product not found.");
    }

    if (product.warrantyPdfUrl) {
        if(!forceReplace){
            throw new Error("Warranty certificate already exists.");
        }
        await deleteWarrantyPdf(product.warrantyPdfUrl);
    }

    const fileName = `${product.serialNumber}.pdf`;

    const warrantyPdfUrl = await uploadWarrantyPdf(file, fileName);

    return await updateWarrantyPdf(productId, warrantyPdfUrl);
}

export async function getWarrantyPdf(productId){

    const product = await findProductById(productId);

    if(!product){
        throw new Error("Product not found.");
    }

    if(!product.warrantyPdfUrl){
        throw new Error("Warranty certificate not uploaded.");
    }

    return await generateSignedUrl(product.warrantyPdfUrl);
}