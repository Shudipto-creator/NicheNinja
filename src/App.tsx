import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/lib/authContext';
import { ThemeProvider } from '@/hooks/useTheme';
import { Toaster } from '@/components/ui/toaster';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import AIChatbot from '@/components/chat/AIChatbot';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ProductPage from '@/pages/dashboard/ProductPage';
import OrdersPage from '@/pages/dashboard/OrdersPage';
import PaymentsPage from '@/pages/dashboard/PaymentsPage';
import AnalyticsPage from '@/pages/dashboard/AnalyticsPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

// Router configuration with future flags
const routerOptions = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <Helmet>
            <title>NicheNinja - One-Product eCommerce Platform</title>
            <meta
              name="description"
              content="Create focused, one-product online stores with NicheNinja. Perfect for digital products, services, or physical items."
            />
            <html lang="en" />
          </Helmet>
          <Router {...routerOptions}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/product/*"
                element={
                  <ProtectedRoute>
                    <ProductPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/orders"
                element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/payments"
                element={
                  <ProtectedRoute>
                    <PaymentsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/analytics"
                element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <AIChatbot />
            <Toaster />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;