"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { listingFormSchema } from "./page";

interface AddFeatureNameProp {
    onAdd:(specName:string)=>void
}

function AddFeatureName({onAdd}:AddFeatureNameProp) {    
    const [specName, setSpecName] = useState("");
    return (<Dialog>
        <DialogTrigger asChild>
            <Button variant={"outline"}>Add Feature</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Specification Name</DialogTitle>
            </DialogHeader>
            <Input name="specname" type="text" value={specName} onChange={(evt) => setSpecName(evt.target.value)} required />

            <DialogFooter>
                <DialogClose asChild>
                    <Button onClick={ ()=>onAdd(specName) }>Add</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>);
}

export default AddFeatureName;