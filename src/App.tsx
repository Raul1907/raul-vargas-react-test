import React from 'react';
import AppRouter from './routes/AppRouter'; // Asegúrate de tener tu AppRouter en la ruta correcta
import { Provider } from 'react-redux';
import store from './features/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
