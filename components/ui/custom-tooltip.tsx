import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomTooltipProps {
  children: React.ReactNode;
  text: string;
}

const CustomTooltip = ({ children, text }: CustomTooltipProps) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent>{text}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default CustomTooltip;
