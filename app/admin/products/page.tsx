"use client";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Make } from "../makes/page";
import { Model } from "../models/page";
import DataTable from "@/components/ui/DataTable/data-table";

type Product = {
    name:string,
    make: string,
    makeId: string | number,
    model: string,
    modelId: string | number,
    specs: Map<string, any>,
    photos: string[] | URL[],
    history: string,
    location: string,
    locationId: string | number,
    price: number,
    seller: string,
    sellerId: string | number,
    status: "pending-approval" | "in-stock" | "sold-out",
    qtyInStock: number
}

const productColumns:ColumnDef<Product>[] = [
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

function ProductManager() {

    const [allData, setAllData] = useState<{
        makes:Make[], 
        models:Model[], 
        products:Product[]}>({
            makes:[],
            models:[],
            products:[]
    });

    useEffect(()=>{
        const localStorageData = JSON.parse(
            localStorage.getItem("data") || '{"makes":[], "models":[], "products":[]}'
        );
        if(!("products" in localStorageData)){
            localStorageData.products = []
        }
    }, []);

    return ( 
        <div className="container mx-auto py-10 grid gap-3">
            <div className="flex">
                
            </div>
            <DataTable columns={productColumns} data={allData.products} />
        </div>
     );
}

export default ProductManager;