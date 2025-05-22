import React from "react";

export const ProductHeading: React.FC = () => {
  return (
    <section className="absolute left-[60px] max-w-[571px] top-[69px] max-md:left-10 max-sm:left-5 max-sm:top-10">
      <h1 className="text-9xl text-white leading-[160px] max-md:text-8xl max-md:leading-[120px] max-sm:text-6xl max-sm:leading-[80px]">
        RETRO LOW
      </h1>
      
      <p className="mx-0 mt-5 mb-10 text-xl font-medium leading-9 text-white max-md:text-lg max-md:leading-8 max-sm:text-base max-sm:leading-7">
        The Nike Dunk Low SE Jackpot GS is a low-cut sneaker with hints of grey,
        white, blue, and red.
      </p>
      <button className="px-4 py-1.5 text-6xl font-bold bg-white cursor-pointer shadow-[0px_4px_14px_rgba(74,102,52,0.5)] text-neutral-900 max-md:text-5xl max-sm:text-4xl">
        SHOP NOW!
      </button>
    </section>
  );
};
