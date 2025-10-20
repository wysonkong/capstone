import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription} from "@/components/ui/dialog.tsx";
import {useState} from "react";

type WidgetCardProps = {
    widget: {
        id: number;
        name: string;
        description: string;
        amount: number;
        image: string;
        username: string;
        created: string
    }
}

const WidgetCard = ({widget}: WidgetCardProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div>
                    <Card className={""}>
                        <CardHeader className={"flex flex-col items-center gap-2 p-4"}>
                            <img src={`/assets/${widget.image}.svg`} alt={widget.name} className={"object-cover"}/>
                            <CardTitle>{widget.name}</CardTitle>
                        </CardHeader>
                        <CardFooter className={"px-4 py-2 justify-between"}>
                            <span className={"font-semibold"}>Amount: </span>
                            <span>{widget.amount}</span>
                        </CardFooter>
                    </Card>
                </div>
            </DialogTrigger>
            <DialogContent aria-describedby={"More Info"}>
                <DialogTitle>
                </DialogTitle>
                <DialogDescription>
                </DialogDescription>
                <div>
                    <Card className={""}>
                        <CardHeader className={"flex flex-col items-center gap-2 p-4"}>
                            <img src={`/assets/${widget.image}.svg`} alt={widget.name} className={"object-cover"}/>
                            <CardTitle>{widget.name}</CardTitle>
                        </CardHeader>
                        <CardContent className={"px-4 py-2"}>
                            <p>{widget.description}</p>
                            <div className={"justify-between"}>
                                <span className={"font-semibold"}>Created By: </span>
                                <span>{widget.username}</span>
                            </div>
                            <div className={"justify-between"}>
                                <span className={"font-semibold"}>Created: </span>
                                <span>{widget.created}</span>
                            </div>

                        </CardContent>
                        <CardFooter className={"px-4 py-2 justify-between"}>
                            <span className={"font-semibold"}>Amount: </span>
                            <span>{widget.amount}</span>
                        </CardFooter>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WidgetCard;