import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './PublicLayout.module.scss'; // Importar el Sass module

const PublicLayout: React.FC = () => {
  return (
    <div className={styles.publicContainer}>
      <header className={styles.header}>
        <h1>Bienvenido a Test React</h1>
      </header>
      <main className={styles.mainContent}>
        <Outlet /> {/* Aquí se renderizan las páginas públicas */}
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Test React</p>
      </footer>
    </div>
  );
};

export default PublicLayout;
