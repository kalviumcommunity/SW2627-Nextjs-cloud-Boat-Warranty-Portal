import { NextResponse } from "next/server";
import { uploadProductWarrantyPdf, getWarrantyPdf } from "@/services/upload.service";
import logger from "@/lib/logger";

export async function POST(request,context){
    try{
        const {id} = await context.params;
        
        const productId = Number(id);

        const formData = await request.formData();

        const forceReplace = formData.get("forceReplace") === "true";

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

        const product = await uploadProductWarrantyPdf(productId,file,forceReplace);

        return NextResponse.json({
            success:true,
            message:"Warranty certificate uploaded successfully.",
            data:product
        },{status:200})
    }catch(error){
        logger.error({ error }, "Failed to upload warranty PDF");
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

        return Response.redirect(signedUrl);

    }catch(error){
        logger.error({ error }, "Failed to fetch warranty PDF");
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:404});

    }

}