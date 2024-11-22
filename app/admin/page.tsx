import { Card, CardContent } from "@/components/ui/card";
import CounterCard from "./_components/counter-card";
import { SalesReportChart } from "./_components/sales-report-chart";

function AdminPanel() {
    return (<>
        <div className="grid grid-cols-3 gap-3 p-3">
            <div className="col-span-3">
                <div className="grid grid-cols-4 gap-3">
                    <div className="flex-auto">
                        <CounterCard title="Today's Sale">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-extrabold">$12,426</h3>
                                <span>+36%</span>
                            </div>
                        </CounterCard>
                    </div>
                    <div className="flex-auto">
                        <CounterCard title="Total Sales">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-extrabold">$2,380,485 </h3>
                                <span>+14%</span>
                            </div>
                        </CounterCard>
                    </div>
                    <div className="flex-auto">
                        <CounterCard title="Total Orders">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-extrabold">84,328</h3>
                                <span>+36%</span>
                            </div>
                        </CounterCard>
                    </div>
                    <div className="flex-auto">
                        <CounterCard title="Total Users">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-extrabold">33,493</h3>
                                <span>+36%</span>
                            </div>
                        </CounterCard>
                    </div>
                </div>
            </div>

            <div className="col-span-2">
                <SalesReportChart />
            </div>

            <div className="col">
                <Card>
                    <CardContent>
                        Testing 2
                    </CardContent>
                </Card>
            </div>
        </div>
    </>);
}

export default AdminPanel;