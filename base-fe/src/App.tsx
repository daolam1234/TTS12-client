import { useRoutes } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homeadmin from "./pages/homeadmin";

function App() {
  const router = useRoutes([
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        { path: "auth/register", element: <Register /> },
        { path: "auth/login", element: <Login /> },

        // Các route cần phân quyền
        {
          path: "admin/dashboard",
          element:<Homeadmin />
           
          ,
        },
      
      ],
    },
  ]);

  return <div>{router}
      <ToastContainer position="top-right" />

  </div>;
}

export default App;
