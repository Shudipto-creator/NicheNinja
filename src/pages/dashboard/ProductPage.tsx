import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/authContext';
import { mockData } from '@/lib/mockData';

const ProductPage: React.FC = () => {
  const { user } = useAuth();
  const products = mockData.products.filter(p => 
    mockData.stores.some(s => s.ownerId === user?.id && s.id === p.storeId)
  );

  return (
    <>
      <Helmet>
        <title>Products | NicheNinja</title>
      </Helmet>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 sm:ml-64">
          <main className="container p-4 md:p-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold">Products</h1>
                <p className="text-muted-foreground">
                  Manage your product listings and inventory.
                </p>
              </div>
              <Button asChild>
                <Link to="/dashboard/product/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} isManageable />
              ))}
              {products.length === 0 && (
                <div className="col-span-full rounded-lg border border-dashed p-8 text-center">
                  <h3 className="mb-2 text-lg font-semibold">No products yet</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Get started by creating your first product listing.
                  </p>
                  <Button asChild>
                    <Link to="/dashboard/product/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductPage;