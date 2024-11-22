import { prisma } from "@/lib/prisma";
import { Listing } from "@prisma/client";
import ListingGrid from "./_components/listing-grid";
import Link from "next/link";

async function ListingManager() {

    const listingData:Listing[] = await prisma.listing.findMany({
        include:{
            make: true,
            model: true
        }
    });
    console.log(listingData);

    return ( 
        <div className="container mx-auto py-10 grid gap-3">
            <div className="flex">
                <Link href={"/admin/listing/add-edit-listing"}>Add Listing</Link>
            </div>
            <ListingGrid data={listingData} />
        </div>
     );
}

export default ListingManager;