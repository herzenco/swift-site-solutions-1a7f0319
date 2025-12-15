import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]">
      {/* Phone bezel */}
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-primary/20">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="relative bg-white rounded-[2.25rem] overflow-hidden h-[500px] sm:h-[580px]">
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-white z-10 flex items-center justify-between px-6 pt-2">
            <span className="text-[10px] text-gray-900 font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 flex gap-[1px]">
                <div className="w-[3px] h-full bg-gray-900 rounded-sm" />
                <div className="w-[3px] h-full bg-gray-900 rounded-sm" />
                <div className="w-[3px] h-full bg-gray-900 rounded-sm" />
                <div className="w-[3px] h-[60%] bg-gray-400 rounded-sm self-end" />
              </div>
              <div className="w-4 h-2 border border-gray-900 rounded-sm relative">
                <div className="absolute inset-[1px] right-[3px] bg-gray-900 rounded-[1px]" />
                <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-[2px] h-1 bg-gray-900 rounded-r-sm" />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="h-full pt-8 overflow-hidden">
            {children}
          </div>
        </div>
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-600 rounded-full" />
      </div>
    </div>
  );
};
