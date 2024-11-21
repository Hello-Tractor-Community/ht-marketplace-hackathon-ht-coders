"use client"

import DataTable from "@/components/ui/DataTable/data-table";
import { Listing } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

interface ListingGridPros{
    data:Listing[]
}

const listingColumns:ColumnDef<Listing>[] = [
    {
        accessorKey: "photos",
        header: "Photo"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "make",
        header: "Make"
    },
    {
        accessorKey: "model",
        header: "Model"
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