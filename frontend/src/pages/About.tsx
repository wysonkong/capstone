import {Button} from "@/components/ui/button"
import {Link} from "react-router";
const About = () => {
    return (
        <div className={"bg-no-repeat bg-center bg-cover h-screen flex items-center justify-center"}>
            <div className={"rounded-lg text-center text-white"}>
                <h1 className={"text-6xl font-bold mb-4 text-primary"}>Our History</h1>
                <h2 className={"text-4xl font-bold mb-4"}>About Us</h2>
                <div className={"grid grid-cols-1 gap-6 rounded-lg text-center text-white opacity-75 p-8"}>
                    <p className={"text-xl"}>Long ago, in a dusty old warehouse️ at the edge of town, three friends with
                        way too much caffeine and not nearly enough sleep had an idea: what if widgets could be more
                        than boring little parts hidden inside machines? What if they were smart, stylish, and full of
                        personality? That spark became Bright Forge Widgets.</p>

                    <p className={"text-xl"}> At first, Bright Forge was nothing more than a couple of laptops, a soldering iron, and a
                        fridge full of energy drinks. But the founders believed in blending art and tech.
                        Instead of mass-producing cookie-cutter parts, they forged each widget like a piece of digital
                        blacksmith—strong, sleek, and a little bit magical.</p>

                    <p className={"text-xl"}> Their very first creation, the WobbleTop, looked like a harmless desk toy until people
                        discovered it could balance coffee cups, hold tangled charging cables, and even serve as an
                        emergency paperweight during windy days. Customers loved it so much that Bright Forge
                        couldn’t keep up with demand. Soon came the Doohickey —a mysterious little sphere with a
                        handle, beloved by gadget geeks and artists alike. No one knows exactly what it does, but
                        somehow everyone finds a use for it. </p>

                    <p className={"text-xl"}> Bright Forge isn’t just about widgets—it’s about imagination and creativity! Each new design
                        begins with a “what if?” What if a widget could glow when your Wi-Fi signal weakens? What if
                        it could hum a tune when you’ve been sitting too long? What if it could help learners
                        understand technology by starring in a capstone project? Over the years, Bright Forge has
                        become a legend, guided by the motto: “If you can dream it, we can forge it.” </p>
                </div>
                <div className={"flex flex-wrap items-center justify-center gap-2"}>
                    <Button asChild className={"bg-primary"}><Link to={"/Widgets"}>Get Started!</Link></Button>
                </div>
            </div>


        </div>
    );
};

export default About;