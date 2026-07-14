import { NextResponse } from "next/server";
import { addRepair } from "../../../services/repair.service";


export async function POST(request){
    try {
        const body = await request.json();

        const repair = await addRepair(body);

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

