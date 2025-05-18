import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  dailyRevenue: { date: string; amount: number }[];
  topProducts: { name: string; sales: number }[];
  customerRetention: number;
}

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;

      try {
        // Fetch store data
        const { data: storeData } = await supabase
          .from('stores')
          .select('id')
          .eq('owner_id', user.id)
          .single();

        if (!storeData) return;

        // Fetch orders for the store
        const { data: orders } = await supabase
          .from('orders')
          .select('*')
          .eq('store_id', storeData.id);

        if (!orders) return;

        // Calculate analytics
        const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
        const totalOrders = orders.length;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Group orders by date for daily revenue
        const dailyRevenue = orders.reduce((acc, order) => {
          const date = format(new Date(order.created_at), 'yyyy-MM-dd');
          const existing = acc.find((item: { date: string; amount: number }) => item.date === date);
          if (existing) {
            existing.amount += order.amount;
          } else {
            acc.push({ date, amount: order.amount });
          }
          return acc;
        }, [] as { date: string; amount: number }[]);

        setAnalyticsData({
          totalRevenue,
          totalOrders,
          averageOrderValue,
          conversionRate: 3.2, // Mock data for now
          dailyRevenue,
          topProducts: [], // To be implemented
          customerRetention: 65, // Mock data for now
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();

    // Set up real-time subscription
    const subscription = supabase
      .channel('analytics_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'orders',
      }, fetchAnalytics)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Analytics | NicheNinja</title>
      </Helmet>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 sm:ml-64">
          <main className="container p-4 md:p-6">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">
                Track your store's performance metrics and insights.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${analyticsData?.totalRevenue.toFixed(2)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.totalOrders}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${analyticsData?.averageOrderValue.toFixed(2)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData?.conversionRate}%
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Over Time</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData?.dailyRevenue}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;