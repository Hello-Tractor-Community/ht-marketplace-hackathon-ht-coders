"use server"

import { prisma } from "@/lib/prisma"
import { Model } from "@prisma/client";

export async function create(data:any){
    const model = await prisma.model.create({data});
    return model;
}

export async function getAllMadels(page:number = 1, page_size:number = 10){
    const makes:Model[] = await prisma.model.findMany({
        take: page_size,
        skip: page * page_size
    });
    return makes;
}