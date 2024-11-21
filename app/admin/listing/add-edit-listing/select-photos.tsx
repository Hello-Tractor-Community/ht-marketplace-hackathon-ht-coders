"use client"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

interface SelectPhotosProps {
    onSelect: (files: FileList) => void,
    fileList?: FileList | undefined
}

interface ErrorType {
    img_upload?: string;
    doc_upload?: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
const imagesSchema = z.unknown().transform(value => {
    return value as FileList
})
=======
const imagesSchema = z.instanceof(FileList)
>>>>>>> 39c4d1d (Adding Listing)
=======
const imagesSchema = z.unknown().transform(value => {
    return value as FileList
})
>>>>>>> 3cc655b (Add the not found page to redirect the users to home thus improving userability)
    .refine((list) => list.length > 0, "No files selected")
    .transform(list => Array.from(list))
    .refine(files => {
        const allowedTypes: { [key: string]: boolean } = {
            "image/jpeg": true,
            "image/png": true,
        }
        return files.every((file) => allowedTypes[file.type]);
    }, { message: "Invalid file type. Allowed types: JPG, PNG" })

function SelectPhotos({ onSelect, fileList }: SelectPhotosProps) {

    const [error, setError] = useState<ErrorType>({});
    const { setValue } = useFormContext();
    const [images, setImages] = useState<string[]>([]);
    const [image, setImage] = useState<string>()

    useEffect(() => {
        if (fileList) {
            filesToUrls(fileList);
        }
    }, [fileList]);

    function validateImages(files: FileList, schema: any, field: keyof ErrorType) {
        const result = schema.safeParse(files);
        if (!result.success) {
            setError((prevError) => ({
                ...prevError,
                [field]: result.error.errors[0].message
            }))
            return false;
        }
        else {
            setError((prevError) => ({
                ...prevError,
                [field]: undefined
            }));
            return true
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files!;
        if (files?.length > 0) {
            const isValid = validateImages(files, imagesSchema, "img_upload");
            console.log(isValid);
            if (isValid) {
                setValue("photos", files);
                // filesToUrls(files);
            }
        }
    }

    function filesToUrls(files: FileList) {
        Promise.all(Array.from(files).map((file) => {
            return new Promise<string>((rs, rj) => {
                const fr = new FileReader();
                fr.onload = evt => rs(evt.target?.result as string);
                fr.readAsDataURL(file);
            });
        })).then(imgs => {
            setImages(imgs);
            if (imgs.length > 0) setImage(imgs[0]);
        });
    }

    return (<>
        <Input type="file" onChange={handleFileChange} multiple accept="image/*" />
        {error.img_upload && <span style={{ color: "red" }}>{error.img_upload}</span>}
        {images.length > 0 && <div className="grid gap-3">
            <div className="flex gap-3">
                {
                    images.map((src: string, i: number) => <img key={`img-${i + 1}`} 
                    {...{ src }} 
                    width={64} 
                    className={image === src ? `border border-black` : ''}
                    onClick={()=>setImage(src)} />)
                }
            </div>
            <div className="">
                <img src={image} width={"100%"} style={{height:"400px", objectFit:"contain"}} />
            </div>
        </div>}
    </>);
}

export default SelectPhotos;