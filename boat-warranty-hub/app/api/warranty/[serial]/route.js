import { NextResponse } from "next/server";
import { getWarrantyDetails } from "../../../../services/warranty.service";
import logger from "@/lib/logger";

export async function GET(request, { params }) {
    try {
        const { serial } = await params;
        const result = await getWarrantyDetails(serial);

        if (!result) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        logger.error({ error }, "Failed to fetch warranty details");
        return NextResponse.json(
            { message: "Failed to fetch warranty details" },
            { status: 500 }
        );
    }
}