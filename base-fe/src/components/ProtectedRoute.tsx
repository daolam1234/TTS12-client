import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const role = localStorage.getItem("role");

  if (!role || !allowedRoles.includes(role)) {
    // Không có role hợp lệ, chuyển về trang login
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
