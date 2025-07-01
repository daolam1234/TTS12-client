import React from "react";

export const NavigationMember = () => {
  return (
    
      <div className="flex py-10 md:px-8 text-xl font-bold max-sm:justify-center max-sm:items-center">
        <a href="/member/profile" className="px-4 py-2 rounded hover:underline">Profile</a>
        <a href="/member/orders" className="px-4 py-2 rounded hover:underline">Order</a>
        <a href="/member/favorites" className="px-4 py-2 rounded hover:underline">Favorite</a>
        <a href="/member/settings" className="px-4 py-2 rounded hover:underline">Setting</a>
      </div>
  
  );
};
