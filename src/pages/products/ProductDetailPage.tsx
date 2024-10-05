import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import styles from './ProductDetailPage.module.scss';
import BackButton from '../../components/button/BackButton';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id.toString() === id)
  );
  const navigate = useNavigate();

  if (!product) {
    return (
    <>
      <BackButton text='← Volver a la lista de productos' onClick={() => navigate('/products')}/>
      <p>Producto no encontrado</p>
    </>
    )
  }

  return (
    <>
      <BackButton text='← Volver a la lista de productos' onClick={() => navigate('/products')}/>
      <div className={styles.productDetailContainer}>
      {/* Botón para regresar */}

      

      <div className={styles.imageSection}>
        <img src={product.image} alt={product.title} className={styles.productImage} />
      </div>

      <div className={styles.detailsSection}>
        <h2 className={styles.detailsTitle}>Detalle de producto</h2>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>SKU:</span>
          <span className={styles.detailValue}>{product.id}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Título:</span>
          <span className={styles.detailValue}>{product.title}</span> {/* Puedes actualizar esto */}
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Categoría:</span>
          <span className={styles.detailValue}>{product.category}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Precio:</span>
          <span className={styles.detailValue}>${product.price}</span>
        </div>
        <div className={styles.detailDescription}>
          <span className={styles.detailLabel}>Descripccion:</span>
          <p className={styles.detailValue}>{product.description}</p>
        </div>
      </div>

    </div>
    </>
  );
};

export default ProductDetailPage;
