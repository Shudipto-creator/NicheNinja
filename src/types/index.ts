// User types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// Authentication types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Store types
export interface Store {
  id: string;
  name: string;
  slug: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

// Product types
export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  stock: number;
  isDigital: boolean;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Order types
export interface Order {
  id: string;
  storeId: string;
  productId: string;
  customerId: string;
  customerEmail: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  amount: number;
  createdAt: string;
  updatedAt: string;
}

// Analytics types
export interface SalesSummary {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
}

export interface SalesTimeframe {
  daily: SalesSummary;
  weekly: SalesSummary;
  monthly: SalesSummary;
}

// Mock data types
export interface MockData {
  users: User[];
  stores: Store[];
  products: Product[];
  orders: Order[];
}