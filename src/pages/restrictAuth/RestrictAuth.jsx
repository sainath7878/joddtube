import { SignIn, SignUp } from "components/index";
import { useAuth } from "context/authContext";
import { useLocation, Navigate } from "react-router-dom";

function RestrictAuth() {
  const location = useLocation();
  const from = location?.state?.from || "/";
  const {
    authState: { encodedToken },
  } = useAuth();
  if (encodedToken) {
    return <Navigate to={from} replace />;
  }
  return location.pathname === "/signin" ? <SignIn /> : <SignUp />;
}

export { RestrictAuth };
