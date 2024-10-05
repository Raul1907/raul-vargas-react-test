import React from 'react';
import styles from './BackButton.module.scss';

interface BackButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ text, onClick, disabled = false }) => {
  return (
    <button
      className={styles.nextButton}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default BackButton;
