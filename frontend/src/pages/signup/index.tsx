import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

import imageLogo from '../../../public/LogoPizzaria.png';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

import { signUpSchema } from '@/schemas/validationSchema';
import { Form, Formik } from 'formik';

export default function SignUp() {

  return (
    <>
    <Head>
      <title>AllPizzaria - SingUp</title>
    </Head>
    <div className={styles.containerSignUp}>
      <Image src={imageLogo} alt="Logo AllPizzaria" priority/>
        <div className={styles.SignUp}>
        
        <h1>Criando sua conta</h1>

        <Formik  initialValues={{name: '', email: '', password: ''}}
          validationSchema={signUpSchema}
          onSubmit={(values, {setSubmitting}) => {
            setSubmitting(false);
            console.log(values);
          }}>
          {({ isSubmitting}) =>( 
            <Form>
              <Input
                name='name' 
                placeholder='Digite seu Nome'
                type='name'
                autoComplete="off"
              />
              <Input
                name='email' 
                placeholder='Digite seu email'
                type='email'
                autoComplete="on"
              />
              <Input
                name='password' 
                placeholder='Digite sua senha'
                type='password'
                autoComplete="off"
              />

              <Button
                type="submit"
                loading={isSubmitting}
              >
                Cadastrar
              </Button>
            </Form>
          )}  
        </Formik>
        <div className={styles.textSignUp}>
          <p>Já tem cadastro, faça</p>
          <Link href="/">
            <span>login.</span>
          </Link>  
        </div> 
      </div>
    </div>
    </>
  );
}
