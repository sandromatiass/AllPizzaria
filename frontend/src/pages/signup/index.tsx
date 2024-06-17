import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/home.module.scss';

import imageLogo from '../../../public/LogoPizzaria.png';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';


export default function SignUp() {
  return (
    <>
    <Head>
      <title>AllPizzaria - SingUp</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={imageLogo} alt="Logo AllPizzaria" priority/>
        <div className={styles.login}>
        <h1>Criando sua conta</h1>

        <form>
        <Input 
            placeholder='Digite seu Nome'
            type='text'
            autoComplete="off"
          />
          <Input 
            placeholder='Digite seu email'
            type='text'
            autoComplete="off"
          />
          <Input 
            placeholder='Digite sua senha'
            type='password'
            autoComplete="off"
          />

          <Button
            type="submit"
            loading={false}
          >
            Cadastrar
          </Button>
        </form>
        <Link href="/" className={styles.text}>
          Já possui uma conta.
        </Link>    
      </div>
    </div>
    </>
  );
}
