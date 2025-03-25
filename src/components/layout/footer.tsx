"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react"

const FOOTER_LINKS = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Store Locator", href: "/stores" }
  ],
  help: [
    { name: "Customer Service", href: "/customer-service" },
    { name: "Shipping & Returns", href: "/shipping-returns" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "FAQ", href: "/faq" }
  ],
  legal: [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" }
  ]
}

export function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-serif mb-4">Plushoff</h3>
            <p className="text-gray-600 text-sm mb-4">
              Your trusted destination for quality products at unbeatable prices.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://facebook.com" className="text-gray-600 hover:text-black">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" className="text-gray-600 hover:text-black">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-600 hover:text-black">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://youtube.com" className="text-gray-600 hover:text-black">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-medium uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 hover:text-black text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-sm font-medium uppercase mb-4">Help</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 hover:text-black text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-medium uppercase mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5" />
                <a href="mailto:support@plushoff.com" className="text-sm hover:text-black">
                  support@plushoff.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5" />
                <a href="tel:+919876543210" className="text-sm hover:text-black">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Plushoff. All rights reserved.
            </p>
            <ul className="flex items-center gap-6">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 hover:text-black text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 