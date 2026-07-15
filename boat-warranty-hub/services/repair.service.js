import { findProductById } from "../repositories/product.repository";
import { createRepair, deleteRepair, findRepairById, findRepairByProductId, updateRepair } from "../repositories/repair.repository";


export async function addRepair(data){
    const product = await findProductById(data.productId);
    if(!product){
        throw new Error("Product does not exist")
    }

    if(!product.isActive){
        throw new Error("Cannot create repair for an inactive product.")
    }
    return await createRepair(data);
}

export async function getRepairById(id){
    return await findRepairById(id);
}

export async function getRepairsByProductId(productId){
    return await findRepairByProductId(productId);
}

export async function editRepair(id,data){
    return await updateRepair(id,data);
}

export async function removeRepair(id){
    return await deleteRepair(id)   
}