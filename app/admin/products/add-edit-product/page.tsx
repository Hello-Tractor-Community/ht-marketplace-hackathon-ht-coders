"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import AddSpecName from "./add-spec-name";

export const productFormSchema = z.object({
    photo: z.string().array(),
    name: z.string().min(1),
    makeId: z.string({
        required_error: "Make is required"
    }),
    modelId: z.string({
        required_error: "Model is required"
    }),
    history: z.string(),
    location: z.string(),
    price: z.number().min(1000),
    specs: z.map(z.string(), z.any())
})

function AddEditProduct() {
    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            history: "",
            location: "",
            makeId: "",
            modelId: "",
            photo: [],
            price: 0,
            specs: new Map()
        }
    });

    // const { setValue } = useFormContext();

    // function addSpec(specName: string, value: string = "") {
    //     const specs = form.getValues("specs") as Map<string, any>;
    //     const newSpecs = new Map()
    //     Object.entries(specs).forEach((v, k) => newSpecs.set(k, v))
    //     newSpecs.set(specName, value);
    //     setValue("specs", newSpecs);
    //     console.log(newSpecs)
    // }

    return (
        <div className="container mx-auto py-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(() => { })} className="grid gap-3">
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <Input type="file" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
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
                                        <Select onOpenChange={field.onChange} defaultValue={field.value}>
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
                                        <Select onOpenChange={field.onChange} defaultValue={field.value}>
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
                        name="history"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>History</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Type the history of the product" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="specs"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel>Add the specifications</FormLabel>
                                    <AddSpecName form={form} onAdd={()=>{}} />
                                </div>
                                <FormControl>
                                    <div className="grid gap-3">

                                        {Object.keys(field.value).map(key => <div className="flex gap-3 items-center">
                                            <Input type="text" value={key} />:
                                            <Input type="text" value={field.value.get(key)} />
                                        </div>)}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                </form>
            </Form>
        </div>
    );
}

export default AddEditProduct;