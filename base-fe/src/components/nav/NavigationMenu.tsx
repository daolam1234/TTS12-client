import React from "react";

export const NavigationMenu = () => {
  return (
    <nav className="flex gap-8 items-center max-sm:hidden max-xl:hidden ">
      <a href="/newArrival" className="font-bold text-stone-950 md:text-xl hover:underline">
        New arrivals
      </a>
      <a href="/men" className="font-bold text-stone-950 md:text-xl hover:underline">
        Men
      </a>
      <a href="/women" className="font-bold text-stone-950 md:text-xl hover:underline">
        Women
      </a>
      <a href="/kids" className="font-bold text-stone-950 md:text-xl hover:underline">
        Kids
      </a>
      <a href="/collection" className="font-bold text-stone-950 md:text-xl hover:underline">
        Collection
      </a>
    </nav>
  );
};
