"use client"

import Image from "next/image"

const CUSTOMER_STORIES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
    tag: "Excited Customer"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1599842057874-37393e9342df?w=300",
    tag: "Happy Client"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    tag: "Customer"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=300",
    tag: "Happy client ❤"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
    tag: ""
  }
]

export function CustomerStories() {
  return (
    <section className="px-4 mb-16">
      <div className="container mx-auto">
        <h2 className="text-xl font-medium mb-4 text-center">Customer Stories</h2>
        <p className="text-center text-sm mb-8">Look what our customers have to say about their experience with us and our clothing</p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CUSTOMER_STORIES.map((story) => (
            <div key={story.id} className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src={story.image}
                  alt="Customer story"
                  width={300}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              {story.tag && (
                <div className="absolute bottom-2 right-2 bg-white px-2 py-1 text-xs font-medium">
                  {story.tag}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
