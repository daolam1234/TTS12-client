import { useRoutes } from "react-router-dom"
import ClientLayout from "./layouts/ClientLayout"
import Register from "./pages/Register"
import Login from "./pages/Login"

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
        }
      ]
    },
   
  ])
  
  return (
    <div>{router}</div>
  )
}

export default App
