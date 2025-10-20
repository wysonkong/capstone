import Navbar from "./components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import type {PropsWithChildren} from "react";

const Layout = ({ children } : PropsWithChildren) => {
    return (
        <div className={"bg-background relative flex min-h-svh flex-col"}>
            <Navbar />
            <main className={"pt-16"}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
