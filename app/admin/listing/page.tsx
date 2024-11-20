"use client";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Make } from "../makes/page";
import { Model } from "../models/page";
import DataTable from "@/components/ui/DataTable/data-table";

type Listing = {
    name:string,
    make: string,
    makeId: string | number,
    model: string,
    modelId: string | number,
    features: Map<string, any>,
    photos: string[] | URL[],
    description: string,
    location: string,
    locationId: string | number,
    price: number,
    seller: string,
    sellerId: string | number,
    status: "pending-approval" | "in-stock" | "sold-out",
    qtyInStock: number
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
]

function ListingManager() {

    const [allData, setAllData] = useState<{
        makes:Make[], 
        models:Model[], 
        listings:Listing[]}>({
            makes:[],
            models:[],
            listings:[]
    });

    useEffect(()=>{
        const localStorageData = JSON.parse(
            localStorage.getItem("data") || '{"makes":[], "models":[], "listings":[]}'
        );
        if(!("listings" in localStorageData)){
            localStorageData.listings = []
        }
    }, []);

    return ( 
        <div className="container mx-auto py-10 grid gap-3">
            <div className="flex">
                
            </div>
            <DataTable columns={listingColumns} data={allData.listings} />
        </div>
     );
}

export default ListingManager;