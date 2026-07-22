import { prisma } from "@/lib/prisma";

export async function createRepair(data){
    return await prisma.repair.create({
        data,
    })
}

export async function findRepairById(id){
    return prisma.repair.findUnique({
        where: { id }
    });
}


export async function findRepairByProductId(productId){
    return prisma.repair.findMany({
        where: { productId },
        orderBy: { repairDate: "desc" }
    });
}

export async function updateRepair(id,data){
    return await prisma.repair.update({
        where:{id},
        data,
    })
}


export async function deleteRepair(id){
    return await prisma.repair.delete({
        where:{id}
    })
}

export async function countRepairs() {
    return prisma.repair.count();
}

export async function countPendingRepairs() {
    return prisma.repair.count({
        where: {repairStatus: "PENDING"}
    });
}

export async function countCompletedRepairs() {
    return prisma.repair.count({
        where: {repairStatus: "COMPLETED"}
    });
}

export async function getRecentRepairs(limit = 10) {
    return prisma.repair.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { product: true }
    });
}

