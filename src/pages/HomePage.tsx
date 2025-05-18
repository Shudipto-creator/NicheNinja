import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Zap, Gift, Shield, BarChart4 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    One Product. <br />
                    <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                      One Focus.
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Create a focused one-product store in minutes. NicheNinja helps you sell with
                    maximum conversion and zero distractions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="gap-1">
                    <Link to="/register">
                      Get Started
                      <Zap className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/features">View Features</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg"
                  alt="NicheNinja interface"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Optimized for Conversion
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our one-product store templates are designed with conversion in mind, focusing
                  visitors on the only action that matters: the purchase.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Simple Store Setup</h3>
                <p className="text-muted-foreground">
                  Create your store in minutes with our intuitive dashboard and product editor.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Digital & Physical Products</h3>
                <p className="text-muted-foreground">
                  Sell any type of product with automatic delivery for digital goods.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Accept payments securely with PayPal integration and optional Stripe support.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart4 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Track your sales, customers, and conversion rates with real-time analytics.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Mobile Optimized</h3>
                <p className="text-muted-foreground">
                  Every store looks amazing on all devices, ensuring you never miss a sale.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Order Management</h3>
                <p className="text-muted-foreground">
                  Manage all your orders in one place with real-time notifications and updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to launch your product?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Start selling today with NicheNinja. No complicated setup, no distractions.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link to="/register">Create Your Store</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;