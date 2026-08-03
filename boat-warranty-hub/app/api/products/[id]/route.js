import { NextResponse } from "next/server";
import { deleteExistingProduct, getProductById, updateExistingProduct } from "../../../../services/products.service";
import logger from "@/lib/logger";


export async function GET(request,context){
    try {
        const {id} = await context.params;
        const productId = Number(id);
        const product = await getProductById(productId);
        return NextResponse.json({
            success: true,
            data: product
        },{status:200})
    } catch (error) {
        logger.error({ error }, "Failed to fetch product");
        return NextResponse.json({
            success:false,
            message:"Failed to fetch product"
        },{status:500})
    }
}

export async function PUT(request,context){
    try {
        const {id} = await context.params;
        const productId = Number(id);
        const body = await request.json();
        const product = await updateExistingProduct(productId,body);

        return NextResponse.json({
            success:true,
            data:product
        },{status:200});
    } catch (error) {
        logger.error({ error }, "Failed to update product");
        return NextResponse.json({
            success:false,
            message:"Failed to update product"
        },{status:500});
    }
}

export async function DELETE(request,context){
    try {
        const {id} = await context.params;
        const productId = Number(id);
        await deleteExistingProduct(productId);
        return NextResponse.json({
            success:true,
            message:"Product deleted successfully"
        },{status:200});
    } catch (error) {
        logger.error({ error }, "Failed to delete product");
        return NextResponse.json({
            success:false,
            message:"Failed to delete product"
        },{status:500})
    }
}