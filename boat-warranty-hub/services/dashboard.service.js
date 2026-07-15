import {
    countProducts,
    countActiveProducts,
    countExpiredProducts
} from "../repositories/product.repository";

import {
    countRepairs,
    countPendingRepairs,
    countCompletedRepairs
} from "../repositories/repair.repository";

export async function getDashboardStats() {
    const [
        totalProducts,
        activeWarranties,
        expiredWarranties,
        totalRepairs,
        pendingRepairs,
        completedRepairs
    ] = await Promise.all([
        countProducts(),
        countActiveProducts(),
        countExpiredProducts(),
        countRepairs(),
        countPendingRepairs(),
        countCompletedRepairs()
    ]);

    return {
        totalProducts,
        activeWarranties,
        expiredWarranties,
        totalRepairs,
        pendingRepairs,
        completedRepairs
    };
}