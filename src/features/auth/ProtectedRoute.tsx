import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
