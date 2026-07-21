import { NextResponse } from "next/server";
import { getWarrantyDetails } from "../../../../services/warranty.service";

export async function GET(request,{params}){

    const {serial} = await params

    const result = await getWarrantyDetails(serial);

    if(!result){
        return NextResponse.json({
            message:"Product not found"
        },{status:404})
    }

    return NextResponse.json(result);
}