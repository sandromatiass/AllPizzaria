import Head from 'next/head';

import styles from './styles.module.scss';

import { Header } from '@/components/Header';

import { canSSRAuth } from '@/utils/canSSRAuth';

export default function Product(){
  return (
    <>
      <Head>
        <title>New Product - AllPizzaria</title>
      </Head>
      <div>
        <Header />

        
      </div>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) =>{

  return {
    props: {}
  }
})