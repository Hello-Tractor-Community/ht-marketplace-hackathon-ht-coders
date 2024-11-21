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

const imagesSchema = z.unknown().transform(value => {
    return value as FileList
})
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
        })).then(setImages);
    }

    return (<>
        <Input type="file" onChange={handleFileChange} multiple accept="image/*" />
        {error.img_upload && <span style={{ color: "red" }}>{error.img_upload}</span>}
        {images.length > 0 && <div className="grid grid-col-3">
            <div className="col">
                {images.map((src: string, i: number) => <img key={`img-${i + 1}`} {...{ src }} width={50} />)}
            </div>
            <div className="col-span-2">
                <img src={images[0]} width={"100%"} />
            </div>
        </div>}
    </>);
}

export default SelectPhotos;