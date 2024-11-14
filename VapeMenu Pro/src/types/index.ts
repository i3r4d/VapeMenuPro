export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
  isSaltNic: boolean;
  brand: string;
  nicotineLevel: number;
  ingredients: string[];
  promotion?: {
    type: 'discount' | 'bundle' | 'sale';
    value: number;
    endDate: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface SortOption {
  id: string;
  name: string;
  key: keyof Product | 'promotion';
}

export interface FilterState {
  category: string;
  brand?: string;
  nicotineLevel?: number;
  ingredients?: string[];
  hasPromotion?: boolean;
}