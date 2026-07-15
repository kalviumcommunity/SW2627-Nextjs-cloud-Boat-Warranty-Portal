import { prisma } from "@/lib/prisma";

export async function createRepair(data){
    return await prisma.repair.create({
        data,
    })
}

export async function findRepairById(id){
    return await prisma.repair.findMany({
        where:{id}
    })
}


export async function findRepairByProductId(productId){
    return await prisma.repair.findMany({
        where:{productId}
    })
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