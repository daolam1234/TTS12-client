import ClientLayout from "@/layouts/ClientLayout";
import ForgotPass from "@/pages/Auth/ForgotPass";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import VerifyEmail from "@/pages/Auth/VerifyEmail";
import Cart from "@/pages/Cart/Cart";
import Contact from "@/pages/Contact/Contact";
import HomePage from "@/pages/Homepage/HomePage";
import ProductDetail from "@/pages/Products/ProductDetail";
import Sneakers from "@/pages/Products/Sneakers";
import Profile from "@/pages/User/Profile";
import Setting from "@/pages/User/Setting";
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
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'cart',
        element: <Cart />
      },
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
        path: 'homepage',
        element: <HomePage />
      },
      {
        path: 'sneakers',
        element: <Sneakers />
      },
      {
        path: 'sneakers/:id',
        element: <ProductDetail />
      },
      {
        path: 'products/:id',
        element: <ProductDetail />
      },
      {
        path: '/member/profile',
        element: <Profile />
      },
      {
        path: 'member/settings',
        element: <Setting />
      },
    ]
  },

]);
