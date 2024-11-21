
import { Make, Model } from "@prisma/client";
import AddEditListingForm from "./add-edit-listing-form";
import { prisma } from "@/lib/prisma";

async function AddEditListing() {
    const makeData:Make[] = await prisma.make.findMany({
        relationLoadStrategy:"join",
        include:{
            Model: true
        }
    });
    return (<>
        <AddEditListingForm makes={makeData} />
    </>);
}

export default AddEditListing;


