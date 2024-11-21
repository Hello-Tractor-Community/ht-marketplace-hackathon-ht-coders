"use client";
import DataTable from "@/components/ui/DataTable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import AddModel from "./add-model";
import SearchModel from "./search-model";
import { useEffect, useState } from "react";
import { Make } from "../makes/page";

export type Model = {
    id: number,
    name: string,
    make: string,
    makeId: number
}

const modelColumns: ColumnDef<Model>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "make",
        header: "Make"
    }
]

function Models() {

    const [modelData, setModelData] = useState<Model[]>([]);
    const [makeData, setMakeData] = useState<Make[]>([]);

    useEffect(() => {
        getModelData();
    }, []);

    function getModelData(){
        const localStorageData: { models: Model[], makes:[] } = JSON.parse(localStorage.getItem("data") || '{"models":[], "makes":[]}');
        setModelData(localStorageData.models || []);
        setMakeData(localStorageData.makes || []);
    }

    return (
        <div className="container mx-auto py-10 grid gap-3">
            <div className="flex justify-between">
                <AddModel onAdd={getModelData} makes={makeData} />
                <SearchModel />
            </div>
            <DataTable columns={modelColumns} data={modelData} />
        </div>
    );
}

export default Models;