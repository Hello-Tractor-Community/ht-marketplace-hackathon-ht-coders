import { prisma } from "@/lib/prisma";
import { Listing } from "@prisma/client";

export async function create(data:any){
    // const listing:Listing = await prisma.listing.create({data});
    console.log(data);
    return {};
}