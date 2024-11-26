export interface Product {
  thumbnail: string | undefined;
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  category: string;
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  carts: Product[];
  loading: boolean;
  error: string | null;
}