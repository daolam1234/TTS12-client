import React from "react";

export const ProductCircleLogo: React.FC = () => {
  return (
    <div className="absolute h-[178px] right-[537px] top-[77px] w-[178px] max-sm:right-5 max-sm:top-10 max-sm:h-[120px] max-sm:w-[120px]">
      <div className="relative size-full">
        <svg
          width="178"
          height="178"
          viewBox="0 0 178 178"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-full"
        >
          <path
            d="M88.76 177.52C137.781 177.52 177.52 137.781 177.52 88.76C177.52 39.7392 137.781 0 88.76 0C39.7392 0 0 39.7392 0 88.76C0 137.781 39.7392 177.52 88.76 177.52Z"
            fill="#4A6634"
          />
        </svg>
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          <svg
            width="81"
            height="30"
            viewBox="0 0 81 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-[29px]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.7 2.06C5.49001 8.17 0.500013 15.75 0.450013 21.42C0.430013 23.55 1.11001 25.41 2.74001 26.82C5.09001 28.85 7.68001 29.57 10.25 29.57C14.01 29.57 17.75 28.06 20.68 26.89C25.61 24.92 80.1 1.25 80.1 1.25C80.63 0.989998 80.53 0.659998 79.87 0.819998C79.6 0.889998 20.55 16.89 20.55 16.89C19.43 17.21 18.28 17.37 17.11 17.38C12.57 17.41 8.53001 14.89 8.57001 9.58C8.58001 7.5 9.22001 5 10.69 2.05L10.7 2.06Z"
              fill="white"
            />
          </svg>
        </div>
        <h2 className="absolute top-2/4 left-2/4 w-full text-xl text-center text-white -translate-x-2/4 -translate-y-2/4">
          LIMITED EDITION NIKE
        </h2>
      </div>
    </div>
  );
};
