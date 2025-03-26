'use client';

import { useEffect, useState } from 'react';
import { medusaClient } from '@/lib/config';
import { useAuth } from '@/lib/context/auth-context';
import { Order } from '@medusajs/medusa';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export default function OrderHistory() {
  const { customer } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!customer) return;
        const { orders: customerOrders } = await medusaClient.customers.listOrders();
        setOrders(customerOrders.reverse()); // Show newest orders first
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customer]);

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

  if (!orders.length) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">No Orders Yet</h2>
        <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
        <Link 
          href="/products" 
          className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Order #{order.display_id}
                </h3>
                <p className="text-gray-600">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(order.total)}</p>
                <p className="text-sm capitalize text-gray-600">
                  {order.status}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.unit_price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <Link
                href={`/order/confirmation/${order.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Order Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 