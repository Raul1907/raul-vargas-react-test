import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import styles from './LoginPage.module.scss'; // Importamos el archivo de estilos
import InputField from '../../components/input/InputField';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../features/store';
import { loginUser } from '../../features/users/userSlice';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state: RootState) =>
    state.user
  );
  // Definir el esquema de validación con Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Formato de correo inválido')
      .required('El correo electrónico es requerido'),
    password: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .max(12, 'Máximo 12 caracteres')
      .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
      .matches(/[0-9]/, 'Debe contener al menos un número')
      .matches(/[\W_]/, 'Debe contener al menos un carácter especial')
      .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
      .required('La confirmación de contraseña es requerida'),
  });

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: { email: string; password: string }) => {
    // Simulación de autenticación. Despachar la acción para autenticar al usuario
    dispatch(loginUser({...user.loggedInUser, email:values.email, password: values.password}));

     // Comprobar si el login fue exitoso mirando el token en localStorage
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/products');
    } else {
      alert('El correo ingresado es incorrecto');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Iniciar sesión</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className={styles.form}>
              <InputField label="Correo electrónico" name="email" type="email" />
              <InputField label="Contraseña" name="password" type="password" />
              <InputField label="Confirmar contraseña" name="confirmPassword" type="password" />
              <Button type="submit" text="Iniciar sesión" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
