export interface Product {
  id: number;
  description: string;
  imageUrl: string;
  stock: number;
  price: number;
  onSale: boolean;
  salePrice: number;
  name: string | null;
  createdAt: Date;
  updateAt: Date | null;
}
