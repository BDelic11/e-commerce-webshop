import React from "react";
import Image from "next/image";

//types
import { Product } from "@/types/product";

//images
import testImage from "@/public/images/primjer patuljka jpeg.jpg";

//components
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format-price";

interface ProductCardProps {
  product?: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="relative bg-white flex flex-col justify-center align-baseline w-full h-80 rounded-xl ">
      <Image
        className="relative w-full h-2/3 object-cover "
        src={testImage}
        width={28}
        height={28}
        alt="product image"
      />
      <div className="absolute top-0 right-0 ">
        {product?.onSale ? (
          <Badge
            className="text-red-800 bg-white border-red-800"
            variant="outline"
          >
            On Sale
          </Badge>
        ) : (
          <></>
        )}
      </div>

      <div className="w-full h-24 pt-2 pb-2 px-3">
        <h3 className=" text-lg font-medium ">{product?.name}</h3>

        <p className=" text-sm text-gray-500">{product?.description}</p>
        <div className="text-md font-bold py-2">
          {product?.salePrice ? (
            <div className="flex flex-row gap-2 text-md font-bold py-2">
              <p className="  text-red-800">
                {formatPrice(product?.salePrice)}
              </p>
              <p className=" relative text-gray-400 font-normal ">
                {formatPrice(product?.price)}
                <hr className="absolute border-solid border-1 border-gray-400 top-1/2 w-full"></hr>
              </p>
            </div>
          ) : (
            <p className="">{formatPrice(product?.price)}</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
