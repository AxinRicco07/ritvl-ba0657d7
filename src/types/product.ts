import { Review } from "./reviews";


export type Price = {
    mrp: number;
    sp: number;
    discount: number;
}


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
    productType: 'salt' | string;
    inStock: boolean;
    fewStocks: number;
  };
  