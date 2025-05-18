import { MockData, Order, Product, Store, User } from "@/types";

// Mock user data
const users: User[] = [
  {
    id: "user_1",
    email: "demo@nicheninja.com",
    name: "Demo User",
    createdAt: new Date(2025, 0, 1).toISOString(),
  },
];

// Mock store data
const stores: Store[] = [
  {
    id: "store_1",
    name: "EcoBottle",
    slug: "ecobottle",
    description: "Premium sustainable water bottles",
    ownerId: "user_1",
    createdAt: new Date(2025, 0, 5).toISOString(),
    updatedAt: new Date(2025, 2, 15).toISOString(),
  },
];

// Mock product data
const products: Product[] = [
  {
    id: "product_1",
    storeId: "store_1",
    name: "EcoBottle Pro",
    description:
      "The EcoBottle Pro is a premium thermal water bottle designed to keep your drinks cold for 24 hours or hot for 12 hours. Made from sustainable materials and built to last a lifetime.",
    price: 39.99,
    images: [
      "https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg",
      "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg",
    ],
    features: [
      "Double-wall vacuum insulation",
      "100% recyclable stainless steel",
      "Leak-proof design",
      "24h cold / 12h hot retention",
      "Lifetime warranty",
    ],
    stock: 150,
    isDigital: false,
    createdAt: new Date(2025, 0, 10).toISOString(),
    updatedAt: new Date(2025, 2, 15).toISOString(),
  },
];

// Mock order data with a variety of statuses
const orders: Order[] = [
  {
    id: "order_1",
    storeId: "store_1",
    productId: "product_1",
    customerId: "customer_1",
    customerEmail: "customer@example.com",
    status: "completed",
    paymentStatus: "paid",
    amount: 39.99,
    createdAt: new Date(2025, 2, 10).toISOString(),
    updatedAt: new Date(2025, 2, 11).toISOString(),
  },
  {
    id: "order_2",
    storeId: "store_1",
    productId: "product_1",
    customerId: "customer_2",
    customerEmail: "customer2@example.com",
    status: "processing",
    paymentStatus: "paid",
    amount: 39.99,
    createdAt: new Date(2025, 2, 15).toISOString(),
    updatedAt: new Date(2025, 2, 15).toISOString(),
  },
  {
    id: "order_3",
    storeId: "store_1",
    productId: "product_1",
    customerId: "customer_3",
    customerEmail: "customer3@example.com",
    status: "pending",
    paymentStatus: "pending",
    amount: 39.99,
    createdAt: new Date(2025, 2, 18).toISOString(),
    updatedAt: new Date(2025, 2, 18).toISOString(),
  },
];

// Combined mock data
export const mockData: MockData = {
  users,
  stores,
  products,
  orders,
};

// Helper functions to retrieve and filter mock data
export function getMockStore(storeId: string): Store | undefined {
  return stores.find((store) => store.id === storeId);
}

export function getMockProduct(productId: string): Product | undefined {
  return products.find((product) => product.id === productId);
}

export function getMockOrdersByStore(storeId: string): Order[] {
  return orders.filter((order) => order.storeId === storeId);
}

// Convert to Chart data
export function getOrdersChartData() {
  const today = new Date();
  
  // Generate data for the last 7 days
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });
  
  // Generate random sales data
  const data = Array.from({ length: 7 }, () => 
    Math.floor(Math.random() * 5) + 1
  );
  
  return { labels, data };
}

export function getSalesChartData() {
  const today = new Date();
  
  // Generate data for the last 7 days
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });
  
  // Generate random sales data
  const data = Array.from({ length: 7 }, () => 
    Math.floor(Math.random() * 200) + 50
  );
  
  return { labels, data };
}