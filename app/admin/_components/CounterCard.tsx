import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

function CounterCard({ count, title }: { count: number|string, title: string }) {
    return (<>
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="divide-x-[5px]">
                <h3 className="text-3xl font-extrabold">{count}</h3>
            </CardContent>
            <CardFooter>
                <Button variant={"ghost"}>More</Button>
            </CardFooter>
        </Card>
    </>);
}

export default CounterCard;