import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Thumbs } from "swiper/modules"
import Image from "next/image"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"

interface ProductCarouselProps {
  images: {
    url: string
    alt: string
  }[]
}

export function ProductCarousel({ images }: ProductCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  return (
    <div className="flex flex-col gap-4">
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation
        pagination={{ clickable: true }}
        className="aspect-square w-full rounded-lg bg-gray-100"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        className="h-20"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full cursor-pointer rounded-lg bg-gray-100">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 