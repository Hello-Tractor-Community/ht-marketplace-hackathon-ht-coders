"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { productFormSchema } from "./page";

interface AddSpecNameProp {
    onAdd:(specName:string)=>void,
    form: any
}

function AddSpecName({onAdd, form}:AddSpecNameProp) {
    
    const [specName, setSpecName] = useState("");
    const {setValue} = useFormContext();

    function addSpec(specName: string, value: string = "") {
        const specs = form.getValues("specs") as Map<string, any>;
        const newSpecs = new Map()
        Object.entries(specs).forEach((v, k) => newSpecs.set(k, v))
        newSpecs.set(specName, value);
        setValue("specs", newSpecs);
        console.log(newSpecs)
    }

    return (<Dialog>
        <DialogTrigger asChild>
            <Button>Add Specification name</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Specification Name</DialogTitle>
            </DialogHeader>
            <Input name="specname" type="text" value={specName} onChange={(evt) => setSpecName(evt.target.value)} required />

            <DialogFooter>
                <DialogClose asChild>
                    <Button onClick={ ()=>addSpec(specName) }>Add</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>);
}

export default AddSpecName;