export enum ProductCategories {
  PATULJAK = "PATULJAK",
  VIJENAC = "VIJENAC",
  OSTALO = "OSTALO",
}

// export interface AdminProduct {
//   id: number;
//   name: string;
//   category: ProductCategories;
//   description: string;
//   image: string;
// }

export interface Product {
  id: string;
  name: string;
  category: ProductCategories;
  description: string;
  image: string;
  price: number;
  onSale: boolean;
  salePercentage?: number;
  salePrice: number;
  saleStart: Date;
  saleEnd: Date;
  stock: number;
  createdAt: Date;
  updateAt: Date;
  // reviews: Review[];
  // orderItems: OrderItem[];
  // wishlistItems: WishlistItem[];
}

export interface ProductInProductPage {
  id: number;
  name: string | null;
  description: string;
  imageUrl: string;
  stock: number;
  price: number;
  onSale: boolean;
  salePrice: number;
  createdAt: Date;
  updateAt: Date | null;
}
