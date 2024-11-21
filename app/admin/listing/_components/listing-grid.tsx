"use client"

import DataTable from "@/components/ui/DataTable/data-table";
import { Listing } from "@prisma/client";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";

interface ListingGridPros{
    data:Listing[]
}

const listingColumns:ColumnDef<Listing>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "photos",
        header: "Photo",
        cell:({row})=>{
            const images = row.getValue("photos") as string[];
            return (<img src={images[0]} 
                style={{
                    width:"128px", 
                    height:"100px", 
                    objectFit:"cover", 
                    objectPosition:"center"
                }} />);
        }
    },
    {
        accessorKey: "title",
        header: "Name"
    },
    {
        accessorKey: "make",
        header: "Make",
        cell: ({row})=>row.getValue("make").name
    },
    {
        accessorKey: "model",
        header: "Model",
        cell: ({row})=>row.getValue("model").name
    },
    {
        accessorKey: "location",
        header: "Location"
    }
];

function ListingGrid({data}:ListingGridPros) {
    return (<>
        <DataTable columns={listingColumns} data={data} />
    </>);
}

export default ListingGrid;