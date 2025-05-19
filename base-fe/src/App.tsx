import { useRoutes } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { ProtectedRoute } from "./components/ProtectedRoute";
import Homeadmin from "./pages/homeadmin";

function App() {
  const router = useRoutes([
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        { path: "register", element: <Register /> },
        { path: "auth/login", element: <Login /> },

        // Các route cần phân quyền
        {
          path: "admin/dashboard",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Homeadmin />
            </ProtectedRoute>
          ),
        },
      
      ],
    },
  ]);

  return <div>{router}</div>;
}

export default App;
