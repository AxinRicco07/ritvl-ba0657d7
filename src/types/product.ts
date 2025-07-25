import { Review } from "./reviews";


export type Price = {
  mrp: number;
  sp: number;
  discount: number;
}

export type HomeProduct = {
  productId: string;
  description: string;
  name: string;
  price: {
    sp: number;
    mrp: number;
    discount: number;
  };
  images: {
    url: string;
    isPrimary: boolean;
    altText?: string | undefined;
  }[];
  ratings: {
    average: number;
    count: number;
  };
};

type ProductType =
  | 'salt'
  | 'mogra'
  | 'lavender'
  | 'rose'
  | 'jasmine'
  | 'lemon grass'
  | 'cinnamon'
  | 'oceanblue'
  | 'geranium';


export type PublicProduct = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  sku: string;
  slug: string;
  price: {
    sp: number;
    mrp: number;
    discount: number;
  };
  images: Array<{
    url: string;
    altText: string;
    isPrimary: boolean;
  }>;
  variants: {
    size: Array<{
      label: string;
      priceModifier: number;
    }>;
    fragranceStrength: string[];
  };
  details: string;
  ingredients: string;
  howToUse: string;
  benefits: string[];
  ratings: {
    average: number;
    count: number;
  };
  reviews: Review[]; // You can replace `any` with a proper Review type if defined
  tags: string[];
  category: {
    name: string;
  };
  relatedProducts: string[];
  productType: ProductType;
  inStock: boolean;
  fewStocks: number;

};

interface ProductImage {
  url: string;
  altText?: string;
  isPrimary?: boolean;
}

interface SizeVariant {
  label: string;
  priceModifier: number;
}


export interface CreateProduct {
  name: string;
  description: string;
  shortDescription: string;
  sku: string;
  slug: string;
  price: {
    sp: number;
    mrp: number;
    discount: number;
  };
  images: ProductImage[];
  variants: {
    size: SizeVariant[];
    fragranceStrength: string[];
  };
  details: string;
  ingredients: string;
  howToUse: string;
  benefits: string[];
  ratings: {
    average: number;
    count: number;
  };
  tags: string[];
  category: {
    name: string;
  };
  relatedProducts: string[];
  packaging: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
  productType: string;
  inventoryId: string;
}


export interface InventoryRecord {
  sku: string;
  quantity: number;
  inStock: boolean;
  fewStocks?: number;
}