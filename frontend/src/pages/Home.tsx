import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Home = () => {
    return (

        <div className={"bg-no-repeat bg-center bg-cover h-screen flex items-center justify-center"}>
            <div className={"rounded-lg text-center text-white opacity-75"}>
                <h2 className={"text-4xl font-bold mb-4"}>Welcome to</h2>
                <h1 className={"text-6xl font-bold mb-4 text-primary"}>Bright Forge</h1>
                <p className={"text-xl mb-4"}>Experience what our widgets have to offer</p>
                <div className={"flex flex-wrap items-center justify-center gap-2 mb-32"}>
                    <Button asChild className={"bg-primary"}><Link to={"/Widgets"}>Get Started!</Link></Button>
                </div>
                <div className={"grid grid-cols-3 gap-6"}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Innovative</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>If you can dream it,</p>
                            <p>we can forge it</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Perfection</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Driven by ideas</p>
                            <p>Defined by excellence</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Boundless</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Innovation isn’t a goal</p>
                            <p>it's our foundation</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>

    );
};

export default Home;