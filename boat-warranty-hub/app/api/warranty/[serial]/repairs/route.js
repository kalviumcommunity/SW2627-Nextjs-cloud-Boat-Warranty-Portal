import { NextResponse } from "next/server";
import { getRepairsBySerialNumber } from "@/services/repair.service";
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
