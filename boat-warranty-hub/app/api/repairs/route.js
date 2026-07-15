import { NextResponse } from "next/server";
import { addRepair } from "../../../services/repair.service";
import { createRepairSchema } from "../../../lib/validations";


export async function POST(request){
    try {
        const body = await request.json();

        const validation = createRepairSchema.safeParse(body)

        if(!validation.success){
            return  NextResponse.json({
                success:false,
                message:"Validation failed",
                errors:validation.error.flatten().fieldErrors,
            },{status:400});
        }

        const repair = await addRepair(validation.data);

        return NextResponse.json({
            success:true,
            data:repair
        },{status:201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500})
    }
}

