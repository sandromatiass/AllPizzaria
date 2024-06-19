import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useContext } from 'react';

import styles from '../styles/home.module.scss';

import faviconLogo from '../../public/favicon-32x32.png';
import imageLogo from '../../public/LogoPizzaria.png';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

import { AuthContext } from '@/contexts/AuthContext';

import { loginSchema } from '@/schemas/validationSchema';
import { Formik, Form } from 'formik';


export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(values: {email: string; password: string}){
    await signIn(values);
  }

  return (
    <>
    <Head>
      <title>AllPizzaria - Login</title>
    </Head>
    <div className={styles.containerHomeCenter}>
      <Image src={imageLogo} alt="Logo AllPizzaria" priority/>
        <div className={styles.login}>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={loginSchema}
          onSubmit={(values, {setSubmitting}) => {
            handleLogin(values)
            setSubmitting(true);
          }}>
          {({ isSubmitting }) =>(
            <Form className={styles.teste}>
            <div >
              <Input
                placeholder='Digite seu email'
                name='email'
                type='email'
                autoComplete='on'
              />
            </div>
            <div>
              <Input
                placeholder='Digite sua senha'
                type='password'
                name='password'
                autoComplete='off'
              />
            </div>
            <Button
              type="submit"
              loading={isSubmitting}
            >
              Acessar
            </Button>
          </Form>
          )}
          
        </Formik>
        <div className={styles.textLogin}>
          <p>Não esta cadastrado?</p>
          <Link href="/signup">
            <span>Cadastre-se</span>
          </Link>  
        </div>  
      </div>
    </div>
    </>
  );
};
