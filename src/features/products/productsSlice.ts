import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import axios from 'axios';

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};


const fetchProducts = async (data: Product) => {
  try {
    const body= {
      title: data.title,
      price: data.price,
      description: data.description,
      image: 'https://pravatar.cc',
      category: data.category
    }
    await axios.post<Product>('https://fakestoreapi.com/products', {
      ...body
    });

  } catch (err) {
    console.error('Error en el POST de los productos', err);
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    createProduct: (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
        fetchProducts(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
});

export const { setProducts, createProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
