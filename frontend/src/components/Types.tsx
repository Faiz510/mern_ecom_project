// product
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  avgRating: number;
  stock: number;
  brand: string;
  category: string[];
  thumbnail: string;
  images: string[];
  reviews?: {
    _id: string;
    product: string;
    userId: {
      _id: string;
      username: string;
      email: string;
    };
    review: string;
    rating: number;
    createdAt: string;
    __v: number;
    id: string;
  }[];
}

// products
export interface ProductData {
  products: Product[];
  productLenght: number;
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
  avgRating: number;
  category: string[];
  cardList: boolean;
  description: string;
}

export interface CategoriesTypes {
  categories: string[];
}

export interface CartProduct {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  id: string;
}

export interface CartProductTypes {
  product: CartProduct;
  quantity: number;
  _id: string;
  total: number;
  id: string;
}

export interface CartTypes {
  _id: string;
  userId: string;
  products: CartProductTypes[];
  totalAmount: number;
  totalProducts: number;
  totalQuantity: number;
  id: string;
}

export interface CartApiResponse {
  status?: string;
  cart: CartTypes;
}
