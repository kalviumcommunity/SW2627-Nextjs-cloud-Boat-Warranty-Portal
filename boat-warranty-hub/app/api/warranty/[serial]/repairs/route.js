import { NextResponse } from "next/server";
import { findProductBySerialNumber } from "@/repositories/product.repository";
import { getRepairsByProductId } from "@/services/repair.service";
import { createRepair } from "@/repositories/repair.repository";
import logger from "@/lib/logger";

export async function GET(request, context) {
    try {
        const { serial } = await context.params;
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

export async function POST(request, { params }) {
    try {
        const { serial } = await params;
        const body = await request.json();
        const { issue } = body;

        if (!issue || typeof issue !== 'string' || issue.trim().length === 0) {
            return NextResponse.json({ success: false, message: "Please enter your issue / complaint details." }, { status: 400 });
        }

        const product = await findProductBySerialNumber(serial);
        if (!product) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        const today = new Date();
        const isExpired = !product.isActive || (product.warrantyExpiry && new Date(product.warrantyExpiry) < today);
        if (isExpired) {
            return NextResponse.json({
                success: false,
                message: "Warranty Expired: Repair requests can only be raised for products under active warranty."
            }, { status: 400 });
        }

        const repair = await createRepair({
            productId: product.id,
            issue: issue.trim(),
            repairStatus: 'PENDING',
            technicianNotes: 'Submitted by user via Warranty Result portal'
        });

        return NextResponse.json({
            success: true,
            message: "Repair request submitted successfully",
            data: repair
        }, { status: 201 });
    } catch (error) {
        logger.error({ error }, "Failed to create repair request");
        return NextResponse.json({ success: false, message: error.message || "Failed to submit repair request" }, { status: 500 });
    }
}
