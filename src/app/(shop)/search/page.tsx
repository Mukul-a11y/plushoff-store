"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { medusaClient } from "@/lib/medusa"
import Image from "next/image"
import Link from "next/link"
import type { 
  Product, 
  ProductCategory,
  StoreGetProductCategoriesRes,
  StorePostSearchRes 
} from "@medusajs/medusa"
import { formatPrice } from "@/lib/utils"

type SortOption = "price_asc" | "price_desc" | "created_at" | "updated_at"

interface SearchFilters {
  q: string;
  limit: number;
  category_id?: string[];
  price_list?: Array<{
    amount: number;
    operator: 'gt' | 'lt';
  }>;
  order?: string;
}

type SearchProduct = {
  id: string;
  title: string;
  handle: string;
  thumbnail: string | null;
  description: string | null;
  collection?: {
    title: string;
  };
  variants: Array<{
    id: string;
    title: string;
    prices: Array<{
      amount: number;
      currency_code: string;
    }>;
  }>;
}

interface SearchResponse extends StorePostSearchRes {
  hits: SearchProduct[];
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState<SearchProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [sortBy, setSortBy] = useState<SortOption>("created_at")
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 })

  useEffect(() => {
    fetchCategories()
  }, [])

  const searchProducts = useCallback(async () => {
    if (!query) {
      setProducts([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const filters: SearchFilters = {
        q: query,
        limit: 100,
      }

      if (selectedCategory) {
        filters.category_id = [selectedCategory]
      }

      if (priceRange.min > 0 || priceRange.max < 10000) {
        filters.price_list = [{
          amount: priceRange.min * 100,
          operator: "gt"
        }, {
          amount: priceRange.max * 100,
          operator: "lt"
        }]
      }

      switch (sortBy) {
        case "price_asc":
          filters.order = "variants.prices.amount"
          break
        case "price_desc":
          filters.order = "-variants.prices.amount"
          break
        case "created_at":
          filters.order = "-created_at"
          break
        case "updated_at":
          filters.order = "-updated_at"
          break
      }

      const { hits } = (await medusaClient.products.search(filters)) as unknown as SearchResponse
      setProducts(hits)
    } catch (error) {
      console.error("Error searching products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [query, selectedCategory, sortBy, priceRange])

  useEffect(() => {
    searchProducts()
  }, [searchProducts])

  const fetchCategories = async () => {
    try {
      const response = await medusaClient.productCategories.list() as StoreGetProductCategoriesRes
      const { product_categories } = response
      
      if (!product_categories) {
        console.error("No categories found")
        return
      }
      
      setCategories(product_categories)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const handleSearch = (searchQuery: string) => {
    const params = new URLSearchParams()
    if (searchQuery) {
      params.set("q", searchQuery)
    }
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex gap-4">
            <input
              type="search"
              placeholder="Search products..."
              defaultValue={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          {/* Filters */}
          <div className="hidden lg:block">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="sr-only">Min Price</label>
                  <input
                    type="number"
                    min="0"
                    max={priceRange.max}
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    placeholder="Min"
                  />
                </div>
                <div>
                  <label className="sr-only">Max Price</label>
                  <input
                    type="number"
                    min={priceRange.min}
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              >
                <option value="created_at">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="updated_at">Recently Updated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-6 lg:mt-0 lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 rounded-lg" />
                    <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
                    <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : !query ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Enter a search term to find products</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found for "{query}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.handle}`}>
                    <div className="group relative">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                        {product.thumbnail ? (
                          <Image
                            src={product.thumbnail}
                            alt={product.title}
                            fill
                            className="object-cover object-center group-hover:opacity-75"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">{product.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">{product.collection?.title}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{formatPrice(product.variants[0].prices[0].amount)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 