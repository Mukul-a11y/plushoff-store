"use client"

import { DesktopHeader } from "@/components/layout/desktop-header"
import { MobileHeader } from "@/components/layout/mobile-header"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { Footer } from "@/components/layout/footer"
import { CategorySection } from "@/components/home/category-section"
import { BannerSection } from "@/components/home/banner-section"
import { ProductsSection } from "@/components/home/products-section"

export function HomeContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <DesktopHeader />
      <main className="pb-16 md:pb-0 flex-1">
        <MobileHeader />
        <div className="md:hidden">
          <CategorySection />
          <BannerSection />
        </div>
        <div className="hidden md:block">
          <BannerSection />
          <CategorySection />
        </div>
        <ProductsSection />
        <MobileNavigation />
      </main>
      <Footer />
    </div>
  )
} 