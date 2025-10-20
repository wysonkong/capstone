import {Dialog, DialogTrigger} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Plus} from 'lucide-react'
import {useEffect, useState} from "react";
import WidgetForm from "@/components/WidgetForm.tsx";
import type {widgetData} from "@/components/WidgetForm.tsx";
import WidgetCard from "@/components/WidgetCard.tsx";
import {useAuth} from "@/components/AuthProvider.tsx";

const Widgets = () => {
    const {login, isLoggedIn} = useAuth();
    const [open, setOpen] = useState(false);
    const [widgets, setWidgets] = useState<widgetData[]>([])

    useEffect(() => {
        const fetchWidgets = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/widget/widgets")
                const data = await res.json();
                console.log(data)
                setWidgets(data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchWidgets();
    }, []);

    const handleAddWidget = async (newWidget: widgetData) => {
            const widgetToSend = {
                ...newWidget,
                userId: login.userId
            };

        try{
            const res = await fetch("http://localhost:8080/api/widget/new_widget", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(widgetToSend),
            });

            if (!res.ok) {
                console.log("Failed to add widget");
                return;
            }

            const createdWidget = await res.json();
            setWidgets(prev => [...prev, {...createdWidget, username: login.username, date: createdWidget.created}]);
        } catch (err) {
            console.log("Error adding widget: ", err);
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
                            <WidgetCard key={widget.id} widget={widget}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Widgets;