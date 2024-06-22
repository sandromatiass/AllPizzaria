import Link from 'next/link';
import Image from 'next/image';

import { useContext } from 'react';

import styles from './styles.module.scss';

import logoHeader from '../../../public/LogoPizzaria.png';

import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '@/contexts/AuthContext';


export function Header(){

  const { signOut } = useContext(AuthContext)

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href='/dashboard'>
          <Image 
            src={logoHeader} 
            width={120} 
            height={60} 
            alt='Logo All Pizzaria' 
            priority
          />
        </Link>
        <nav className={styles.menuNav}>
          <Link href='/category'>
            Categorias
          </Link>
          <Link href='/product'>
            Produtos
          </Link>
          <button onClick={signOut}>
            <FiLogOut color='#EE3239' size={24}/>
          </button>
        </nav> 
      </div>
    </header>
  );
};