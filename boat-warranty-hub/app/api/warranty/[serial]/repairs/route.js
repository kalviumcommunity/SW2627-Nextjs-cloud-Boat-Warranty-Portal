import { NextResponse } from "next/server";
import { getRepairsBySerialNumber, addRepair } from "@/services/repair.service";
import { findProductBySerialNumber } from "@/repositories/product.repository";
import logger from "@/lib/logger";

export async function GET(request, context) {
    try {
        const { serial } = await context.params;
        if (!serial) {
            return NextResponse.json(
                { success: false, message: "Serial number is required" },
                { status: 400 }
            );
        }

        const repairs = await getRepairsBySerialNumber(serial);

        return NextResponse.json(
            {
                success: true,
                data: repairs,
            },
            { status: 200 }
        );
    } catch (error) {
        logger.error({ error }, "Failed to fetch repairs for serial number");
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch repair history",
            },
            { status: 500 }
        );
    }
}

export async function POST(request, context) {
    try {
        const { serial } = await context.params;
        if (!serial) {
            return NextResponse.json(
                { success: false, message: "Serial number is required" },
                { status: 400 }
            );
        }

        const body = await request.json();
        if (!body.issue) {
            return NextResponse.json(
                { success: false, message: "Issue description is required" },
                { status: 400 }
            );
        }

        const product = await findProductBySerialNumber(serial);
        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        const repair = await addRepair({
            issue: body.issue,
            productId: product.id,
        });

        return NextResponse.json(
            {
                success: true,
                data: repair,
            },
            { status: 201 }
        );
    } catch (error) {
        logger.error({ error }, "Failed to create repair request");
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to submit repair request",
            },
            { status: 500 }
        );
    }
}
