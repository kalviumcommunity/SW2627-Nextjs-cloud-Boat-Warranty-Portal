import { prisma } from  '@/lib/prisma';

export async function findProductBySerialNumber(serialNumber){
    return await prisma.product.findUnique({
        where:{serialNumber}
    })
}

export async function findProductById(id) {
    return await prisma.product.findUnique({
        where:{id}
    })
}

export async function findAllProducts() {
    return await prisma.product.findMany();
}

export async function createProduct(data) {
    return await prisma.product.create({
        data,
    });
}

export async function updateProduct(id, data) {
    return await prisma.product.update({
        where:{id},
        data,
    })
}

export async function deleteProduct(id) {
    return await prisma.product.delete({
        where:{id},
    })
}

export async function countProducts() {
    return prisma.product.count();
}

export async function countActiveProducts() {
    return prisma.product.count({
        where: {
            isActive: true,
            warrantyExpiry: {
                gte: new Date()
            }
        }
    });
}

export async function countExpiredProducts() {
    return prisma.product.count({
        where: {
            isActive: true,
            warrantyExpiry: {
                lt: new Date()
            }
        }
    });
}   