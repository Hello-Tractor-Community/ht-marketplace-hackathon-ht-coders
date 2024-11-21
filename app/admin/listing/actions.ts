"use server"
import { prisma } from "@/lib/prisma";
import { Listing, Prisma } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";
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

export async function create(formData: FormData) {

    try {
        const photos = formData.getAll("photos");
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

        const data = {
            description: formData.get("description") as string,
            features: JSON.parse(formData.get("features") as string),
            location: formData.get("location") as string,
            price: Number(formData.get("price")),
            title: formData.get("title") as string,
            year: Number(formData.get("year")),
            makeId: formData.get("makeId") as string,
            modelId: formData.get("modelId") as string,
            photos: uploadedFiles.map(({ value }) => value.secure_url)
        }

        console.log(data);
        return await prisma.listing.create({data});
    }
    catch (e: any) {
        console.log(e);
        return {
            error: e.message
        }
    }
}