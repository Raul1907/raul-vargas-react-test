import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserAuth } from '../../types/User';
import { decryptData, encryptData } from '../../utils/crypto';// CryptoJS para los demás campos
import { comparePassword } from '../../utils/bcrypt';// bcryptjs para la contraseña

interface UserState {
  currentUser: User;
  loggedInUser: UserAuth;
  defaultEmail: string;
}

// Estado inicial con datos cifrados/hasheados
const initialState: UserState = {
  currentUser: {
    id: 0,
    name: encryptData('test tester'), // Nombre cifrado
    role: encryptData('Admin'), // Rol cifrado
    status: encryptData('Activo') // Estado cifrado
  },
  loggedInUser: {
    isAuth: false, 
    email: 'U2FsdGVkX1/ugbuPtJGwaEmUUmiksrzf3A2vwl8qcn9zHAjXDyZkh+KxUdpKbkBI', // Email cifrado
    password: '$2a$10$B0epdwVNH7VSXUsU4Qjv/.cUoU7sjszf0zJqY7zKQDB2r/xfI1kNG', // Contraseña hasheada
    token: ''
  },
  defaultEmail: 'U2FsdGVkX1/ugbuPtJGwaEmUUmiksrzf3A2vwl8qcn9zHAjXDyZkh+KxUdpKbkBI', // Email por defecto cifrado
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // createUser: (state, action: PayloadAction<UserState>) => {
    //   state = action.payload;
    // },
    updateUser: (state, action: PayloadAction<UserState>) => {
      const { currentUser, loggedInUser } = action.payload;
      state.currentUser = {
        ...state.currentUser,
        name: encryptData(currentUser.name), // Cifrar el nombre
        role: encryptData(currentUser.role), // Cifrar el rol
        status: encryptData(currentUser.status), // Cifrar el estado
      };
      state.loggedInUser =
        {
          ...state.loggedInUser,
          email: encryptData(loggedInUser.email), // Email cifrado
          password: loggedInUser.password, // Contraseña hasheada
        } ;
        state.defaultEmail = encryptData(loggedInUser.email)


    },
    loginUser: (state, action: PayloadAction<UserAuth>) => {
      const { email, password } = action.payload;

      // Comprobar el email cifrado y la contraseña hasheada
      if (decryptData(state.loggedInUser.email) === email && comparePassword(password, state.loggedInUser.password)) {
        const authToken = encryptData('myToken'); // No necesitamos cifrar el token
        localStorage.setItem('authToken', authToken); // Almacenar el token
        state.loggedInUser.isAuth = true;
        state.loggedInUser.token = authToken;
      } else {
        localStorage.removeItem('authToken');
        state.loggedInUser.isAuth = false;
        state.loggedInUser.token = '';
      }
    },
    logoutUser: (state) => {
      state.loggedInUser.isAuth = false; // Cerrar sesión
      localStorage.removeItem('authToken');
    },
  },
});

export const { updateUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
