import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {Link} from "react-router"
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/components/AuthProvider.tsx";

const Navbar = () => {
    const {isLoggedIn, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <NavigationMenu
            className={"fixed top-0 left-0 w-full backdrop-blur-md shadow-md z-50 rounded-b-lg justify-between"}
        >
            <NavigationMenuList className={"flex items-center justify-between px-8 py-3 w-full"}>
                <NavigationMenuItem>
                    <Link to={"/"} className={"text-xl font-bold text-white hover:text-blue-400 transition-colors"}>Bright
                        Forge</Link>
                </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuList className={"flex items-center justify-between px-8 py-3 text-gray-500 w-full"}>
                <div className={"ml-auto flex items-center space-x-4"}>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to={"/About"}
                                className={"px-3 py-2 rounded-md hover:bg-gray-400/50 hover:text-white transition-colors"}
                            >
                                About Us
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to={"/Widgets"}
                                className={"px-3 py-2 rounded-md hover:bg-gray-400/50 hover:text-white transition-colors"}
                            >
                                Widgets
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {isLoggedIn ? (
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/"
                                        onClick={handleLogout}
                                        className={"px-3 py-2 rounded-md hover:bg-gray-400/50 hover:text-white transition-colors"}
                                    >
                                        Log Out
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ) :

                        (
                            <>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            to="/Login"
                                            className={"px-3 py-2 rounded-md hover:bg-gray-400/50 hover:text-white transition-colors"}
                                        >
                                            Log In
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            to="/Signup"
                                            className={"px-3 py-2 rounded-md bg-blue-400 text-gray-900 font-semibold hover:bg-blue-300 transition-colors"}
                                        >
                                            Sign Up
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </>
                        )
                    }

                </div>
            </NavigationMenuList>
        </NavigationMenu>
    );
};


export default Navbar;