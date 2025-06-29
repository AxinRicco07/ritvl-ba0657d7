import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPageSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-8">
      <div className="flex items-center text-sm mb-6">
        <Skeleton className="h-4 w-20 mr-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Left: Product Images */}
        <div>
          <Skeleton className="aspect-square w-full rounded-lg mb-4" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-md" />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          <Skeleton className="h-8 w-2/3 mb-4" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex gap-2 mb-6">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          <Skeleton className="h-20 w-full mb-8" />

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-24 mb-2" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex space-x-4 mb-4">
          {["Product Details", "How to Use", "Reviews"].map((tab, i) => (
            <Skeleton key={i} className="h-6 w-24" />
          ))}
        </div>
        <Skeleton className="h-24 w-full mb-4" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-md border p-2 space-y-2 shadow-sm">
              <Skeleton className="aspect-[4/3] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
