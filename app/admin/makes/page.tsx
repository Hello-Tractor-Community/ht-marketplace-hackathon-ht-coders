import SearchMake from "./_components/search-make";
import AddMake from "./_components/add-make";
import { prisma } from "@/lib/prisma";
import { Make } from "@prisma/client";
import MakesGrid from "./_components/makes-grid";

async function Makes() {

    const makesData: Make[] = await prisma.make.findMany();

    return (
        <div className="container mx-auto py-10 grid gap-3">
            <div className="flex justify-between">
                <AddMake />
                <SearchMake />
            </div>
            <MakesGrid data={makesData} />
        </div>
    );
}

export default Makes;