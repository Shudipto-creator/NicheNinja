import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Login | NicheNinja</title>
      </Helmet>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          to="/"
          className="absolute left-4 top-4 flex items-center gap-2 md:left-8 md:top-8"
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="font-bold">NicheNinja</span>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;