'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Product } from '@medusajs/medusa';
import { Loader2, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { medusaClient } from '@/lib/config';
import Link from 'next/link';

interface WishlistItem {
  id: string;
  product: Product;
}

export default function WishlistPage() {
  const { customer } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setWishlist(data.wishlist);
    } catch (err) {
      setError('Failed to fetch wishlist items');
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customer) {
      fetchWishlist();
    }
  }, [customer]);

  const removeFromWishlist = async (productId: string) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      setWishlist(current => current.filter(item => item.product.id !== productId));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      await medusaClient.carts.lineItems.create(customer?.metadata?.cart_id, {
        variant_id: productId,
        quantity: 1,
      });
      // Optionally remove from wishlist after adding to cart
      await removeFromWishlist(productId);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="text-center py-8">
        <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-semibold mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-6">
          Start adding items to your wishlist while you shop
        </p>
        <Link
          href="/products"
          className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-square">
              <Image
                src={item.product.thumbnail || '/placeholder.png'}
                alt={item.product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.product.title}</h3>
              <p className="text-gray-600 mb-4">{formatPrice(item.product.variants[0].prices[0].amount)}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => addToCart(item.product.variants[0].id)}
                  className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.product.id)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 