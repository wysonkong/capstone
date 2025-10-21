import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Edit2} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useAuth} from "@/components/AuthProvider.tsx";

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
    onUpdateAmount?: (widgetId: number, newAmount: number) => void;
}

const WidgetCard = ({widget, onUpdateAmount}: WidgetCardProps) => {
    const {isLoggedIn} = useAuth();
    const [open, setOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [newAmount, setNewAmount] = useState(widget.amount);

    const getImageSrc = () => {
        if (imageError) {
            console.log("Image error, using fallback");
            return '/assets/react.svg';
        }

        if (!widget.image) {
            return '/assets/react.svg';
        }

        if (widget.image.includes('.jpg') || widget.image.includes('.jpeg') ||
            widget.image.includes('.png') || widget.image.includes('.gif') ||
            widget.image.includes('.svg') || widget.image.includes('.webp')) {
            return `/assets/${widget.image}`;
        }

        if (widget.image.includes('-') && widget.image.length > 30) {
            return `/assets/${widget.image}.jpg`;
        }

        const src = `/assets/${widget.image}.svg`;
        return src;
    };

    const handleImageError = () => {
        console.error("Failed to load image:", getImageSrc());
        if (!imageError) {
            setImageError(true);
        }
    };

    const getAmountColor = () => {
        if (widget.amount <= 0) return "text-red-500";
        if (widget.amount > 0) return "text-green-500";
        return "text-gray-500";
    };

    const getAmountBgColor = () => {
        if (widget.amount <= 0) return "bg-red-500/10 border-red-500/30";
        if (widget.amount > 0) return "bg-green-500/10 border-green-500/30";
        return "bg-gray-500/10 border-gray-500/30";
    };

    const handleUpdateAmount = () => {
        if (onUpdateAmount) {
            console.log(`Updating widget ${widget.id} amount to ${newAmount}`);
            onUpdateAmount(widget.id, newAmount); // This calls the parent's handleUpdateAmount
        }
        setEditDialogOpen(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div>
                        <Card className={"cursor-pointer hover:shadow-lg transition-shadow"}>
                            <CardHeader className={"flex flex-col items-center gap-2 p-4"}>
                                <img
                                    src={getImageSrc()}
                                    alt={widget.name}
                                    className={"object-cover w-full h-32"}
                                    onError={handleImageError}
                                />
                                <CardTitle>{widget.name}</CardTitle>
                            </CardHeader>
                            <CardFooter className={`px-4 py-2 justify-between border-2 ${getAmountBgColor()}`}>
                                <span className={"font-semibold"}>Amount: </span>
                                <span className={`font-bold ${getAmountColor()}`}>{widget.amount}</span>
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
                                <img
                                    src={getImageSrc()}
                                    alt={widget.name}
                                    className={"object-cover w-full max-h-64"}
                                    onError={handleImageError}
                                />
                                <CardTitle>{widget.name}</CardTitle>
                            </CardHeader>
                            <CardContent className={"px-4 py-2"}>
                                <p className={"mb-4"}>{widget.description}</p>
                                <div className={"flex justify-between mb-2"}>
                                    <span className={"font-semibold"}>Created By: </span>
                                    <span>{widget.username}</span>
                                </div>
                                <div className={"flex justify-between"}>
                                    <span className={"font-semibold"}>Created: </span>
                                    <span>{widget.created}</span>
                                </div>

                            </CardContent>
                            <CardFooter className={"px-4 py-2 flex justify-between items-center"}>
                                <div className={`flex items-center gap-2 border-2 px-3 py-2 rounded ${getAmountBgColor()}`}>
                                    <span className={"font-semibold"}>Amount: </span>
                                    <span className={`font-bold ${getAmountColor()}`}>{widget.amount}</span>
                                </div>
                                {isLoggedIn && <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setNewAmount(widget.amount);
                                        setEditDialogOpen(true);
                                    }}
                                    className="gap-2"
                                >
                                    <Edit2 size={16} />
                                    Edit Amount
                                </Button>}
                            </CardFooter>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Amount Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Widget Amount</DialogTitle>
                        <DialogDescription>
                            Update the quantity for {widget.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex flex-col items-center gap-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={newAmount}
                                    onChange={(e) => setNewAmount(Number(e.target.value))}
                                    className="w-32 text-center text-xl font-bold"
                                />
                            </div>
                        </div>
                        <div className={`text-center p-3 rounded border-2 ${
                            newAmount <= 0 ? 'bg-red-500/10 border-red-500/30 text-red-500' :
                                'bg-green-500/10 border-green-500/30 text-green-500'
                        }`}>
                            {newAmount <= 0 ? '⚠️ Out of Stock' : '✓ In Stock'}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateAmount}>
                            Update Amount
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default WidgetCard;