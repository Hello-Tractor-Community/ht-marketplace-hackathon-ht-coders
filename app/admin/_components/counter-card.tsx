import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react";

function CounterCard({ children, title }: { children: React.ReactNode, title?: string }) {
    return (<>
        <Card>
            {title && <CardHeader>
                <CardTitle className="text-1xl">{title}</CardTitle>
            </CardHeader>}
            <CardContent className="divide-x2">
                {children}
            </CardContent>
        </Card>
    </>);
}

export default CounterCard;