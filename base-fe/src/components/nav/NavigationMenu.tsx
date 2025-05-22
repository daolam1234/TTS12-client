import React from "react";

export const NavigationMenu = () => {
  return (
    <nav className="flex gap-8 items-center max-md:gap-5 max-sm:hidden">
      <a href="#" className="font-bold text-stone-950 max-md:text-xl">
        New arrivals
      </a>
      <a href="#" className="font-bold text-stone-950 max-md:text-xl">
        Men
      </a>
      <a href="#" className="font-bold text-stone-950 max-md:text-xl">
        Women
      </a>
      <a href="#" className="font-bold text-stone-950 max-md:text-xl">
        Kids
      </a>
      <a href="#" className="font-bold text-stone-950 max-md:text-xl">
        Collection
      </a>
    </nav>
  );
};
