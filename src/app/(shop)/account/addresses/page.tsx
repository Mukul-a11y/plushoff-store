'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Loader2, Plus, Star, Home, Trash2, Edit } from 'lucide-react';

interface Address {
  id: string;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country_code: string;
  phone?: string;
  is_default: boolean;
}

export default function AddressesPage() {
  const { customer } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postal_code: '',
    country_code: '',
    phone: '',
    is_default: false,
  });

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/addresses');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setAddresses(data.addresses);
    } catch (err) {
      setError('Failed to fetch addresses');
      console.error('Error fetching addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customer) {
      fetchAddresses();
    }
  }, [customer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/addresses', {
        method: editingAddress ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...(editingAddress && { addressId: editingAddress.id }),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      await fetchAddresses();
      setShowForm(false);
      setEditingAddress(null);
      setFormData({
        first_name: '',
        last_name: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postal_code: '',
        country_code: '',
        phone: '',
        is_default: false,
      });
    } catch (err) {
      console.error('Error saving address:', err);
      setError('Failed to save address');
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      first_name: address.first_name,
      last_name: address.last_name,
      address_1: address.address_1,
      address_2: address.address_2 || '',
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country_code: address.country_code,
      phone: address.phone || '',
      is_default: address.is_default,
    });
    setShowForm(true);
  };

  const handleDelete = async (addressId: string) => {
    try {
      const response = await fetch('/api/addresses', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ addressId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      await fetchAddresses();
    } catch (err) {
      console.error('Error deleting address:', err);
      setError('Failed to delete address');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        <button
          onClick={() => {
            setEditingAddress(null);
            setFormData({
              first_name: '',
              last_name: '',
              address_1: '',
              address_2: '',
              city: '',
              state: '',
              postal_code: '',
              country_code: '',
              phone: '',
              is_default: false,
            });
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Address
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address Line 1</label>
              <input
                type="text"
                value={formData.address_1}
                onChange={(e) => setFormData({ ...formData, address_1: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address Line 2</label>
              <input
                type="text"
                value={formData.address_2}
                onChange={(e) => setFormData({ ...formData, address_2: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <input
                type="text"
                value={formData.postal_code}
                onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country Code</label>
              <input
                type="text"
                value={formData.country_code}
                onChange={(e) => setFormData({ ...formData, country_code: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_default}
                  onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Set as default address</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              {editingAddress ? 'Update Address' : 'Add Address'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingAddress(null);
              }}
              className="px-6 py-2 border rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-6 relative ${
              address.is_default ? 'border-blue-500' : ''
            }`}
          >
            {address.is_default && (
              <div className="absolute top-4 right-4 text-blue-500">
                <Star className="w-5 h-5 fill-current" />
              </div>
            )}
            <div className="flex items-start gap-3 mb-4">
              <Home className="w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">
                  {address.first_name} {address.last_name}
                </p>
                <p className="text-gray-600">{address.address_1}</p>
                {address.address_2 && (
                  <p className="text-gray-600">{address.address_2}</p>
                )}
                <p className="text-gray-600">
                  {address.city}, {address.state} {address.postal_code}
                </p>
                <p className="text-gray-600">{address.country_code}</p>
                {address.phone && (
                  <p className="text-gray-600 mt-2">{address.phone}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(address)}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 