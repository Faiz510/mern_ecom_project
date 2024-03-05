// product
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// products
export interface ProductData {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CardProps {
  id: number;
  title: string;
  img: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
  cardList: boolean;
  description: string;
}
