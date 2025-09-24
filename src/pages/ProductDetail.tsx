import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Truck, Shield, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/CartContext";
import { formatINRWithPaisa } from "@/utils/currency";
import { PublicProduct } from "@/types/product";
import { fetchPrefix } from "@/utils/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductReviews } from "@/components/ProductReivew";
import { Review } from "@/types/reviews";
import ProductDetailSkeleton from "@/components/skeletons/ProductDetailSkeleton";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [productDetailTab, setProductDetailTab] = useState<
    "Reviews" | "How to Use" | "Product Details"
  >("Product Details");
  // queryClient.clear();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<PublicProduct[]>([]);

  const fetchProductDeatil = async (id: string): Promise<PublicProduct> => {
    console.log("In here bro");
    const res = await fetch(`${fetchPrefix}/api/products/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch home page data");
    }

    return res.json();
  };

  const postReview = async (newReview: Review): Promise<Review> => {
    try {
      const response = await fetch(
        `${fetchPrefix}/api/reviews/new?productId=${id}`,
        {
          method: "POST",
          // mode: 'cors',
          headers: {
            "Content-Type": "application/json",
            // 'Access-Control-Allow-Origin':'*'
          },
          body: JSON.stringify(newReview),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post review");
      }

      return response.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchRelatedProduct = async (
    productId: string
  ): Promise<PublicProduct> => {
    const response = await fetch(`${fetchPrefix}/api/products/${productId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch related product");
    }
    return response.json();
  };
  console.log("Product id", id);

  const {
    data: product,
    isLoading: isProductDetailLoading,
    isError: isProductDetailError,
    error: productDetailError,
  } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: async () => {
      console.log("Id showing ", id);
      return await fetchProductDeatil(id!);
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: !!id,
  });

  console.log(isProductDetailError, isProductDetailLoading);

  const {
    mutate: addReview,
    isError: isAddReviewError,
    error: addReviewError,
  } = useMutation({
    mutationFn: postReview,
    onSuccess: (data: Review) => {
      // Optional: invalidate or update cache
      setReviews((prev) => [data, ...prev]);
    },
    onError(error) {
      console.error(error.message);
      // setReviews()
    },
  });

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images.findIndex((img) => img.isPrimary));
      setReviews(product.reviews);
      const fetchRelatedProducts = product.relatedProducts.map((pId) =>
        fetchRelatedProduct(pId)
      );
      Promise.all(fetchRelatedProducts)
        .then((value) => setRelatedProducts(value))
        .catch((err) => {
          throw new Error(err.message);
        });
    }
  }, [product]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(
      {
        productId: id,
        name: product.name,
        price: product.price,
        image: product.images.filter((img) => img.isPrimary)[0].url,
        sku: product.sku,
      },
      quantity
    );
  };

  if (isProductDetailLoading) return <ProductDetailSkeleton />;

  return (
    <div className="container font-body max-w-7xl mx-auto py-8 px-4 md:px-8">
      <Link
        to="/products"
        className="flex items-center text-sm mb-6 hover:underline hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Images */}
        <div>
          <div className="bg-secondary/30 rounded-lg overflow-hidden mb-4 border border-border">
            <AspectRatio ratio={1} className="bg-secondary/20">
              <img
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].altText}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.length > 1 &&
              product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-md overflow-hidden border ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <AspectRatio ratio={1}>
                    <img
                      src={image.url}
                      alt={image.altText}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </button>
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-sans mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.ratings.average)
                      ? "fill-primary text-primary"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {Math.round(product.ratings.average * 10) / 10} (
              {product.ratings.count} reviews)
            </span>
          </div>

          <div className="flex font-sans items-baseline gap-2 mb-6">
            <span className="text-2xl text-primary font-sans md:text-3xl font-medium">
              {formatINRWithPaisa(product.price.sp * 100)}
            </span>
            {product.price.mrp && (
              <span className="text-sm md:text-base font-sans text-muted-foreground line-through">
                {formatINRWithPaisa(product.price.mrp * 100)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-8">
            {product.shortDescription}
          </p>

          {/* Product Options */}
          <div className="space-y-8">
            {/* Quantity and Add to Cart */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex gap-4">
                <div className="flex items-center border border-input rounded-md overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-2 hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-input">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-2 hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>

                <Button
                  className="gap-2 flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b font-header border-border">
          <div className="flex overflow-x-auto space-x-8">
            {(["Product Details", "How to Use", "Reviews"] as const).map(
              (tab) => (
                <button
                  onClick={() => setProductDetailTab(tab)}
                  className={`py-4 px-1 font-medium  text-lg md:text-xl  ${
                    productDetailTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        <div className="py-8">
          {/* Product Details View */}
          <div
            className={`${
              productDetailTab !== "Product Details" ? "hidden" : ""
            }`}
          >
            <p
              className={`text-muted-foreground text-sm md:text-base leading-loose tracking-wide md:leading-relaxed mb-4 ${
                productDetailTab !== "Product Details" ? "hidden" : ""
              }`}
            >
              {product.description}
            </p>
            <h3 className="font-medium mb-3 mt-6">Benefits</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <p
            className={`text-muted-foreground mb-4 ${
              productDetailTab !== "How to Use" ? "hidden" : ""
            }`}
          >
            {product.howToUse}
          </p>

          <div className={`${productDetailTab !== "Reviews" ? "hidden" : ""}`}>
            <ProductReviews reviews={reviews} onAddReview={addReview} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-xl font-serif mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {relatedProducts.map((item) => (
            <div
              key={item.id}
              className="product-card bg-white rounded-md overflow-hidden border border-border hover:border-primary/30 shadow-sm text-xs"
            >
              <div className="aspect-[4/3] bg-secondary/30 relative overflow-hidden">
                <img
                  src={item.images.find((i) => i.isPrimary)?.url}
                  alt={item.images.find((i) => i.isPrimary)?.altText}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-2">
                <h3 className="font-medium text-[13px] mb-1 hover:text-primary line-clamp-2">
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-semibold">
                    {formatINRWithPaisa(item.price.sp * 100)}
                  </span>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="text-primary border-primary hover:bg-primary/5 px-2 py-1 text-[11px]"
                  >
                    {/* <a href={`/product/${item.id}`}>Buy</a> */}
                    <Link to={`/product/${item.id}`}>Buy</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
