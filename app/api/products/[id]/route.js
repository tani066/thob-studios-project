import { prisma } from "@prisma/client";

export async function GET(req,{params}){
    const productId = parseInt(params.id);
    const product = await prisma.product.findUnique({
        where : {id : productId}
    })
    if(!product){
        return Response.json({error : "Product not found"},{status : 404})
    }
    return Response.json(product)
}