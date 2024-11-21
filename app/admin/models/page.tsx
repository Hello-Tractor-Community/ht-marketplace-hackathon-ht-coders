import AddModel from "./_components/add-model";
import SearchModel from "./_components/search-model";
import { Make, Model } from "@prisma/client";
import ModelsGrid from "./_components/models-grid";
import { prisma } from "@/lib/prisma";



async function Models() {

    const modelData:Model[] = await prisma.model.findMany({
        include:{
            make: true
        }
    });
    const makes:Make[] = await prisma.make.findMany();

    return (
        <div className="container mx-auto py-10 grid gap-3">
            <div className="flex justify-between">
                <AddModel {...{makes}} />
                <SearchModel />
            </div>
            <ModelsGrid data={modelData} />
        </div>
    );
}

export default Models;