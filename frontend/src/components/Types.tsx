// product
export interface Product {
  id: string;
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
  reviewQuantity: number;
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
  productLenght?: number;
  total?: number;
  skip?: number;
  limit?: number;
}

export interface CategoriesTypes {
  categories: string[];
}

//////cart
export interface CardProps {
  id: string;
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
////// nav cart
export interface CartProduct {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  id: string;
  quantity: number;
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

//////////////Review

export interface Review {
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
}

export interface ReviewsResponse {
  status: string;
  reviews: Review[];
}

///////////////Wishlist

export interface WishlistItem {
  product: Product;
  _id: string;
  id: string;
}

export interface Wishlist {
  _id: string;
  userId: string;
  products: WishlistItem[];
  __v: number;
  id: string;
}

export interface WishlistResponse {
  status?: string;
  wishlist: Wishlist;
}
