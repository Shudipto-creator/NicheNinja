import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentOrders from '@/components/dashboard/RecentOrders';
import SalesChart from '@/components/dashboard/SalesChart';
import OrdersChart from '@/components/dashboard/OrdersChart';
import { getMockOrdersByStore } from '@/lib/mockData';
import ProductCard from '@/components/product/ProductCard';
import { mockData } from '@/lib/mockData';

const DashboardPage: React.FC = () => {
  // For demo purposes, we'll use the mock store and its orders
  const storeId = 'store_1';
  const orders = getMockOrdersByStore(storeId);
  const product = mockData.products.find(p => p.storeId === storeId);

  return (
    <>
      <Helmet>
        <title>Dashboard | NicheNinja</title>
      </Helmet>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 sm:ml-64">
          <main className="container p-4 md:p-6">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back. Here's an overview of your store.
              </p>
            </div>

            <div className="mb-8">
              <DashboardStats orders={orders} />
            </div>

            <div className="mb-8 grid gap-6 md:grid-cols-6">
              <SalesChart />
              <OrdersChart />
            </div>

            {product && (
              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Product</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <ProductCard product={product} isManageable />
                </div>
              </div>
            )}

            <div className="mb-8">
              <RecentOrders orders={orders} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;