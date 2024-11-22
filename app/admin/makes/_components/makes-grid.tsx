"use client"

import DataTable from "@/components/ui/DataTable/data-table";
import { Make } from "@prisma/client";
import { Checkbox } from "@radix-ui/react-checkbox";
import { 
    ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
 } from "@tanstack/react-table";

interface MakesGridProps{
    data:Make[]
}

const makeColumns: ColumnDef<Make>[] = [
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
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
          ),
    },
]

function MakesGrid({data}:MakesGridProps) {
    return ( 
        <DataTable columns={makeColumns} data={data} />
     );
}

export default MakesGrid;