import React from "react";

export const SlideIndicators: React.FC = () => {
  return (
    <div className="flex absolute left-2/4 gap-5 -translate-x-2/4 bottom-[46px]">
      <div className="w-10 h-1.5 rounded-xl bg-white bg-opacity-40" />
      <div className="w-10 h-1.5 rounded-xl bg-white bg-opacity-40" />
      <div className="w-10 h-1.5 rounded-xl bg-white bg-opacity-40" />
    </div>
  );
};
