import Head from 'next/head';
import styles from './styles.module.scss';

import { useState, ChangeEvent } from 'react';

import { Header } from '@/components/Header';

import { canSSRAuth } from '@/utils/canSSRAuth';

import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

import { productSchema } from '@/schemas/validationSchema';

import { FiUpload } from 'react-icons/fi';
import { BiSolidError } from 'react-icons/bi';

import { setupAPIClient } from '@/services/api';

import { toast } from 'react-toastify';

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);
  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState<number>(-1);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file instanceof File) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setImageAvatar(file);
        setAvatarUrl(URL.createObjectURL(file));
      } else {
        toast.error('Formato de arquivo inválido. Apenas JPG ou PNG são permitidos.');
      }
    } else {
      toast.error('O arquivo selecionado não é válido.');
    }
  }

  function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
    const categoryIndex = Number(event.target.value);
    setCategorySelected(categoryIndex);
  }

  async function handleRegister(
    values: any,
    formikHelpers: FormikHelpers<any> 
  ) {
    const { setSubmitting, resetForm } = formikHelpers;

    try {
      const data = new FormData();

      if (
        values.name === '' ||
        values.price === '' ||
        values.description === '' ||
        imageAvatar === null
      ) {
        toast.error('Preencha todos os dados');
        return;
      }

      data.append('name', values.name);
      data.append('price', values.price);
      data.append('description', values.description);

      if (imageAvatar) {
        data.append('file', imageAvatar);
      }

      if (categorySelected !== -1) {
        data.append('category_id', categories[categorySelected].id);
      } else {
        toast.error('Selecione uma categoria válida');
        return;
      }

      const apiClient = setupAPIClient();
      const response = await apiClient.post('/product', data);

      if (response.status === 200) {
        toast.success('Produto cadastrado com sucesso!');
        resetForm(); 
        setAvatarUrl(''); 
        setImageAvatar(null);
        setCategorySelected(-1);
      } else {
        toast.error('Erro ao cadastrar o produto.');
      }
    } catch (err) {
      console.error('Erro ao cadastrar o produto:', err);
      toast.error('Ops, erro ao cadastrar o produto.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>New Product - AllPizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo produto</h1>
          <Formik
            initialValues={{ name: '', categorySelected: '', description: '', price: '' }}
            validationSchema={productSchema}
            onSubmit={(values, formikHelpers) => { 
              handleRegister(values, formikHelpers);
            }}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form}>  
                <label className={styles.labelAvatar}>
                  <span>
                    <FiUpload size={30} color='#9E9E9E'/>
                  </span>
                  <input type='file' accept='image/png, image/jpeg' onChange={handleFile} />
                  {avatarUrl && (
                    <img
                      className={styles.preview}
                      src={avatarUrl} 
                      alt='Foto produto'
                      width={250}
                      height={250}
                    />
                  )}
                </label>
                      
                <Select
                  name="categorySelected"
                  options={categories.map((category, index) => ({
                    value: index,
                    name: category.name,
                    key: category.id
                  }))}
                  onChange={handleChangeCategory}
                  placeholder="Selecione uma categoria"
                />
                  
                <Input 
                  name='name'
                  placeholder='Nome do produto'
                  type='name'
                  autoComplete='off'
                />
                <Input 
                  name='price'
                  placeholder='Valor do produto'
                  type='price'
                  autoComplete='off'
                />
                <Field name='description'>
                  {({ field, meta }: FieldProps) => (
                    <div className={styles.fieldWrapper}>
                      <textarea
                        {...field}
                        placeholder='Descrição do produto'
                        autoComplete='off'
                        className={styles.textarea}
                      />
                      {meta.touched && meta.error && (
                        <div className={styles.errorMessage}>
                          <BiSolidError />
                          {meta.error}
                        </div>
                      )}
                    </div>
                  )}
                </Field>
                <Button
                  type='submit'
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
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/category');
  return {
    props: {
      categoryList: response.data
    }
  };
});