import { SearchIcon, User2Icon, MenuIcon } from "lucide-react";
import { Logo } from "../nav/Logo";
import { NavigationMenu } from "../nav/NavigationMenu";
import { FavoriteIcon } from "../Icons/FavoriteIcon";
import { BagIcon } from "../Icons/BagIcon";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <header className="flex justify-between items-center px-16 py-0 w-full bg-white border-b border-solid border-b-zinc-400 h-[100px] max-md:px-8 max-md:py-0 max-sm:px-4 max-sm:py-0 max-sm:h-[60px]">
                {/* Hamburger menu button - chỉ hiện trên sm */}
                <button
                    className="sm:block md:hidden mr-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Open menu"
                >
                    <MenuIcon />
                </button>
                <a href="/homepage"><Logo /></a>
                <div className="hidden sm:block">
                    <NavigationMenu />
                </div>
                <nav className="flex items-center h-full">
                    <div className="flex items-center px-5 py-0 h-full  max-md:px-4 max-md:py-0 max-sm:px-2.5 max-sm:py-0">
                        <div className="flex flex-col justify-center items-center h-[100px] w-[50px] max-sm:w-10 max-sm:h-[60px]">
                            <SearchIcon />
                        </div>
                    </div>
                    <div className="flex items-center px-5 py-0 h-full  max-md:px-4 max-md:py-0 max-sm:px-2.5 max-sm:py-0">
                        <div className="flex flex-col justify-center items-center h-[100px] w-[50px] max-sm:w-10 max-sm:h-[60px]">
                            <BagIcon />
                        </div>
                    </div>
                    <a href="/login" className="flex items-center px-5 py-0 h-full  max-md:px-4 max-md:py-0 max-sm:px-2.5 max-sm:py-0">
                        <div className="flex flex-col justify-center items-center h-[100px] w-[50px] max-sm:w-10 max-sm:h-[60px]">
                            <User2Icon />
                        </div>
                    </a>
                </nav>
            </header>

            {/* Menu sidebar/drawer cho mobile */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 sm:block md:hidden" onClick={() => setMenuOpen(false)}>
                    <div className="bg-white w-64 h-full p-4" onClick={e => e.stopPropagation()}>
                        <NavigationMenu className="flex-col items-start gap-4" />
                    </div>
                </div>
            )}
        </div>
    );
}