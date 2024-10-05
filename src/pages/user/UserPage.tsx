import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../features/users/userSlice';
import InputField from '../../components/input/InputField';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../features/store';
import styles from './UserPage.module.scss';
import { User, UserAuth } from '../../types/User';
import { comparePassword, hashPassword } from '../../utils/bcrypt';
import { decryptData } from '../../utils/crypto';
import BackButton from '../../components/button/BackButton';

const UserPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  // Esquema de validación de Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string().email('Correo inválido').required('El correo es requerido'),
    currentPassword: Yup.string(),//.required('La contraseña actual es requerida'),
    newPassword: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .max(12, 'Máximo 12 caracteres')
      .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
      .matches(/[0-9]/, 'Debe contener al menos un número')
      .matches(/[\W_]/, 'Debe contener al menos un carácter especial'),
      //.required('La nueva contraseña es requerida'),
    role: Yup.string().required('El rol es requerido'),
    status: Yup.string().required('El estado es requerido'),
  });

  interface UserValues {
    id: User['id'];
    name: User['name'];
    role: User['role'];
    status: User['status'];
    email: UserAuth['email'];
    currentPassword: string;
    newPassword: string;
  }
  // Valores iniciales del formulario
  const initialValues: UserValues = {
    
    id: user ? user.currentUser.id : Math.random(),
    name: user ? decryptData(user.currentUser.name) : '', // Desencriptar el nombre
    role: user ? decryptData(user.currentUser.role) : '', // Desencriptar el rol
    status: user ? decryptData(user.currentUser.status) : '', // Desencriptar el estado
    email: user ? decryptData(user.loggedInUser.email) : '', // Desencriptar el email
    currentPassword: '',
    newPassword: '',
  };

  // Función para manejar la creación o edición del usuario
  const handleSubmit = (values: UserValues) => {
    // Validar que la contraseña actual coincida con la almacenada en Redux
    if (values.currentPassword!=="" && !comparePassword(values.currentPassword, user.loggedInUser.password)) {
      alert('La contraseña actual no coincide');
      return;
    }

    const newUser = {
      currentUser: {
        ...values,
        name: values.name,
        role: values.role,
        status: values.status,
      },
      loggedInUser: {
        ...user.loggedInUser,
        email: values.email, // Encriptar el email
        password: values.newPassword !== '' ? hashPassword(values.newPassword) : user.loggedInUser.password, // Encriptar la nueva contraseña si fue actualizada
      },
      defaultEmail: values.email, // Encriptar el email por defecto
    };
    dispatch(updateUser(newUser));
    navigate('/user');
  };

  return (
    <div className={styles.userPageContainer}>
      <BackButton text='← Regresar' onClick={() => navigate('/')}/>
      <h1>{user ? 'Editar Usuario' : 'Crear Usuario'}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className={styles.form}>
            <InputField label="Nombre" name="name" />
            <InputField label="Correo Electrónico" name="email" type="email" />
            <InputField label="Contraseña Actual" name="currentPassword" type="password" />
            <InputField label="Nueva Contraseña" name="newPassword" type="password" />
            <InputField label="Rol" name="role" type="text" disabled/>
            <InputField label="Estado" name="status" type="text" disabled/>
            <Button type="submit" text={user ? 'Guardar Cambios' : 'Crear Usuario'} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserPage;
