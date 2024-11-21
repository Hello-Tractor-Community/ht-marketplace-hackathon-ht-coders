"use server"
import { prisma } from "@/lib/prisma";
import { Listing, Prisma } from "@prisma/client";
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { z } from "zod";

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CNAME
});

// const listingFormSchema = z.object({
//     photos: z.string().array(),
//     title: z.string().min(1),
//     makeId: z.string(),
//     modelId: z.string(),
//     description: z.string(),
//     location: z.string(),
//     price: z.number(),
//     features: z.map(z.string(), z.any()),
//     year: z.number(),
//     sellerId: z.string().default("cm3r4b3iv0001h7w49ycda15e").optional()
// });

export async function create(data: FormData) {

    try {
        const photos = data.getAll("photos");
        const uploadPromises: Promise<UploadApiResponse | UploadApiErrorResponse>[] = [];
        for (let i = 0; i < photos.length; i++) {
            const file = photos[i] as File;
            uploadPromises.push(file.arrayBuffer().then((arrb: ArrayBuffer) => new Promise<UploadApiResponse>(resolve => {
                cloudinary.uploader.upload_stream((error: UploadApiErrorResponse, uploadResults: UploadApiResponse) => {
                    resolve(uploadResults);
                }).end(Buffer.from(arrb))
            })));
        }

        const uploadedFiles: { status: string, value: UploadApiResponse }[] = await Promise.allSettled(uploadPromises) as { status: string, value: UploadApiResponse }[];

        const listingData: any = {};
        data.forEach((v, k: string) => {
            if (k == "features") {
                listingData[k] = v as Prisma.JsonValue;
            }
            else if(["year", "price"].includes(k)){
                listingData[k] = Number(v)
            }
            else listingData[k] = k === "photos" ?
                uploadedFiles.map(({ value }) => value.secure_url)
                : v;
        });
        listingData.sellerId="cm3r4b3iv0001h7w49ycda15e";
        console.log(listingData);

        // const validation = listingFormSchema.parse(listingData);
        // console.log(validation);

        prisma.listing.create({
            data: listingData
        }).catch(e=>{
            console.log(e)
        });
        return {}
    }
    catch (e: any) {
        console.log(e);
        return {
            error: e.message
        }
    }
}