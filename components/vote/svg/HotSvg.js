import * as React from "react";

const HotSvg = () => (
  <svg width={81} height={85} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#a)">
      <mask
        id="c"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={32}
        y={24}
        width={17}
        height={21}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M42.73 24.858a.84.84 0 0 0-1.352.234l-2.628 5.521-2.693-1.79a.84.84 0 0 0-1.165.235c-1.373 2.068-2.59 4.568-2.59 6.992a8.19 8.19 0 1 0 16.38 0c0-4.935-3.411-8.66-5.952-11.192Z"
          fill="url(#b)"
        />
      </mask>
      <g mask="url(#c)">
        <g filter="url(#d)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.73 24.858a.84.84 0 0 0-1.352.234l-2.628 5.521-2.693-1.79a.84.84 0 0 0-1.165.235c-1.373 2.068-2.59 4.568-2.59 6.992a8.19 8.19 0 1 0 16.38 0c0-4.935-3.411-8.66-5.952-11.192Z"
            fill="url(#e)"
          />
        </g>
        <g
          style={{
            mixBlendMode: "multiply",
          }}
          filter="url(#f)"
        >
          <path
            d="M39.46 31.154a.84.84 0 0 1-.397-1.12l2.424-5.087a1.178 1.178 0 1 1 2.06 1.137l-3.015 4.761a.84.84 0 0 1-1.072.31Z"
            fill="url(#g)"
          />
        </g>
      </g>
    </g>
    <defs>
      <radialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 -23.24 19.396 0 40.5 41.72)"
      >
        <stop stopColor="#FA5C00" />
        <stop offset={1} stopColor="#FAB400" />
      </radialGradient>
      <radialGradient
        id="e"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 -21.0281 17.55 0 40.492 40.501)"
      >
        <stop stopColor="#FA5C00" />
        <stop offset={1} stopColor="#FFB800" />
      </radialGradient>
      <radialGradient
        id="g"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(-154.525 24.308 9.27) scale(2.72241 8.50731)"
      >
        <stop stopColor="#FA5C00" />
        <stop offset={1} stopColor="#FFB800" />
      </radialGradient>
      <filter
        id="a"
        x={0.302}
        y={0.613}
        width={80.38}
        height={83.627}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={8} />
        <feGaussianBlur stdDeviation={16} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.980392 0 0 0 0 0.360784 0 0 0 0 0 0 0 0 0.48 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3776_24427"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_3776_24427"
          result="shape"
        />
      </filter>
      <filter
        id="d"
        x={32.302}
        y={20.613}
        width={16.38}
        height={23.627}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={-4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend in2="shape" result="effect1_innerShadow_3776_24427" />
      </filter>
      <filter
        id="f"
        x={34.98}
        y={20.275}
        width={12.749}
        height={14.961}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={2}
          result="effect1_foregroundBlur_3776_24427"
        />
      </filter>
    </defs>
  </svg>
);

export default HotSvg;
