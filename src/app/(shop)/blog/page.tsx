"use client"

import { Calendar, Clock, User } from "lucide-react"

const blogPosts = [
  {
    title: "The Future of E-commerce: Trends to Watch in 2024",
    excerpt: "Discover the latest trends shaping the future of online shopping, from AI-powered recommendations to sustainable practices.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "/blog/ecommerce-trends.jpg",
    category: "Industry Insights"
  },
  {
    title: "How to Choose the Perfect Product for Your Home",
    excerpt: "A comprehensive guide to selecting products that match your style, needs, and budget for your living space.",
    author: "Michael Chen",
    date: "March 10, 2024",
    readTime: "4 min read",
    image: "/blog/home-products.jpg",
    category: "Shopping Guide"
  },
  {
    title: "Sustainable Shopping: Making Eco-Friendly Choices",
    excerpt: "Learn how to make environmentally conscious decisions while shopping online and reduce your carbon footprint.",
    author: "Emma Davis",
    date: "March 5, 2024",
    readTime: "6 min read",
    image: "/blog/sustainable-shopping.jpg",
    category: "Sustainability"
  },
  {
    title: "The Art of Gift Giving: Tips for Every Occasion",
    excerpt: "Master the art of gift giving with our expert tips and recommendations for various occasions and recipients.",
    author: "David Wilson",
    date: "March 1, 2024",
    readTime: "5 min read",
    image: "/blog/gift-giving.jpg",
    category: "Lifestyle"
  }
]

const categories = [
  "All Posts",
  "Industry Insights",
  "Shopping Guide",
  "Sustainability",
  "Lifestyle",
  "Product Reviews"
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        
        <div className="prose prose-lg mb-12">
          <p className="text-gray-600">
            Discover insights, tips, and trends in the world of online shopping.
            Our blog is your go-to resource for everything related to e-commerce,
            product selection, and sustainable shopping practices.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
                  {post.category}
                </span>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a
                  href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-block text-primary hover:text-primary/80 transition-colors"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  )
} 