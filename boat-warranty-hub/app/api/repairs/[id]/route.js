import { NextResponse } from "next/server";
import { editRepair, getRepairById, removeRepair } from "../../../../services/repair.service";
import { updateRepairSchema } from "../../../../lib/validations";

export async function GET(request, context) {
    try {
        const { id } = await context.params;
        const repairId = Number(id);
        const repair = await getRepairById(repairId);
        return NextResponse.json({
            success: true,
            data: repair
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const repairId = Number(id);
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
        console.error(error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

export async function DELETE(request, context) {
    try {
        const { id } = await context.params;
        const repairId = Number(id);
        const deletedRepair = await removeRepair(repairId);
        return NextResponse.json({
            success: true,
            data: deletedRepair
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

