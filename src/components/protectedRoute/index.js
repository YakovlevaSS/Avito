
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute ({ redirectPath = "/checkAuth"}) {
  // const { user } = useContext(UserContext)
  const user = true
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />
};

export default ProtectedRoute