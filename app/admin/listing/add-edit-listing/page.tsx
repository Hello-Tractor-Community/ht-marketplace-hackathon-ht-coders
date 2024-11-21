"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import AddSpecName from "./add-feature-name";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import SelectPhotos from "./select-photos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Listing, Model } from "@prisma/client";
import { create } from "../actions";
import { getAllMadels } from "../../models/actions";
import { redirect } from "next/navigation";

export const listingFormSchema = z.object({
    photos: z.unknown().transform(value=>{ return value as FileList }),
    title: z.string().min(1),
=======
import { Files } from "lucide-react";
import SelectPhotos from "./select-photos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const listingFormSchema = z.object({
    photos: z.instanceof(FileList),
<<<<<<< HEAD
    name: z.string().min(1),
>>>>>>> 39c4d1d (Adding Listing)
=======
    title: z.string().min(1),
>>>>>>> 9d95e1d (Added location manager)
    makeId: z.string(),
    modelId: z.string(),
    description: z.string(),
    location: z.string(),
    price: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
    features: z.map(z.string(), z.any())
});

function AddEditListing() {
    const form = useForm<z.infer<typeof listingFormSchema>>({
        resolver: zodResolver(listingFormSchema),
        defaultValues: {
<<<<<<< HEAD
<<<<<<< HEAD
            title: "",
=======
            name: "",
>>>>>>> 39c4d1d (Adding Listing)
=======
            title: "",
>>>>>>> 9d95e1d (Added location manager)
            description: "",
            location: "",
            makeId: "",
            modelId: "",
            photos: [] as unknown as FileList,
            price: 0,
            features: {}
        }
    });

    const [features, setFeatures] = useState<any>({});
    const [feature, setFeature] = useState<any>();
<<<<<<< HEAD
    const [models, setModels] = useState<Model[]>([]);
    
    useEffect(()=>{
        getModels();
    }, []);

    async function getModels(){
        const m:Model[] = await getAllMadels();
        console.log(m);
    }
=======
>>>>>>> 39c4d1d (Adding Listing)

    function addFeature(specName: string, value: string = "") {
        setFeatures((f: any) => {
            const updateFeatures = { ...f }
            return { ...updateFeatures, [specName]: value }
        });
    }

    function onChangeFeature(evt: React.SyntheticEvent<HTMLInputElement>) {
        setFeature({ ...feature, value: evt.currentTarget.value });
    }

<<<<<<< HEAD
    async function onSubmit(values: z.infer<typeof listingFormSchema>) {
        const formData = new FormData();
        Object.entries(values).map(([k, v]:any[])=>{
            if(k == "photos"){
                for(let i =0; i<v.length; i++){
                    const file:File = v.item(i);
                    formData.append('photos', file, file.name)
                }
            }
            else if(k == "features"){
                formData.append("features", JSON.stringify(Object.fromEntries(v)))
            }
            else formData.set(k, v)
        })
        const listing = await create(formData);
        redirect("/admin/listing");
=======
    function onSubmit(values: z.infer<typeof listingFormSchema>) {
        console.log(values)
>>>>>>> 39c4d1d (Adding Listing)
    }

    const ListingFeatures = () => {
        const { setValue } = useFormContext();
        function updateFeature(evt: React.SyntheticEvent<HTMLInputElement>) {
            const updatedFeatures = {
                ...features,
                [evt.currentTarget.name]: evt.currentTarget.value
            }
            setFeatures(updatedFeatures);
            setFeature(undefined);

            const fs = new Map();
            Object.keys(updatedFeatures).map((k) => fs.set(k, updatedFeatures[k]));
            setValue("features", fs)
        }

        return (<>
            {Object.keys(features).map((k) => (
                <div className="flex items-center gap-3" key={`${k}-div`}>
                    <span className="w-auto text-nowrap">{k}</span>:
                    {feature && feature.key === k ?
                        <Input type="text" key={feature.key} name={feature.key}
                            value={feature.value} onChange={onChangeFeature} autoFocus
                            placeholder="Type the value" onBlur={updateFeature} /> :
                        <Input type="text" name={k} defaultValue={features[k]} onFocus={(evt) => setFeature({ key: k, value: features[k] })} placeholder="Type the value" />
                    }
                </div>
            ))}
        </>)
    }

    const PhotoSelector = ({files}:{files:FileList}) => {
        const { setValue } = useFormContext();
        function handlePhotos(files: FileList) {
            console.log(files)
            setValue("photos", files);
        }
        return (<>
            <SelectPhotos fileList={files} onSelect={handlePhotos} />
        </>)
    }

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Add Listing</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="">

                            <div className="grid grid-cols-3 gap-3">

                                <div className="col-span-2">

                                    <FormField
                                        control={form.control}
                                        name="photos"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Images</FormLabel>
                                                <FormControl>
                                                    <FormProvider {...form}>
                                                        <PhotoSelector files={field.value}  />
                                                    </FormProvider>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col grid gap-3">
                                    <FormField
                                        control={form.control}
<<<<<<< HEAD
<<<<<<< HEAD
                                        name="title"
=======
                                        name="name"
>>>>>>> 39c4d1d (Adding Listing)
=======
                                        name="title"
>>>>>>> 9d95e1d (Added location manager)
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )} />

                                    <div className="flex gap-3">
                                        <div className="flex-auto">
                                            <FormField
                                                control={form.control}
                                                name="makeId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Make</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Make" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="make1">Make 1</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="flex-auto">
                                            <FormField
                                                control={form.control}
                                                name="modelId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Model</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Model" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="model1">Model 1</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>


                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Location</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Model" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="location">Location 1</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Type the history of the listing" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="features"
                                        render={({ field }) => (
                                            <FormProvider {...form}>
                                                <FormItem>
                                                    <div className="flex items-center justify-between">
                                                        <FormLabel>Add the feature name</FormLabel>
                                                        <AddSpecName onAdd={addFeature} />
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <ListingFeatures />
                                                    </div>
                                                </FormItem>
                                            </FormProvider>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )} />

                                    <Button type="submit">Save Listing</Button>
                                </div>

                            </div>



                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddEditListing;


