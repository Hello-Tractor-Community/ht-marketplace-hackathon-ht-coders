import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string({
        required_error: "Make name is required"
    })
})

interface AddLocationProps {
    onAdd: () => void
}

function AddLocation({ onAdd }: AddLocationProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const localStorageData = JSON.parse(localStorage.getItem("data") || '{"makes":[]}');
        console.log(values);
        localStorageData.makes.push({
            id: localStorageData.makes.length + 1,
            ...values
        });
        localStorage.setItem("data", JSON.stringify(localStorageData));
        onAdd();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Location</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px">
                <DialogHeader>
                    <DialogTitle>Add Location</DialogTitle>
                    <DialogDescription>
                        Add location
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
                        <Button type="submit">Save Location</Button>
                    </form>
                </Form>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddLocation;