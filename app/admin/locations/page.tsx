"use client";
import DataTable from "@/components/ui/DataTable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import SearchModel from "./search-location";
import { useEffect, useState } from "react";
import { Make } from "../makes/page";
import AddLocation from "./add-location";
import SearchLocation from "./search-location";

export type Location = {
    id: string,
    name: string,
}

const modelColumns: ColumnDef<Location>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
]

function Locations() {

    const [locationData, setLocationData] = useState<Location[]>([]);
    const [makeData, setMakeData] = useState<Make[]>([]);

    useEffect(() => {
        getModelData();
    }, []);

    function getModelData(){
        // const localStorageData: { models: Location[], makes:[] } = JSON.parse(localStorage.getItem("data") || '{"models":[], "makes":[]}');
        // setMakeData(localStorageData.makes || []);
    }

    return (
        <div className="container mx-auto py-10 grid gap-3">
            <div className="flex justify-between">
                <AddLocation onAdd={getModelData} />
                <SearchLocation />
            </div>
            <DataTable columns={modelColumns} data={locationData} />
        </div>
    );
}

export default Locations;