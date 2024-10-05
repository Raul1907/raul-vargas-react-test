import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './InputField.module.scss'; // Usaremos los mismos estilos

interface SelectFieldProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <Field as="select" id={name} name={name} className={styles.select}>
        <option value="">Selecciona una opción</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};

export default SelectField;
