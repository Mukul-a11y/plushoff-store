"use client"

import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { Footer } from "@/components/layout/footer"
import { CategorySection } from "@/components/home/category-section"
import { BannerSection } from "@/components/home/banner-section"
import { ProductsSection } from "@/components/home/products-section"
import { CustomerStories } from "@/components/home/customer-stories"

export function HomeContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="pb-16 md:pb-0 flex-1">
        <CategorySection />
        <BannerSection />
        <ProductsSection />
        <CustomerStories />
        <MobileNavigation />
      </main>
      <Footer />
    </div>
  )
}