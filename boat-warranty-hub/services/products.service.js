import { createProduct, deleteProduct, findAllProducts, findProductById, findProductBySerialNumber, updateProduct } from "../repositories/product.repository";


export async function getAllProducts(){
    return await findAllProducts();
}

export async function addProduct(data){
    const existingProduct = await findProductBySerialNumber(data.serialNumber);

    if (existingProduct){
        throw new Error("Product already exists");
    }

    return await createProduct({...data, purchaseDate: new Date(data.purchaseDate), warrantyExpiry: new Date(data.warrantyExpiry)});
}

export async function getProductById(id){
    const product = await findProductById(id);

    if(!product){
        throw new Error("Product not found");
    }

    return product;
}


export async function updateExistingProduct(id,data){
    const product = await findProductById(id);

    if(!product){
        throw new Error("Product not found");
    }

    return await updateProduct(id,data);
}

export async function deleteExisitingProduct(id){
    const product = await findProductById(id);

    if(!product){
        throw new Error("Product does not exist");
    }

    return await deleteProduct(id);
}