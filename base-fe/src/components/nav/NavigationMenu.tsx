import React from "react";

export const NavigationMenu = ({ className = "" }: { className?: string }) => {
  return (
    <nav className={`flex gap-8 items-center ${className}`}>
      
      <a href="/sneakers" className="font-bold text-stone-950 md:text-xl hover:underline">
        New arrivals
      </a>
      <a href="#" className="font-bold text-stone-950 md:text-xl hover:underline">
        Men
      </a>
      <a href="#" className="font-bold text-stone-950 md:text-xl hover:underline">
        Women
      </a>
      <a href="#" className="font-bold text-stone-950 md:text-xl hover:underline">
        Kids
      </a>
      <a href="#" className="font-bold text-stone-950 md:text-xl hover:underline">
        Collection
      </a>
      <a href="/contact" className="font-bold text-stone-950 md:text-xl hover:underline">
        Contact
      </a>
    </nav>
  );
};
