
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-serif mb-6">404</h1>
      <h2 className="text-3xl font-medium mb-4">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-lg">
        We're sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link to="/">Return Home</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
