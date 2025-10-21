import {Dialog, DialogTrigger} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Plus} from 'lucide-react'
import {useEffect, useState} from "react";
import WidgetForm from "@/components/WidgetForm.tsx";
import type {widgetData} from "@/components/WidgetForm.tsx";
import WidgetCard from "@/components/WidgetCard.tsx";
import {useAuth} from "@/components/AuthProvider.tsx";

const Widgets = () => {
    const {userId, isLoggedIn} = useAuth();
    const [open, setOpen] = useState(false);
    const [widgets, setWidgets] = useState<widgetData[]>([])

    useEffect(() => {
        const fetchWidgets = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/widget/widgets")
                const data = await res.json();
                setWidgets(data)
            } catch (e) {
                console.log("Error fetching widgets:", e)
            }
        }

        fetchWidgets();
    }, []);

    const handleAddWidget = async (newWidget: widgetData) => {
        if (!userId) {
            console.error("No user logged in");
            alert("You must be logged in to create a widget");
            return;
        }

        const widgetToSend = {
            ...newWidget,
            userId: userId
        };
        try{
            const res = await fetch("http://localhost:8080/api/widget/new_widget", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(widgetToSend),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.log("Failed to add widget. Status:", res.status);
                console.log("Error response:", errorText);
                alert("Failed to create widget. Check console for details.");
                return;
            }

            const responseText = await res.text();

            if (responseText) {
                const createdWidget = JSON.parse(responseText);
                setWidgets(prev => [...prev, createdWidget]);
                alert("Widget created successfully!");
            } else {
                console.log("Empty response from server");
                const refreshRes = await fetch("http://localhost:8080/api/widget/widgets");
                const allWidgets = await refreshRes.json();
                setWidgets(allWidgets);
            }
        } catch (err) {
            console.log("Error adding widget: ", err);
            alert("Error creating widget: " + err.message);
        }
    }

    const handleUpdateAmount = async (widgetId: number, newAmount: number) => {
        try {
            const res = await fetch(`http://localhost:8080/api/widget/${widgetId}/amount`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ amount: newAmount }),
            });

            if (!res.ok) {
                console.error("Failed to update amount");
                alert("Failed to update widget amount");
                return;
            }

            setWidgets(prev => prev.map(widget =>
                widget.id === widgetId ? { ...widget, amount: newAmount } : widget
            ));
            console.log("Amount updated successfully for widget", widgetId);
        } catch (err) {
            console.error("Error updating amount:", err);
            alert("Error updating widget amount");
        }
    }

    return (
        <>
            <div className={"px-32"}>
                {isLoggedIn && <div className={"pt-16 px-8 mb-5"}>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant={"outline"} size={"lg"} className={"bg-accent rounded-full"}>
                                <Plus/>
                            </Button>
                        </DialogTrigger>
                        <WidgetForm onSubmit={(widgetData) => {
                            handleAddWidget(widgetData);
                            setOpen(false);
                        }}/>
                    </Dialog>
                </div>}
                <div className={"grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6"}>
                    <div
                        className={"rounded-lg text-center text-white opacity-75 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"}>
                        {widgets.map((widget) => (
                            <WidgetCard key={widget.id} widget={widget} onUpdateAmount={handleUpdateAmount}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Widgets;