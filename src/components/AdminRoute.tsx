import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <p className="text-4xl mb-2">⛔</p>
          <p className="text-muted-foreground text-lg">Admin access only</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
