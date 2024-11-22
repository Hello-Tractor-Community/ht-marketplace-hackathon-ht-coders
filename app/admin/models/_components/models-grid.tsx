"use client"

import DataTable from "@/components/ui/DataTable/data-table";
import { Make, Model } from "@prisma/client";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";

interface ModelGridProps{
    data:Model[]
}

const modelColumns: ColumnDef<Model>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value)=>table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            />
        ),
        cell:({row})=>(
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value)=>row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        )
    },
    {
        id:"name",
        accessorKey: "name",
        header: "Name"
    },
    {
        id:"make",
        accessorKey: "make",
        header: "Make",
        cell:({row})=>{
            return row.original.make.name
        }
    }
];

function ModelsGrid({data}:ModelGridProps) {
    return (<>
        <DataTable columns={modelColumns} data={data} />
    </>);
}

export default ModelsGrid;