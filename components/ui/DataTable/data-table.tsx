"use client";
import { Cell, ColumnDef, flexRender, getCoreRowModel, Header, HeaderGroup, Row, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
}

function DataTable<TData, TValue>({
    columns, data
}: DataTableProps<TData, TValue>) {

    const table = useReactTable({
        data, columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (<div className="rounded-md border">
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header: Header<TData, unknown>) => {
                            return (<TableHead key={header.id}>
                                {header.isPlaceholder ? null : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </TableHead>)
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row: Row<TData>) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (<TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                        No Result
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </div>);
}

export default DataTable;