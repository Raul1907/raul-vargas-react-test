import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './PrivateLayout.module.scss';

const PrivateLayout: React.FC = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownClick = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null); // Cierra el dropdown si se vuelve a hacer clic en el mismo
    } else {
      setActiveDropdown(dropdown); // Abre el nuevo dropdown
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={styles.privateContainer}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1>Panel de administración</h1>
        </div>

        {/* Menú superior */}
        <nav className={styles.navbar}>
          <ul className={styles.navMenu}>
            {/* Menú Productos */}
            <li
              className={styles.navItem}
              onClick={() => handleDropdownClick('productos')}
            >
              Productos <span className={styles.dropdownIcon}>▼</span>
              {activeDropdown === 'productos' && (
                <ul className={styles.dropdownMenu}>
                  <li
                    className={styles.dropdownItem}
                    onClick={() => {
                      navigate('/products');
                      setActiveDropdown(null);
                    }}
                  >
                    Ver
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={() => {
                      navigate('/products/create');
                      setActiveDropdown(null);
                    }}
                  >
                    Crear
                  </li>
                </ul>
              )}
            </li>

            {/* Menú Cuenta */}
            <li
              className={styles.navItem}
              onClick={() => handleDropdownClick('cuenta')}
            >
              Cuenta <span className={styles.dropdownIcon}>▼</span>
              {activeDropdown === 'cuenta' && (
                <ul className={styles.dropdownMenu}>
                  <li
                    className={styles.dropdownItem}
                    onClick={() => {
                      navigate('/user');
                      setActiveDropdown(null);
                    }}
                  >
                    Mi cuenta
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={() => {
                      handleLogout();
                      setActiveDropdown(null);
                    }}
                  >
                    Cerrar sesión
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Admin Panel</p>
      </footer>
    </div>
  );
};

export default PrivateLayout;
