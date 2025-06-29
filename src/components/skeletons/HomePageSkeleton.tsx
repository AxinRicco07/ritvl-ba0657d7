import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageSkeleton() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-[80vh] overflow-hidden flex items-center bg-blue-50/50">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-8">
          {/* Left Column: Text Content */}
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-6 w-full mt-4" />
            <Skeleton className="h-6 w-5/6" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-36 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>

          {/* Right Column: Hero Carousel */}
          <div>
            <Skeleton className="h-[50vh] w-full rounded-lg" />
          </div>
        </div>
      </section>

      <hr />

      {/* Featured Products Skeleton */}
      <section className="py-12 px-4 md:py-16 bg-secondary/10">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
      </section>

      <hr />

      {/* Bestselling Products Skeleton */}
      <section className="py-12 px-4 md:py-16 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
      </section>

      <hr />

      {/* Why Choose Us Skeleton */}
      <section className="py-12 px-4 md:py-16 bg-blue-50/50">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-full max-w-2xl" />
            <Skeleton className="h-5 w-4/5 max-w-2xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Skeleton className="h-56 w-full rounded-lg" />
            <Skeleton className="h-56 w-full rounded-lg" />
            <Skeleton className="h-56 w-full rounded-lg" />
            <Skeleton className="h-56 w-full rounded-lg" />
          </div>
        </div>
      </section>

      <hr />

      {/* Collections Skeleton */}
      <section className="py-12 px-4 md:py-16">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </section>

      <hr />

      {/* Testimonials Skeleton */}
      <section className="py-12 px-4 md:py-16 bg-blue-50/50">
        <div className="container max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <Skeleton className="h-8 w-72" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </section>

      <hr />

      {/* Newsletter Skeleton */}
      <section className="py-12 px-4 md:py-16 bg-white">
        <div className="container max-w-7xl mx-auto text-center flex flex-col items-center">
          <div className="space-y-4 max-w-xl w-full mb-8">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4 mx-auto" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Skeleton className="h-12 flex-grow" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </section>
    </main>
  );
}