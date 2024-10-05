import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { setProducts } from '../../features/products/productsSlice';
import styles from './ProductsPage.module.scss';
import { Product } from '../../types/Product';
import ProductsTable from '../../components/table/ProductsTable';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  // Hacer la solicitud a la API y guardar los productos en Redux
  useEffect(() => {
    if(products.length === 0){
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
        dispatch(setProducts(response.data)); // Guardamos los productos en el estado global
      } catch (err) {
        console.error('Error al cargar los productos', err);
      }
    };

    fetchProducts();
  }
  }, [products, dispatch]);

  return (
    <div className={styles.productsContainer}>
      <h1 className={styles.title}>Lista de Productos</h1>
      <ProductsTable products={products} />
    </div>
  );
};

export default ProductsPage;
