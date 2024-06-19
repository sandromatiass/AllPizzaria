import { FaSpinner } from 'react-icons/fa';
import styles from './styles.module.scss';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  loading?: boolean;
  children: ReactNode;
}

export function Button({ loading, children, ...props }: ButtonProps){
  return(
    <button 
    className={styles.button}
    disabled={loading}
    {...props}
    >
      { loading ? (
        <FaSpinner color='#ffffff' size={16}/>
      ): (
        <span className={styles.buttonText}>
          {children}
        </span>
      )}
    </button>
  )
}