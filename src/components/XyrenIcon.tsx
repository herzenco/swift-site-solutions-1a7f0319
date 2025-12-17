import * as React from "react";

export interface XyrenIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const XyrenIcon = React.forwardRef<SVGSVGElement, XyrenIconProps>(
  ({ className, size = 24, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M512,256c0,141.375-114.625,256-256,256c106.031,0,192-85.969,192-192s-85.969-192-192-192S64,213.969,64,320s85.969,192,192,192C114.625,512,0,397.375,0,256S114.625,0,256,0S512,114.625,512,256z M256,256c-70.688,0-128,57.313-128,128c0,66.281,50.563,120.156,115.094,126.688C213.938,504.719,192,478.938,192,448c0-35.344,28.656-64,64-64s64,28.656,64,64c0,30.938-21.938,56.719-51.094,62.688C333.438,504.156,384,450.281,384,384C384,313.313,326.688,256,256,256z" />
      </svg>
    );
  },
);

XyrenIcon.displayName = "XyrenIcon";
