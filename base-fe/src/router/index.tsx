import ClientLayout from "@/layouts/ClientLayout";
import ForgotPass from "@/pages/Auth/ForgotPass";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import VerifyEmail from "@/pages/Auth/VerifyEmail";
import Cart from "@/pages/Cart/Cart";

import CategoryPage from "@/pages/CategoryPage/CategoryPage";
import Checkout from "@/pages/Checkout/Checkout";
import Contact from "@/pages/Contact/Contact";
import HomePage from "@/pages/Homepage/HomePage";
import ProductDetail from "@/pages/Products/ProductDetail";
import Sale from "@/pages/Products/Sale";
import Sneakers from "@/pages/Products/Sneakers";
import Favorites from "@/pages/User/Favortites";
import Orders from "@/pages/User/Order";
import OrderDetail from "@/pages/User/OrderDetail";
import Profile from "@/pages/User/Profile";
import Setting from "@/pages/User/Setting";
import CheckPaymentVNPay from '@/pages/Checkout/CheckPaymentVNPay';
import { createBrowserRouter, Navigate } from "react-router-dom";



export const router = createBrowserRouter([
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/homepage" replace />
      },

      // public routes
      {
        path: 'homepage',
        element: <HomePage />
      },
      {
        path: 'sneakers',
        element: <Sneakers />
      },
      {
        path: 'category/:id',
        element: <CategoryPage />
      },
      {
        path: 'sale',
        element: <Sale />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'cart',
        element: <Cart />
      },

      //auth routes
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: '/verify-email/:token',
        element: <VerifyEmail />
      },
      {
        path: '/forgot-password',
        element: <ForgotPass />
      },
      
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'products/:id',
        element: <ProductDetail />
      },

      //member routes
      {
        path: '/member/profile',
        element: <Profile />
      },
      {
        path: '/member/orders',
        element: <Orders />
      },
      {
        path: '/member/orders',
        element: <Orders />
      },
      {
        path: '/member/orders/:id',
        element: <OrderDetail />
      },
      {
        path: '/member/favorites',
        element: <Favorites />
      },
      {
        path: 'member/settings',
        element: <Setting />
      },
      {
        path: '/checkout/vnpay-callback',
        element: <CheckPaymentVNPay />
      },
    ]
  },

]);
