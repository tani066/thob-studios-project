import { prisma } from "@/lib/db";

export async function GET(req, props) {
    const params = await props.params;
    const productId = parseInt(params.id);
    const product = await prisma.product.findUnique({
        where : {id : productId}
    })
    if(!product){
        return Response.json({error : "Product not found"},{status : 404})
    }
    return Response.json(product)
}