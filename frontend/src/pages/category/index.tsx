import Head from 'next/head';
import { Header } from '@/components/Header';

import styles from './styles.module.scss'

import { Form, Formik, Field } from 'formik';
import { categorySchema } from '@/schemas/validationSchema';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

import { toast } from 'react-toastify';

import { FaSpinner } from 'react-icons/fa';
import { BiSolidError } from 'react-icons/bi';

import { canSSRAuth } from '@/utils/canSSRAuth';

//requisição adicionando produtos ao servidor
import { setupAPIClient } from '@/services/api';

export default function Category(){
  
  async function handleAddCategory(
    values: { name: string },
    setSubmitting: ( isSubmitting: boolean ) => void,
    resetForm: () => void
  ) {
    try {
      const apiClient = setupAPIClient();
      await apiClient.post('/category', {
        name: values.name
      });

      toast.success('Categoria cadastrada!')
      console.log(values.name)
      resetForm();

    }catch (err){
      console.log('Erro na solicitação', err);
    }finally {
      setSubmitting(false);
    }
  };

  return(  
    <>
      <Head>
        <title>New category - All Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>
          <Formik 
          initialValues={{name: ''}}
          validationSchema={categorySchema}
          onSubmit={(values, {setSubmitting, resetForm}) =>{
            setSubmitting(true)
            handleAddCategory(values, setSubmitting, resetForm)
            
          }}
          >
            {({ isSubmitting}) =>( 
            <Form  className={styles.form}>
              <Input
                name='name' 
                placeholder='Digite seu Nome'
                type='name'
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
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) =>{

  return {
    props: {}
  }
})