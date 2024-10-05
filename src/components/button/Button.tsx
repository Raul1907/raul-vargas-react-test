import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', disabled = false }) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={styles.button} 
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
