import React from "react";

export const CircularBackground: React.FC = () => {
  return (
    <div className="absolute size-full">
      <div className="bg-green-400 size-full" />
      <div>
        <svg
          width="671"
          height="732"
          viewBox="0 0 671 732"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-0 top-[36px] w-[647px] h-[708px]"
        >
          <circle cx="557" cy="621" r="107" fill="#E5BE67" fillOpacity="0.5" />
          <g filter="url(#filter0_d_1_3057)">
            <path
              d="M366 20C499.133 20 614.497 96.072 671 207.119V516.88C614.497 627.927 499.133 704 366 704C177.119 704 24 550.881 24 362C24 173.119 177.119 20 366 20Z"
              fill="#E5BE67"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1_3057"
              x="0"
              y="0"
              width="695"
              height="732"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="12" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.290196 0 0 0 0 0.4 0 0 0 0 0.203922 0 0 0 0.05 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1_3057"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1_3057"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};
