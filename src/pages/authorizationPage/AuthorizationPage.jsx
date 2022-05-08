import { useAuth } from "context/authContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function AuthorizationPage() {
  const {
    authState: { encodedToken },
  } = useAuth();
  const location = useLocation();
  return encodedToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location.pathname }} replace />
  );
}

export { AuthorizationPage };
