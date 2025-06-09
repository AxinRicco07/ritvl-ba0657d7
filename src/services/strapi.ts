
import axios from 'axios';

// Get the base URL from environment variables
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Create axios instance with default config
const strapiApi = axios.create({
  baseURL: `${STRAPI_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
  },
});

// Types for Strapi responses
export interface StrapiImage {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
  };
}

export interface StrapiProduct {
  id: number;
  attributes: {
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    longDescription?: string;
    ingredients?: string;
    category: string;
    benefits?: string[];
    rating?: number;
    reviewCount?: number;
    featured?: boolean;
    new?: boolean;
    inStock?: boolean;
    fragranceIntensity?: string;
    isGiftSet?: boolean;
    createdAt: string;
    updatedAt: string;
    images?: {
      data: StrapiImage[];
    };
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Product service functions
export const productService = {
  // Get all products with images populated
  async getProducts(filters?: Record<string, any>): Promise<StrapiProduct[]> {
    try {
      const params = new URLSearchParams({
        'populate': '*',
        ...filters,
      });
      
      const response = await strapiApi.get<StrapiResponse<StrapiProduct[]>>(`/products?${params}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  async getProduct(id: string): Promise<StrapiProduct> {
    try {
      const response = await strapiApi.get<StrapiResponse<StrapiProduct>>(`/products/${id}?populate=*`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Create new product
  async createProduct(productData: Partial<StrapiProduct['attributes']>): Promise<StrapiProduct> {
    try {
      const response = await strapiApi.post<StrapiResponse<StrapiProduct>>('/products', {
        data: productData,
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  async updateProduct(id: string, productData: Partial<StrapiProduct['attributes']>): Promise<StrapiProduct> {
    try {
      const response = await strapiApi.put<StrapiResponse<StrapiProduct>>(`/products/${id}`, {
        data: productData,
      });
      return response.data.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    try {
      await strapiApi.delete(`/products/${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

// Contact/Messages service
export const messageService = {
  async sendMessage(messageData: {
    name: string;
    email: string;
    message: string;
    phone?: string;
  }): Promise<void> {
    try {
      await strapiApi.post('/messages', {
        data: messageData,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
};

// Helper function to get full image URL
export const getStrapiImageUrl = (image: StrapiImage): string => {
  const url = image.attributes.url;
  return url.startsWith('http') ? url : `${STRAPI_BASE_URL}${url}`;
};

// Helper function to convert Strapi product to local format
export const convertStrapiProduct = (strapiProduct: StrapiProduct) => {
  const { attributes } = strapiProduct;
  
  return {
    id: strapiProduct.id.toString(),
    name: attributes.name,
    price: attributes.price,
    originalPrice: attributes.originalPrice,
    description: attributes.description,
    longDescription: attributes.longDescription || attributes.description,
    ingredients: attributes.ingredients || '',
    rating: attributes.rating || 4.5,
    reviewCount: attributes.reviewCount || 0,
    images: attributes.images?.data.map(img => getStrapiImageUrl(img)) || ['/placeholder.svg'],
    category: attributes.category,
    benefits: attributes.benefits || [],
    featured: attributes.featured || false,
    new: attributes.new || false,
    inStock: attributes.inStock !== false,
    fragranceIntensity: attributes.fragranceIntensity || 'medium',
    isGiftSet: attributes.isGiftSet || false,
  };
};

export default strapiApi;
