import {NextResponse} from "next/server";
import { loginUser } from "../../../../services/auth.service";
import { loginSchema } from "../../../../lib/validations";

export async function POST(request){
    try {
        const body = await request.json();

        const validation = loginSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
                    errors: validation.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        console.log(validation.data.email)

        const user = await loginUser(validation.data);

        return NextResponse.json(
            {success:true,data:user},{status:200}
        )
    } catch (error) {
        console.error(error);

        return NextResponse.json({success:false,message:error.message},{status:401})
    }
}