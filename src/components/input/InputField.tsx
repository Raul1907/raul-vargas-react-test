import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './InputField.module.scss';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  as?: string; // Para especificar si es un textarea u otro tipo
  disabled?: boolean,
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', as = 'input', placeholder , disabled= false}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        as={as}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
      />
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};

export default InputField;
