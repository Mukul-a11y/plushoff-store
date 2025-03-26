'use client';

import { Product } from "@medusajs/medusa";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/context/auth-context";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { customer } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!customer) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/wishlist', {
        method: isInWishlist ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (response.ok) {
        setIsInWishlist(!isInWishlist);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div className="relative aspect-square mb-2">
        <Image
          src={product.thumbnail || "/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover rounded-lg"
        />
        {customer && (
          <button
            onClick={toggleWishlist}
            disabled={isLoading}
            className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors ${
              isInWishlist ? 'text-red-500' : 'text-gray-600'
            }`}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold group-hover:underline">
          {product.title}
        </h3>
        <p className="text-gray-700">
          {formatPrice(product.variants[0].prices[0].amount)}
        </p>
      </div>
    </Link>
  );
} 