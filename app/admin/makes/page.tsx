// "use client";
// import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/DataTable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import SearchMake from "./search-make";
import AddMake from "./add-make";
// import { useEffect, useState } from "react";

export type Make = {
    id: number,
    name: string,
}

const makeColumns: ColumnDef<Make>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
]

function Makes() {

    const makesData:Make[] = [];

    // useEffect(() => {
    //     getMakeData();
    // }, []);

    // function getMakeData(){
    //     const localStorageData: { makes: Make[] } = JSON.parse(localStorage.getItem("data") || '{"makes":[]}');
    //     setMakeData(localStorageData.makes)
    // }

    return (
        <div className="container mx-auto py-10 grid gap-3">
            <div className="flex justify-between">
                <AddMake />
                <SearchMake />
            </div>
            <DataTable columns={makeColumns} data={makesData} />
        </div>
    );
}

export default Makes;