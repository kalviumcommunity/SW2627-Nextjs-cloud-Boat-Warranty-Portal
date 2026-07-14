import { NextResponse } from "next/server";
import { registration } from "../../../../services/auth.service";
import { registerSchema } from "../../../../lib/validations";

export async function POST(request){
    try {
        const body = await request.json();

        const validation = registerSchema.safeParse(body);

        if(!validation.success){
            return  NextResponse.json({
                success:false,
                message:"Validation failed",
                errors:validation.error.flatten().fieldErrors,
            },{status:400});
        }

        const user = await registration(validation.data);

        return NextResponse.json({
            success:true,
            data:user
        },{status:201});
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500})
    }
}