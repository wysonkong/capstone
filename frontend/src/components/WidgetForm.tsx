import React, {useState} from 'react';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Info} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import defaultImage from "@/assets/react.svg";

type WidgetFormProps = {
    onSubmit: (data: widgetData) => void;
}
export type widgetData = {
    name: string;
    description: string;
    amount: number;
    image: string;
    userId: string;
    created: string;
};

const initialWidgetState: widgetData = {
    name: "",
    description: "",
    amount: 0,
    image: `frontend/src/assets/${defaultImage}`,
    userId: "",
    created: new Date().toISOString().split("T")[0],
}

const WidgetForm = ({onSubmit}: WidgetFormProps) => {

    const [widgetData, setWidgetData] = useState<widgetData>(initialWidgetState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setWidgetData((prev) => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!widgetData.name || !widgetData.description || !widgetData.amount) {
            alert("Please fill in your widget information");
            return;
        }
        console.log("Submitting widget:", widgetData);
        onSubmit(widgetData);
        handleReset();
    };

    const handleReset = () => {
        setWidgetData(initialWidgetState);
    }

    return (
        <form id={"widgetForm"} onSubmit={handleSubmit} onReset={handleReset}>
            <DialogContent className={"bg-card"}>
                <DialogHeader>
                    <DialogTitle>New Widget</DialogTitle>
                    <DialogDescription>
                        Add your new widget to the inventory.
                    </DialogDescription>
                </DialogHeader>

                {/*Widget Name*/}
                <div className={"grid gap-4"}>
                    <div className={"grid gap-3"}>
                        <Label htmlFor={"widgetName"}>Widget</Label>
                        <InputGroup>
                            <InputGroupInput
                                id={"widgetName"}
                                name={"name"}
                                value={widgetData.name}
                                onChange={handleChange}
                                placeholder={"name"}
                                type={"text"}
                                className={"!pl-1"} />
                            <InputGroupAddon align="inline-end">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InputGroupButton className="rounded-full" size="icon-xs">
                                            <Info />
                                        </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent>Add your widget name here.</TooltipContent>
                                </Tooltip>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>

                {/*Description*/}
                <div className={"grid gap-4"}>
                    <div className={"grid gap-3"}>
                        <Label htmlFor={"widgetDesc"}>Description</Label>
                        <InputGroup >
                            <InputGroupInput
                                id={"widgetDesc"}
                                name={"description"}
                                value={widgetData.description}
                                onChange={handleChange}
                                placeholder={"What does it do?"}
                                type={"text"}
                                className={"!pl-1"} />
                            <InputGroupAddon align="inline-end">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InputGroupButton className="rounded-full" size="icon-xs">
                                            <Info />
                                        </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent>What does your widget do?</TooltipContent>
                                </Tooltip>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>

                {/*/!*Inventory*!/*/}
                <div className={"grid gap-4"}>
                    <div className={"grid gap-3"}>
                        <Label htmlFor={"widgetAmount"}>Amount</Label>
                        <InputGroup>
                            <InputGroupInput id={"widgetAmount"}
                                             name={"amount"}
                                             value={widgetData.amount > 0 ? widgetData.amount : ""}
                                             onChange={handleChange}
                                             placeholder={"How many?"}
                                             type={"number"}
                                             className={"!pl-1"} />
                            <InputGroupAddon align="inline-end">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InputGroupButton className="rounded-full" size="icon-xs">
                                            <Info />
                                        </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent>How many widgets are available?</TooltipContent>
                                </Tooltip>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={handleReset} className={"bg-destructive"}>Cancel</Button>
                    </DialogClose>
                    <Button type={"reset"} onClick={handleReset} className={"bg-secondary"}>Reset</Button>
                    <Button form={"widgetForm"} type={"submit"} className={"bg-primary"}>Submit</Button>
                </DialogFooter>

            </DialogContent>
        </form>
    );
};

export default WidgetForm;