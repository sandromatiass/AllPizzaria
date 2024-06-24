import { useField } from 'formik';
import { ChangeEvent } from 'react';
import { BiSolidError } from 'react-icons/bi';
import styles from './styles.module.scss';

interface Option {
  value: number; 
  name: string;
}

interface SelectProps {
  name: string;
  options: Option[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

export function Select({ name, options, onChange, placeholder }: SelectProps) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    helpers.setValue(value); 
    if (onChange) onChange(event);
  };

  return (
    <div>
      <select
        id={name}
        {...field}
        onChange={handleChange}
        className={`${styles.select} ${meta.touched && meta.error ? styles.error : ''}`}
      >
        {placeholder && <option value="string">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className={styles.errorMessage}>
          <BiSolidError />
          {meta.error}
        </div>
      )}
    </div>
  );
}
