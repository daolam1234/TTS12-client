import { useRoutes } from "react-router-dom"
import ClientLayout from "./layouts/ClientLayout"
import Register from "./pages/Auth/Register"
import Login from "./pages/Auth/Login"
import Sneakers from "./pages/Products/Sneakers"
import HomePage from "./pages/Homepage/HomePage"


function App() {

  const router = useRoutes([
     {
      path: '/',
      element: <ClientLayout/>,
      children: [
        {
          path: 'register',
          element: <Register/>
        },
        {
          path: 'login',
          element: <Login/>
        } ,
        {
          path: 'homepage',
          element: <HomePage/>
        }  ,
        {
          path: 'sneakers',
          element: <Sneakers/>
        }  
      ]
    },
   
  ])
  
  return (
    <div>{router}</div>
    
  )
}

export default App
