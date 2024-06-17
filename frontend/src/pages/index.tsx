import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useContext, FormEvent, useState } from 'react';

import styles from '../styles/home.module.scss';

import faviconLogo from '../../public/favicon-32x32.png';
import imageLogo from '../../public/LogoPizzaria.png';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

import { AuthContext } from '@/contexts/AuthContext';


export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ loading, setLoading ] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    let data = {
      email,
      password
    }

    await signIn(data)
  };

  return (
    <>
    <Head>
      <title>AllPizzaria - Login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={imageLogo} alt="Logo AllPizzaria" priority/>
        <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input 
            placeholder='Digite seu email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
          />
          <Input 
            placeholder='Digite sua senha'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <Button
            type="submit"
            loading={false}
          >
            Acessar
          </Button>
        </form>
        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>    
      </div>
    </div>
    </>
  );
}
