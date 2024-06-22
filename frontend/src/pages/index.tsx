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

import { toast } from 'react-toastify';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(
    values: {
      email: string; 
      password: string
    }, 
      setSubmitting: (isSubmiting: boolean) => void
    ) {
      try {
        await signIn(values);
      } catch {
        console.log('erro ao fazer login!!')
      }finally {
        setSubmitting(false);
      }
    };

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
            if (!values.email || !values.password) {
              /*esse trecho só vai funcionar caso o meu schema validation não
                fizer a validação antes no caso não deve aver nenhuma validação
                antes para que o toastfy funcione
              */ 
              toast.error("Por favor, preencha todos os campos.");
              setSubmitting(false);
              return;
            }
            setSubmitting(true);
            handleSignIn(values, setSubmitting); 
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
