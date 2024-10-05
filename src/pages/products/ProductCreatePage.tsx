import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createProduct, updateProduct } from '../../features/products/productsSlice';
import { Product } from '../../types/Product';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../../components/input/InputField';
import SelectField from '../../components/input/SelectField';
import styles from './ProductCreatePage.module.scss';
import { RootState } from '../../features/store';
import Button from '../../components/button/Button';
import BackButton from '../../components/button/BackButton';

const ProductCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Obtener el ID del producto para editar
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id.toString() === id)
  );
  const products = useSelector((state: RootState) => state.products.products);

  // Esquema de validación de Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('El título es requerido'),
    price: Yup.number().required('El precio es requerido').positive('Debe ser un valor positivo'),
    description: Yup.string().required('La descripción es requerida'),
    category: Yup.string().required('La categoría es requerida'),
    image: Yup.string().required('La imagen es requerida'),
  });

  // Valores iniciales del formulario
  const initialValues: Product = {
    id: product ? product.id : products.length + 1 , //Math.random(), // Usar el ID del producto si estamos editando
    title: product ? product.title : '',
    price: product ? product.price : 0,
    description: product ? product.description : '',
    category: product ? product.category : '',
    image: product ? product.image : '',
  };

  // Función para manejar la creación o edición del producto
  const handleSubmit = (values: Product) => {
    if (product) {
      // Editar producto existente
      dispatch(updateProduct(values));
    } else {
      // Crear un nuevo producto
      dispatch(createProduct(values));
    }

    // Redirigir a la página de productos
    navigate('/products');
  };

  return (
    <>
      <BackButton text='← Volver a la lista de productos' onClick={() => navigate('/products')}/>
      <div className={styles.productCreateContainer}>
      <h1>{product ? 'Editar Producto' : 'Crear Producto'}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // Re-inicializar los valores si estamos editando
      >
        {({ setFieldValue }) => (
          <Form className={styles.form}>
            <InputField label="Nombre del producto" name="title" />
            <InputField label="Precio" name="price" type="number" />
            <InputField label="Descripción" name="description" as="textarea" />
            <SelectField
              label="Categoría"
              name="category"
              options={[
                { label: "Men's Clothing", value: "men's clothing" },
                { label: 'Jewelery', value: 'jewelery' },
                { label: 'Electronics', value: 'electronics' },
                { label: "Women's Clothing", value: "women's clothing" },
              ]}
            />
            <div className={styles.formGroup}>
              <label htmlFor="image">Imagen del producto</label>
              <input
                name="image"
                type="file"
                className={styles.input}
                onChange={(event) => {
                  const file = event.currentTarget.files;
                  if(file){
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFieldValue('image', reader.result); // Guardar la imagen como base64
                    };
                    reader.readAsDataURL(file[0]);
                  }
                }}
              />
            </div>
            <Button type="submit" text={product ? 'Guardar Cambios' : 'Crear Producto'}/>
          </Form>
        )}
      </Formik>
    </div>
    </>
   
  );
};

export default ProductCreatePage;
