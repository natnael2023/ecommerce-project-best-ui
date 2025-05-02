import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, Eye, ShoppingCart, Zap } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const calculateDiscount = () => {
    if (product?.salePrice > 0) {
      return Math.round(((product.price - product.salePrice) / product.price) * 100);
    }
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm mx-auto group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl">
        {/* Image Container */}
        <div className="relative">
          {isLoading && (
            <Skeleton className="w-full h-[300px] rounded-t-lg" />
          )}
          
          <img
            src={product?.image}
            alt={product?.title}
            className={`w-full h-[300px] object-cover rounded-t-lg transition-opacity duration-300 ${
              isLoading ? "opacity-0 absolute" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
          />

          {/* Top Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {product?.totalStock === 0 ? (
              <Badge className="bg-red-500 hover:bg-red-600 gap-1">
                <Zap size={14} /> Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="bg-amber-500 hover:bg-amber-600 gap-1">
                <Zap size={14} /> {product?.totalStock} Left
              </Badge>
            ) : null}
            
            {product?.salePrice > 0 && (
              <Badge className="bg-green-500 hover:bg-green-600">
                {calculateDiscount()}% OFF
              </Badge>
            )}
          </div>

          {/* Quick Actions Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleGetProductDetails(product?._id)}
                  className="rounded-full"
                >
                  <Eye size={16} className="mr-2" /> Quick View
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className="rounded-full"
                >
                  <Heart
                    size={16}
                    className={`mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                  />
                  Wishlist
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Content */}
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-bold line-clamp-2">{product?.title}</h2>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-1 hover:text-red-500 transition-colors"
            >
              <Heart
                size={20}
                className={`${isLiked ? "fill-red-500 text-red-500" : ""}`}
              />
            </button>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {product?.salePrice > 0 ? (
              <>
                <span className="text-lg font-bold text-green-600">
                  Brr{product?.salePrice}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  Brr{product?.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">Brr{product?.price}</span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} filled={i < (product?.rating || 0)} />
            ))}
            <span className="text-muted-foreground ml-1">
              ({product?.reviews?.length || 0})
            </span>
          </div>
        </CardContent>

        {/* Add to Cart Footer */}
        <CardFooter>
          {product?.totalStock === 0 ? (
            <Button className="w-full" variant="secondary" disabled>
              <ShoppingCart className="mr-2 h-4 w-4" /> Out of Stock
            </Button>
          ) : (
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                className="w-full transition-all"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Star Rating Component
const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? "fill-current" : "fill-transparent"}`}
    stroke="currentColor"
    strokeWidth="1"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default ShoppingProductTile;