"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import AddSpecName from "./add-feature-name";
import { Button } from "@/components/ui/button";
import SelectPhotos from "./select-photos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { create } from "../actions";
import { getAllMadels } from "../../models/actions";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@radix-ui/react-select";
import { Make, Model } from "@prisma/client";
import { Loader } from "lucide-react";

export const listingFormSchema = z.object({
    photos: z.unknown().transform(value => { return value as FileList }),
    title: z.string().min(1),
    makeId: z.string(),
    modelId: z.string(),
    description: z.string(),
    location: z.string(),
    price: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
    features: z.map(z.string(), z.any()),
    year: z.number(),
    sellerId: z.string().default("").optional()
});

listingFormSchema.optional()

interface AddEditListingFormProps {
    makes: Make[]
}

function AddEditListingForm({ makes }: AddEditListingFormProps) {
    const form = useForm<z.infer<typeof listingFormSchema>>({
        resolver: zodResolver(listingFormSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            makeId: "",
            modelId: "",
            photos: [] as unknown as FileList,
            price: 0,
            features: {},
            year: Number((new Date()).getFullYear() - 2),
            sellerId: ""
        }
    });

    const [features, setFeatures] = useState<any>({});
    const [feature, setFeature] = useState<any>();
    const [models, setModels] = useState<Model[]>([]);
    const [saving, setSaving] = useState<boolean>(false);

    function addFeature(specName: string, value: string = "") {
        setFeatures((f: any) => {
            const updateFeatures = { ...f }
            return { ...updateFeatures, [specName]: value }
        });
    }

    function onChangeFeature(evt: React.SyntheticEvent<HTMLInputElement>) {
        setFeature({ ...feature, value: evt.currentTarget.value });
    }

    async function onSubmit(values: z.infer<typeof listingFormSchema>) {
        // const isValid = listingFormSchema.parse(values);
        const formData = new FormData();
        Object.entries(values).map(([k, v]: any[]) => {
            if (k == "photos") {
                for (let i = 0; i < v.length; i++) {
                    const file: File = v.item(i);
                    formData.append('photos', file, file.name)
                }
            }
            else if (k == "features") {
                formData.append("features", JSON.stringify(Object.fromEntries(v)))
            }
            else formData.set(k, v)
        });

        setSaving(true);
        create(formData).then(resp => {
            console.log(resp);
            redirect("/admin/listing");
        })
            .finally(() => setSaving(false))
            .catch(error => {
                console.log(error);
            });
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
                    <Separator className="my-2" />
                </div>
            ))}
        </>)
    }

    const PhotoSelector = ({ files }: { files: FileList }) => {
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
            {JSON.stringify(form.formState.errors)}
            <Card>
                <CardHeader>
                    <CardTitle>Add Listing</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="">

                            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-3">

                                <div className="col">

                                    <FormField
                                        control={form.control}
                                        name="photos"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Images</FormLabel>
                                                <FormControl>
                                                    <FormProvider {...form}>
                                                        <PhotoSelector files={field.value} />
                                                    </FormProvider>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-2 grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="title"
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
                                                        <Select onValueChange={(makeId: string) => {
                                                            field.onChange(makeId);
                                                            const make: Make = makes.find(m => m.id == makeId) as Make;
                                                            if (make) setModels(make.Model);
                                                        }} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Make" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {makes.map((make: Make) => <SelectItem key={make.id} value={make.id}>{make.name}</SelectItem>)}
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
                                                                {models.map((model: Model) => <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>)}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>


                                    <div className="flex gap-3 items-center">
                                        <div className="flex-auto">
                                            <FormField
                                                control={form.control}
                                                name="year"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Year</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex-auto">
                                            <FormField
                                                control={form.control}
                                                name="location"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Location</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

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
                                                    <ScrollArea className="h-20 border p-3">
                                                        <div className="grid gap-3">
                                                            <ListingFeatures />
                                                        </div>
                                                    </ScrollArea>
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


                                    <Button type="submit" disabled={saving}>{
                                        saving ? 
                                            <><Loader className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                                            : <span>Save Listing</span>
                                    }</Button>
                                </div>

                            </div>



                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddEditListingForm;


