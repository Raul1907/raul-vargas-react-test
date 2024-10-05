import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  // Aquí se podría verificar el token de autenticación en localStorage
  return !!localStorage.getItem('authToken');
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
