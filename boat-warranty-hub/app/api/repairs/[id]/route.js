import { NextResponse } from "next/server";
import { editRepair, getRepairById, removeRepair } from "../../../../services/repair.service";
import { updateRepairSchema } from "../../../../lib/validations";
import logger from "@/lib/logger";

function parseRepairId(id) {
    const repairId = Number(id);
    return Number.isSafeInteger(repairId) && repairId > 0 ? repairId : null;
}

export async function GET(request, context) {
    try {
        const { id } = await context.params;
        const repairId = parseRepairId(id);
        if (!repairId) {
            return NextResponse.json({ success: false, message: "Invalid repair ID" }, { status: 400 });
        }
        const repair = await getRepairById(repairId);
        if (!repair) {
            return NextResponse.json({ success: false, message: "Repair not found" }, { status: 404 });
        }
        return NextResponse.json({
            success: true,
            data: repair
        }, { status: 200 });
    } catch (error) {
        logger.error({ error }, "Failed to fetch repair");
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const repairId = parseRepairId(id);
        if (!repairId) {
            return NextResponse.json({ success: false, message: "Invalid repair ID" }, { status: 400 });
        }
        const body = await request.json();
        const validation = updateRepairSchema.safeParse(body);
        if(!validation.success){
            return  NextResponse.json({
                success:false,
                message:"Validation failed",
                errors:validation.error.flatten().fieldErrors,
            },{status:400});
        }
        const newData = await editRepair(repairId, validation.data);
        return NextResponse.json({
            success: true,
            data: newData
        }, { status: 200 });
    } catch (error) {
        logger.error({ error }, "Failed to update repair");
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

export async function DELETE(request, context) {
    try {
        const { id } = await context.params;
        const repairId = parseRepairId(id);
        if (!repairId) {
            return NextResponse.json({ success: false, message: "Invalid repair ID" }, { status: 400 });
        }
        const deletedRepair = await removeRepair(repairId);
        return NextResponse.json({
            success: true,
            data: deletedRepair
        }, { status: 200 });
    } catch (error) {
        logger.error({ error }, "Failed to delete repair");
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

