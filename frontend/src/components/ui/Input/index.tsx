import { InputHTMLAttributes } from 'react';
import { Field, useField } from 'formik';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  type?: string;
  placeholder?: string;
}

export const Input = ({ name, type = 'text', placeholder, ...props }: InputProps) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <Field
        {...field}
        {...props}
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${meta.touched && meta.error ? styles.error : ''}`}
      />
      {meta.touched && meta.error ? (
        <div className={styles.errorMessage}>{meta.error}</div>
      ) : null}
    </div>
  );
};
