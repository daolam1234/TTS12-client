import { useRoutes } from "react-router-dom"
import ClientLayout from "./layouts/ClientLayout"
import Register from "./pages/Auth/Register"
import Login from "./pages/Auth/Login"
import HomePage from "./pages/Homepage/HomePage"
import Sneakers from "./pages/Products/Sneakers"
import ProductDetail from "./pages/Products/ProductDetail"
import Profile from "./pages/User/Profile"
import Setting from "./pages/User/Setting"
import VerifyEmail from "./pages/Auth/VerifyEmail"


function App() {

  const router = useRoutes([
    {
      path: '/',
      element: <ClientLayout />,
      children: [
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
          path: 'homepage',
          element: <HomePage />
        },
        {
          path: 'sneakers',
          element: <Sneakers />
        },
        {
          path: 'sneakers/1',
          element: <ProductDetail />
        },
        {
          path: '/member/profile',
          element: <Profile />
        },   
        {
          path: '/member/settings',
          element: <Setting />
        },
      ]
    },

  ])

  return (
    <div>{router}</div>

  )
}

export default App
