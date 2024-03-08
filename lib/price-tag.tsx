import { formatPrice } from "./format-price";

interface PriceTag {
  price: number;
  classname?: string;
}

export function priceTag({ price, classname }: PriceTag) {
  return <span className={`${classname}`}>{formatPrice(price)}</span>;
}
