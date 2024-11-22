"use server"

import { prisma } from "@/lib/prisma"
import { Make } from "@prisma/client";

export async function create(data:any){
    const make = await prisma.make.create({data});
    return make;
}

export async function getAllMakes(page:number = 1, page_size:number = 10){
    const makes:Make[] = await prisma.make.findMany({
        take: page_size,
        skip: page * page_size
    });
    return makes;
}