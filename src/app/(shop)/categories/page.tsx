"use client"

import { useEffect, useState } from "react"
import { medusaClient } from "@/lib/medusa"
import { MedusaProduct } from "@/types/medusa"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Books",
  "Toys",
  "Food"
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-serif mb-8">All Categories</h1>
      <p>Coming soon...</p>
    </div>
  )
} 