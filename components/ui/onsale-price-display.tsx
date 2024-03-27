import { formatPrice } from "@/lib/format-price";
import React from "react";

interface OnSalePriceDisplayProps {
  originalPrice: number;
  salePrice: number;
}

const OnSalePriceDisplay = ({
  originalPrice,
  salePrice,
}: OnSalePriceDisplayProps) => {
  return (
    <div>
      {" "}
      {salePrice ? (
        <div className="flex flex-row gap-2 text-md font-bold py-2">
          <p className="  text-red-800">{formatPrice(salePrice)}</p>
          <div className="relative">
            <p className="  text-gray-400 font-normal ">
              {formatPrice(originalPrice)}
            </p>
            <hr className="absolute border-solid border-1 border-gray-400 top-1/2 w-full"></hr>
          </div>
        </div>
      ) : (
        <p className="pt-2 font-bold">{formatPrice(originalPrice)}</p>
      )}
    </div>
  );
};

export default OnSalePriceDisplay;
