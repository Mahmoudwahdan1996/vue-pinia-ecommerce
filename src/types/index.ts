export type Categ = {
  id: number;
  name: string;
  image: string;
};

export interface Filter {
  Clothes: boolean;
  Electronics: boolean;
  Furniture: boolean;
  Shoes: boolean;
  Others: boolean;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
  amount?: number;
}

export type PriceRange = {
  maxPrice: number;
  minPrice: number;
};

export type Dir = "next" | "prev";

export interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  amount: number;
  description: string;
  category: string;
}

export type IncOrDec = "inc" | "dec";

export type Auth = {
  email: string;
  password: string;
};

export interface Authentication extends Auth {
  mode: "signup" | "login";
}
