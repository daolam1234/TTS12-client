import { SearchIcon, User2Icon } from "lucide-react";
import { Logo } from "../nav/Logo";
import { NavigationMenu } from "../nav/NavigationMenu";
import { FavoriteIcon } from "../Icons/FavoriteIcon";
import { BagIcon } from "../Icons/BagIcon";

export default function Header() {
    return (
        <div>
            <header className="flex justify-between items-center px-16 py-0 w-full bg-white border-b border-solid border-b-zinc-400 h-[100px] max-md:px-8 max-md:py-0 max-sm:px-4 max-sm:py-0 max-sm:h-[60px]">
                <a href="/homepage"><Logo /></a>
               <div className="">
                 <NavigationMenu />
               </div>
                <nav className="flex items-center h-full">
                    <div className="flex items-center px-5 py-0 h-full  max-md:px-4 max-md:py-0 max-sm:px-2.5 max-sm:py-0">
                        <div className="flex flex-col justify-center items-center h-[100px] w-[50px] max-sm:w-10 max-sm:h-[60px]">
                            <SearchIcon />
                        </div>
                    </div>
                    {/* <div className="flex items-center px-5 py-0 h-full  max-md:px-4 max-md:py-0 max-sm:px-2.5 max-sm:py-0">
                        <div className="flex flex-col justify-center items-center h-[90px] w-[50px] max-sm:w-10 max-sm:h-[60px]">
                            <FavoriteIcon />
                        </div>
                    </div> */}
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

           

        </div>


    );
}