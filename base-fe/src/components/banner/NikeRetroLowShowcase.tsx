"use client";

import React from "react";
import { CircularBackground } from "./CircularBackground";
import { ProductCircleLogo } from "./ProductCircleLogo";
import { SlideIndicators } from "./SlideIndicators";
import { ProductHeading } from "./ProductHeading";

export const NikeRetroLowShowcase: React.FC = () => {
  return (
    <main className="overflow-hidden relative mx-auto w-full max-w-none h-[750px] max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <CircularBackground />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/25f8addfc91e4cbbb1242155c9b60098c6e0e46e"
        alt="Nike shoe"
        className="absolute h-[318px] right-[-276px] rotate-[-14.58deg] top-[139px] w-[802px] max-md:h-[238px] max-md:right-[-150px] max-md:w-[600px] max-sm:h-[159px] max-sm:right-[-100px] max-sm:top-[200px] max-sm:w-[400px]"
      />
      <ProductCircleLogo />
      <ProductHeading />
      <SlideIndicators />
    </main>
  );
};

export default NikeRetroLowShowcase;
