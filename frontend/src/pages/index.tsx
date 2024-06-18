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

import { loginSchema } from '@/schemas/validationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';


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
    <div className={styles.containerCenter}>
      <Image src={imageLogo} alt="Logo AllPizzaria" priority/>
        <div className={styles.login}>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={loginSchema}
          onSubmit={(values, {setSubmitting}) => {
            handleLogin(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting}) =>(
            <Form>
            <div>
              <Field
                placeholder='Digite seu email'
                name='email'
                type='email'
                autoComplete='email'
                as={Input} 
              />
              <ErrorMessage name='email' component='div' className={styles.errorMessage}/>
            </div>
            <div>
              <Field
                placeholder='Digite sua senha'
                type='password'
                name='password'
                autoComplete="off"
                as={Input} 
              />
              <ErrorMessage name='password' component='div' className={styles.errorMessage}/>
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
        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>    
      </div>
    </div>
    </>
  );
}
