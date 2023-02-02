import * as React from "react";

const HoverOnNotSvg = (props) => (
  <svg
    width={72}
    height={72}
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_b_1392_5302)">
      <g clipPath="url(#clip0_1392_5302)">
        <rect
          x={0.0117188}
          width={72}
          height={72}
          rx={36}
          fill="black"
          fillOpacity={0.4}
        />
        <g filter="url(#filter1_dii_1392_5302)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.1755 20.5072C25.3945 19.7261 24.1281 19.7261 23.3471 20.5072L20.5186 23.3356C19.7376 24.1166 19.7376 25.383 20.5186 26.164L30.3544 35.9998L20.5186 45.8356C19.7376 46.6167 19.7376 47.883 20.5186 48.664L23.3471 51.4925C24.1281 52.2735 25.3945 52.2735 26.1755 51.4925L36.0113 41.6567L45.8471 51.4925C46.6281 52.2735 47.8945 52.2735 48.6755 51.4925L51.5039 48.664C52.285 47.883 52.285 46.6166 51.5039 45.8356L41.6681 35.9998L51.5039 26.164C52.285 25.383 52.285 24.1166 51.5039 23.3356L48.6755 20.5072C47.8945 19.7261 46.6281 19.7261 45.8471 20.5072L36.0113 30.343L26.1755 20.5072Z"
            fill="url(#paint0_radial_1392_5302)"
            shapeRendering="crispEdges"
          />
        </g>
      </g>
      <rect
        x={0.511719}
        y={0.5}
        width={71}
        height={71}
        rx={35.5}
        stroke="url(#paint1_linear_1392_5302)"
        strokeOpacity={0.2}
      />
    </g>
    <defs>
      <filter
        id="filter0_b_1392_5302"
        x={-15.9883}
        y={-16}
        width={104}
        height={104}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={8} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_1392_5302"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_1392_5302"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_dii_1392_5302"
        x={-12.0671}
        y={-4.07861}
        width={96.157}
        height={96.1567}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={8} />
        <feGaussianBlur stdDeviation={16} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.909804 0 0 0 0 0.0745098 0 0 0 0 0.164706 0 0 0 0.48 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1392_5302"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1392_5302"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={-2} />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_1392_5302"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow_1392_5302"
          result="effect3_innerShadow_1392_5302"
        />
      </filter>
      <radialGradient
        id="paint0_radial_1392_5302"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(36.0116 30.4998) rotate(90) scale(62)"
      >
        <stop stopColor="#E8132A" />
        <stop offset={1} stopColor="#E8132A" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint1_linear_1392_5302"
        x1={36.0117}
        y1={0}
        x2={36.0117}
        y2={72}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} />
      </linearGradient>
      <clipPath id="clip0_1392_5302">
        <rect x={0.0117188} width={72} height={72} rx={36} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default HoverOnNotSvg;