
const Topbar = ({ type }: { type: string }) => {

    const handleSave = () => {
        if (type === 'insight') return

        let payload = {
            subscriptions: sessionStorage.getItem("subscriptions"),
            budgeting: sessionStorage.getItem('budgeting'),
            cashflow: sessionStorage.getItem('cashflow')
        }

        if(document) {
            const element = document.createElement("a");
            const file = new Blob([JSON.stringify(payload)], {
              type: "text/plain"
            });
            element.href = URL.createObjectURL(file);
            element.download = "save.txt";
            document.body.appendChild(element);
            element.click();
        }
    }

    return (
        <div className="topbar">
            <span className="topbar--header" onClick={handleSave} style={{cursor: type === 'insight' ? 'default' : 'pointer'}}>
                gliss.to
            </span>
        </div>
    )
}

export default Topbar;