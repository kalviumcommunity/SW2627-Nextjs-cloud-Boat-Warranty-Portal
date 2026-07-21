import { NextResponse } from "next/server";
import { findProductBySerialNumber } from "@/repositories/product.repository";
import { getRepairsByProductId } from "@/services/repair.service";
import logger from "@/lib/logger";

export async function GET(request, { params }) {
    try {
        const { serial } = await params;
        const product = await findProductBySerialNumber(serial);
        
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        const repairs = await getRepairsByProductId(product.id);
        
        return NextResponse.json({ success: true, data: repairs });
    } catch (error) {
        logger.error({ error }, "Failed to fetch repairs");
        return NextResponse.json({ success: false, message: "Failed to fetch repairs" }, { status: 500 });
    }
}
