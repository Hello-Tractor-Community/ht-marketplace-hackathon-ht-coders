"use server"
import { prisma } from "@/lib/prisma";
import { Listing } from "@prisma/client";
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CNAME
});

export async function create(data: FormData) {

    try {
        const photos = data.getAll("photos");
        const uploadPromises:Promise<UploadApiResponse|UploadApiErrorResponse>[] = [];
        for (let i = 0; i < photos.length; i++) {
            const file = photos[i] as File;
            uploadPromises.push(file.arrayBuffer().then((arrb: ArrayBuffer) => new Promise<UploadApiResponse>(resolve => {
                cloudinary.uploader.upload_stream((error:UploadApiErrorResponse, uploadResults:UploadApiResponse) => {
                    resolve(uploadResults);
                }).end(Buffer.from(arrb))
            })));
        }

        const uploadedFiles:{status:string, value:UploadApiResponse}[] = await Promise.allSettled(uploadPromises) as {status:string, value:UploadApiResponse}[];
        
        const listingData: any = {};
        data.forEach((v, k: string) => {
            listingData[k] = k === "photos" ?
                uploadedFiles.map(({value})=>value.secure_url)
                : v;
        });

        console.log(listingData);

        // return await prisma.listing.create({
        //     data: listingData
        // });
    }
    catch (e: any) {
        console.log(e);
        return {
            error: e.message
        }
    }
}