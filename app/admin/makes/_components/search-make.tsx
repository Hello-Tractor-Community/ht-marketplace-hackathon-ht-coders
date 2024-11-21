"use client"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
    search:z.string()
})

function SearchMake() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            search:""
        }
    })

    return (<>

        <Form {...form}>
        <form onSubmit={form.handleSubmit(()=>{})} className="space-y-8">
            <FormField control={form.control}
                name="search"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} placeholder="Search" />
                        </FormControl>
                    </FormItem>
                )}
            ></FormField>
        </form>
        </Form>
    </>);
}

export default SearchMake;