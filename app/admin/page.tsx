import CounterCard from "./_components/CounterCard";

function AdminPanel() {
    return (<>
        <div className="flex gap-3 p-3">
            <div className="flex-auto">
                <CounterCard count={"3k"} title="Merchants" />
            </div>
            <div className="flex-auto">
                <CounterCard count={300} title="Catelogue" />
            </div>
        </div>
    </>);
}

export default AdminPanel;