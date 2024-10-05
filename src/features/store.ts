import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/productsSlice';
import userReducer from './users/userSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    // Agregar otros reducers si es necesario
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;