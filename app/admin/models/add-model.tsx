import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Make } from "../makes/page";

const formSchema = z.object({
    name: z.string({
        required_error: "Make name is required"
    }),
    makeId: z.string({
        required_error: "Select a make"
    })
})

interface AddModelProps {
    onAdd: () => void,
    makes: Make[]
}

function AddModel({ onAdd, makes }: AddModelProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            makeId: ""
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const localStorageData = JSON.parse(localStorage.getItem("data") || '{"makes":[], models:[]}');
        if(!("models" in localStorageData)) localStorageData.models = [];
        const make = localStorageData.makes.find((m:Make)=>m.id == Number(values.makeId))
        localStorageData.models.push({
            id: localStorageData.models.length + 1,
            make:make.name,
            ...values
        });
        localStorage.setItem("data", JSON.stringify(localStorageData));
        onAdd();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Model</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px">
                <DialogHeader>
                    <DialogTitle>Add Model</DialogTitle>
                    <DialogDescription>
                        Add tractor model
                    </DialogDescription>
                </DialogHeader>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                            <FormField control={form.control}
                                name="makeId"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Make</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Tractor Make" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {makes.map((make:Make)=><SelectItem key={make.id} value={make.id.toString()}>{make.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />
                        <Button type="submit">Save Make</Button>
                    </form>
                </Form>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddModel;