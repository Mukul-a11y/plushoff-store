import mixpanel from 'mixpanel-browser'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

// Initialize Mixpanel only if token exists
if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN)
}

// Initialize Google Analytics
declare global {
  interface Window {
    gtag?: {
      (command: 'config', targetId: string, config?: Record<string, unknown>): void;
      (command: 'event', action: string, params?: Record<string, unknown>): void;
      (command: 'set', params: Record<string, unknown>): void;
    }
  }
}

export const pageview = (url: string) => {
  try {
    // Track in Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag && GA_ID) {
      window.gtag('config', GA_ID, {
        page_path: url,
      })
    }
    
    // Track in Mixpanel if initialized
    if (MIXPANEL_TOKEN) {
      mixpanel.track('Page View', { url })
    }
  } catch (error) {
    console.error('Error tracking pageview:', error)
  }
}

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  try {
    // Track in Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, properties)
    }
    
    // Track in Mixpanel if initialized
    if (MIXPANEL_TOKEN) {
      mixpanel.track(eventName, properties)
    }
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

export const identifyUser = (userId: string, userProperties?: Record<string, unknown>) => {
  try {
    // Set user ID in Mixpanel if initialized
    if (MIXPANEL_TOKEN) {
      mixpanel.identify(userId)
      if (userProperties) {
        mixpanel.people.set(userProperties)
      }
    }

    // Set user ID in Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', { user_id: userId })
    }
  } catch (error) {
    console.error('Error identifying user:', error)
  }
}

export const useAnalytics = () => {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      pageview(pathname)
    }
  }, [pathname])

  return {
    trackEvent,
    identifyUser,
  }
}

// Common analytics events
export const AnalyticsEvents = {
  // User events
  USER_SIGNUP: 'User Signup',
  USER_LOGIN: 'User Login',
  USER_LOGOUT: 'User Logout',
  
  // Product events
  PRODUCT_VIEW: 'Product View',
  PRODUCT_SEARCH: 'Product Search',
  ADD_TO_CART: 'Add to Cart',
  REMOVE_FROM_CART: 'Remove from Cart',
  
  // Wishlist events
  ADD_TO_WISHLIST: 'Add to Wishlist',
  REMOVE_FROM_WISHLIST: 'Remove from Wishlist',
  
  // Checkout events
  BEGIN_CHECKOUT: 'Begin Checkout',
  ADD_SHIPPING_INFO: 'Add Shipping Info',
  ADD_PAYMENT_INFO: 'Add Payment Info',
  PURCHASE: 'Purchase',
  
  // Review events
  WRITE_REVIEW: 'Write Review',
  
  // Error events
  ERROR_OCCURRED: 'Error Occurred',
  
  // Performance events
  PAGE_LOAD: 'Page Load',
  API_REQUEST: 'API Request',
} as const 