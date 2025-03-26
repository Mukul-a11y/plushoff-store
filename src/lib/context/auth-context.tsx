'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { medusaClient } from '@/lib/config';
import { Customer } from '@medusajs/medusa';

interface AuthContextType {
  customer: Customer | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchCustomer: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomer = async () => {
    try {
      const { customer } = await medusaClient.customers.retrieve();
      setCustomer(customer);
      return customer;
    } catch (error) {
      setCustomer(null);
      return null;
    }
  };

  useEffect(() => {
    fetchCustomer().finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await medusaClient.auth.authenticate({
        email,
        password,
      });
      const customer = await fetchCustomer();
      if (!customer) {
        throw new Error('Failed to fetch customer after login');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await medusaClient.auth.deleteSession();
      setCustomer(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const refetchCustomer = async () => {
    try {
      await fetchCustomer();
    } catch (error) {
      console.error('Error refetching customer:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        isLoading,
        isAuthenticated: !!customer,
        login,
        logout,
        refetchCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 