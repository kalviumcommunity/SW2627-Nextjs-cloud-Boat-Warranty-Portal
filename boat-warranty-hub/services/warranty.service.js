import { findProductBySerialNumber } from "@/repositories/product.repository";

export async function verifyWarranty(serialNumber){
    
    const product = await findProductBySerialNumber(serialNumber);

    // console.log(product);
    
    if(!product){
        return null;
    }

    const today=new Date();

    let warrantyStatus;

    if(!product.isActive){
        warrantyStatus="INACTIVE";
    }else{
        warrantyStatus = today<=product.warrantyExpiry?"ACTIVE":"EXPIRED";
    }

    return{
        id: product.id,
        serialNumber: product.serialNumber,
        productName: product.productName,
        purchaseDate: product.purchaseDate,
        warrantyExpiry:product.warrantyExpiry,
        warrantyStatus
    };  
}    

export async function getWarrantyDetails(serialNumber) {
    const product = await findProductBySerialNumber(serialNumber);

    if (!product) {
        return null;
    }

    const today = new Date();
    let warrantyStatus;

    if (!product.isActive) {
        warrantyStatus = "INACTIVE";
    } else {
        warrantyStatus = today <= product.warrantyExpiry ? "ACTIVE" : "EXPIRED";
    }

    let totalRepairs = 0;
    let openRepairs = 0;
    let lastRepairDate = null;
    let lastRepairStatus = null;

    if (product.repairs && product.repairs.length > 0) {
        totalRepairs = product.repairs.length;
        
        // Sort repairs by date (descending)
        const sortedRepairs = [...product.repairs].sort((a, b) => new Date(b.repairDate) - new Date(a.repairDate));
        
        lastRepairDate = sortedRepairs[0].repairDate;
        lastRepairStatus = sortedRepairs[0].repairStatus;

        openRepairs = product.repairs.filter(r => r.repairStatus === 'PENDING' || r.repairStatus === 'IN_PROGRESS').length;
    }

    return {
        id: product.id,
        serialNumber: product.serialNumber,
        productName: product.productName,
        purchaseDate: product.purchaseDate,
        warrantyExpiry: product.warrantyExpiry,
        isActive: product.isActive,
        warrantyStatus,
        warrantyPdfUrl: product.warrantyPdfUrl,
        pdfUploadedAt: product.pdfUploadedAt,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        totalRepairs,
        openRepairs,
        lastRepairDate,
        lastRepairStatus
    };
}