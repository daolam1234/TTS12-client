import React from "react";

export const NavigationMenu = ({ className = "" }: { className?: string }) => {
  return (
    <nav className={`flex gap-8 items-center ${className}`}>
      
      <a href="/sneakers" className="font-bold text-stone-950 md:text-xl hover:underline">
        New arrivals
      </a>
      <a href="/category/684725e07287bc6f1dad1592" className="font-bold text-stone-950 md:text-xl hover:underline">
        Men
      </a>
      <a href="/category/6847265b7287bc6f1dad15ac" className="font-bold text-stone-950 md:text-xl hover:underline">
        Women
      </a>
      <a href="/category/68472a4426f919a84b33eb89" className="font-bold text-stone-950 md:text-xl hover:underline">
        Kids
      </a>
      <a href="/sale" className="font-bold text-stone-950 md:text-xl hover:underline">
        Sale
      </a>
      <a href="/contact" className="font-bold text-stone-950 md:text-xl hover:underline">
        Contact
      </a>
    </nav>
  );
};
