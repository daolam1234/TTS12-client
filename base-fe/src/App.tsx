import { useRoutes } from "react-router-dom"
import ClientLayout from "./layouts/ClientLayout"
import Register from "./pages/Auth/Register"
import Login from "./pages/Auth/Login"
import HomePage from "./pages/Homepage/HomePage"

import ProductDetail from "./pages/Products/ProductDetail"
import Profile from "./pages/User/Profile"
import Setting from "./pages/User/Setting"
import NewArrival from "./pages/Products/NewArrival"
import Men from "./pages/Products/Men"
import Women from "./pages/Products/Women"
import Kids from "./pages/Products/Kids"
import Collection from "./pages/Products/Collections"


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
          path: 'homepage',
          element: <HomePage />
        },
        {
          path: 'newArrival',
          element: <NewArrival />
        },
         {
          path: 'men',
          element: <Men />
        },
         {
          path: 'women',
          element: <Women />
        },
         {
          path: 'kids',
          element: <Kids />
        },
         {
          path: 'collection',
          element: <Collection />
        },
        {
          path: 'newArrival/1',
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
