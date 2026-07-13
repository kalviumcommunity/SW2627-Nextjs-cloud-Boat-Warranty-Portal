import {NextResponse} from "next/server";
import { loginUser } from "../../../../services/auth.service";

export async function POST(request){
    try {
        const body = await request.json();

        const user = await loginUser(
            body.email,
            body.password
        );

        return NextResponse.json(
            {success:true,data:user},{status:200}
        )
    } catch (error) {
        console.error(error);

        return NextResponse.json({success:false,message:error.message},{status:401})
    }
}