import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/authContext';
import { mockData } from '@/lib/mockData';
import { format } from 'date-fns';

const PaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const orders = mockData.orders.filter(order => 
    mockData.stores.some(store => store.ownerId === user?.id && store.id === order.storeId)
  );

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const pendingPayments = orders.filter(order => order.paymentStatus === 'pending');
  const totalPending = pendingPayments.reduce((sum, order) => sum + order.amount, 0);

  return (
    <>
      <Helmet>
        <title>Payments | NicheNinja</title>
      </Helmet>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 sm:ml-64">
          <main className="container p-4 md:p-6">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold">Payments</h1>
              <p className="text-muted-foreground">
                Manage your payments and transactions.
              </p>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    Lifetime earnings
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalPending.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    {pendingPayments.length} pending transactions
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>
                              {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                            </TableCell>
                            <TableCell className="font-medium">
                              {order.id.slice(0, 8)}
                            </TableCell>
                            <TableCell>{order.customerEmail}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  order.paymentStatus === 'paid'
                                    ? 'default'
                                    : order.paymentStatus === 'pending'
                                    ? 'secondary'
                                    : 'destructive'
                                }
                              >
                                {order.paymentStatus}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              ${order.amount.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No payment history found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
};

export default PaymentsPage;