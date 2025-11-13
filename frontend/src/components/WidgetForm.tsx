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
import {Info, Upload, X} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";

type WidgetFormProps = {
    onSubmit: (data: widgetData) => void;
}
export type widgetData = {
    id?: number;
    name: string;
    description: string;
    amount: number;
    image: string;
    username: string;
    created: string;
};

const initialWidgetState: widgetData = {
    name: "",
    description: "",
    amount: 0,
    image: "react",
    username: "",
    created: new Date().toISOString().split("T")[0],
}

const WidgetForm = ({onSubmit}: WidgetFormProps) => {

    const [widgetData, setWidgetData] = useState<widgetData>(initialWidgetState);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setWidgetData((prev) => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('Image size must be less than 5MB');
                return;
            }

            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            const imageName = file.name.split('.')[0];
            setWidgetData((prev) => ({
                ...prev,
                image: imageName,
            }));
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setWidgetData((prev) => ({
            ...prev,
            image: "react",
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!widgetData.name || !widgetData.description || !widgetData.amount) {
            alert("Please fill in your widget information");
            return;
        }

        let finalWidgetData = { ...widgetData };

        if (imageFile) {
            try {
                const formData = new FormData();
                formData.append('file', imageFile);

                const uploadResponse = await fetch("http://localhost:8080/api/image/upload", {
                    method: "POST",
                    body: formData,
                });

                console.log("Upload response status:", uploadResponse.status);

                if (uploadResponse.ok) {
                    const uploadResult = await uploadResponse.json();

                    if (!uploadResult.imageName) {
                        console.error("ERROR: Backend did not return imageName!");
                        alert("Backend error: no image name returned");
                        return;
                    }

                    finalWidgetData.image = uploadResult.imageName;
                } else {
                    const errorText = await uploadResponse.text();
                    console.error("Upload failed with status:", uploadResponse.status);
                    console.error("Error response:", errorText);
                    alert("Failed to upload image");
                    return;
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                return;
            }
        }

        console.log("Submitting widget:", finalWidgetData);
        onSubmit(finalWidgetData);
        handleReset();
    };

    const handleReset = () => {
        setWidgetData(initialWidgetState);
        setImagePreview(null);
        setImageFile(null);
    }

    return (
        <form id={"widgetForm"} onSubmit={handleSubmit} onReset={handleReset}>
            <DialogContent className={"bg-card max-h-[90vh] overflow-y-auto"}>
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

                {/*Amount*/}
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

                {/*Image Upload*/}
                <div className={"grid gap-4"}>
                    <div className={"grid gap-3"}>
                        <Label htmlFor={"widgetImage"}>Widget Image</Label>
                        <div className={"flex flex-col gap-3"}>
                            {imagePreview ? (
                                <div className={"relative w-full h-48 border-2 border-dashed rounded-lg overflow-hidden"}>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className={"w-full h-full object-contain"}
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className={"absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="widgetImage"
                                    className={"flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"}
                                >
                                    <Upload className={"mb-2"} />
                                    <p className={"text-sm text-gray-400"}>Click to upload image</p>
                                    <p className={"text-xs text-gray-500"}>PNG, JPG, GIF, SVG (max 5MB)</p>
                                    <p className={"text-xs text-gray-500 mt-1"}>Or use default image</p>
                                </label>
                            )}
                            <input
                                id="widgetImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={"hidden"}
                            />
                        </div>
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