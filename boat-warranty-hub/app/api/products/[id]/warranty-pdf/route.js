import { NextResponse } from "next/server";
import { uploadProductWarrantyPdf } from "@/services/upload.service";
import { getWarrantyPdf } from "../../../../../services/upload.service";

export async function POST(request,context){
    try{
        const {id} = await context.params;
        
        const productId = Number(id);

        const formData = await request.formData();

        const file = formData.get("file");

        if(!file){
            return NextResponse.json({
                success:false,
                message:"PDF file is required"
            },{status:400});
        }

        if (file.type !== "application/pdf") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Only PDF files are allowed.",
                },
                { status: 400 }
            );
        }

        const MAX_SIZE = 5*1024*1024;
        if(file.size>MAX_SIZE){
            return NextResponse.json({
                success:false,
                message:"PDF size must not exceed 5 MB",
            },{status:400});
        }

        const product = await uploadProductWarrantyPdf(productId,file);

        return NextResponse.json({
            success:true,
            message:"Warranty certificate uploaded successfully.",
            data:product
        },{status:200})
    }catch(error){
        console.error(error);
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500});
    }
}


export async function GET(request,context){

    try{
        
        const {id} = await context.params;
        
        const productId = Number(id);

        const signedUrl = await getWarrantyPdf(productId);

        console.log(signedUrl);

        return Response.redirect(signedUrl);

    }catch(error){

        return NextResponse.json({
            success:false,
            message:error.message
        },{status:404});

    }

}