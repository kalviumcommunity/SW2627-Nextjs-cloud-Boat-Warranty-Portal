import { NextResponse } from "next/server";
import { addProduct, getAllProducts } from "../../../services/products.service";
import { productSchema } from "../../../lib/validations";
import logger from "@/lib/logger";

export async function GET(){

    try {

        const products = await getAllProducts();

        return NextResponse.json(products);

    } catch(error){

        logger.error({ error }, "Failed to fetch products");

        return NextResponse.json(
            {
                success:false,
                error:"Failed to fetch products"
            },
            {
                status:500
            }
        );
    }
}


export async function POST(request){
    try {
        const body = await request.json();

        const validation = productSchema.safeParse(body);

        if(!validation.success){
            return NextResponse.json(
                {success:false,message:"Validation failed",errors:validation.error.flatten().fieldErrors},
                {status:400}
            )
        }

        const product = await addProduct(validation.data);

        if(product.error){
            return NextResponse.json(
                product,
                {
                    status:400
                }
            )
        }

        return NextResponse.json(
            {success:true,data:product},
            {
                status:201
            }
        );
    } catch (error) {
        logger.error({ error }, "Failed to create product");

        return NextResponse.json(
            {success:false,message:"Failed to create product"},
            {status: 500}
        )
    }
}