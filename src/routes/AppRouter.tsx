import { HashRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '../layout/PublicLayout'; // Importar layout público
import PrivateLayout from '../layout/PrivateLayout'; // Importar layout privado
import LoginPage from '../pages/login/LoginPage';
import ProductsPage from '../pages/products/ProductsPage';
import ProductDetailPage from '../pages/products/ProductDetailPage';
import NotFoundPage from '../pages/404/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import UsersPage from '../pages/user/UserPage';
import ProductCreatePage from '../pages/products/ProductCreatePage';

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/create" element={<ProductCreatePage />} />
            <Route path="/products/:id/edit" element={<ProductCreatePage />} /> {/* Ruta para editar producto */}
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/user" element={<UsersPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
