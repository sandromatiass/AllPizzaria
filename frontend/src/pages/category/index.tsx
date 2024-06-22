import Head from 'next/head';
import { Header } from '@/components/Header';

import styles from './styles.module.scss'

import { Form, Formik, Field } from 'formik';
import { categorySchema } from '@/schemas/validationSchema';

import { toast } from 'react-toastify';

import { FaSpinner } from 'react-icons/fa';
import { BiSolidError } from 'react-icons/bi';

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
          className={styles.form}
          >
            {({ isSubmitting }) =>(
              <Form className={styles.form}>
                <Field name='name'>
                  {({ field, meta }: any) => (
                    <div>
                      <input
                        {...field}
                        type='text'
                        placeholder='Digite o nome da categoria'
                        className={`${styles.input} ${meta.touched && meta.error ? styles.error : ''}`}
                        autoComplete='off'
                        autoCorrect='on'
                      />
                      {meta.touched && meta.error ? (
                        <div className={styles.errorMessage}>
                          <BiSolidError />
                          {meta.error}
                        </div>
                      ) : null}
                    </div>
                  )}
                </Field>

                <button className={styles.buttonAdd} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <FaSpinner className={styles.spinnerAdd}/> : 'Cadastrar'}
                </button>
              </Form>
            )} 
          </Formik>
        </main>
      </div>
    </>
  );
};