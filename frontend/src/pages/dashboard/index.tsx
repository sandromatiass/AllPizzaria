import { canSSRAuth } from '@/utils/canSSRAuth';

import Head from 'next/head';
import styles from './styles.module.scss';

import { Header } from '@/components/Header';

import { FiRefreshCcw } from 'react-icons/fi';

import { setupAPIClient } from '@/services/api';

import { useState } from 'react';


type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface DashboardProps{
  orders: OrderProps[];
}

export default function DashBoard({orders}: DashboardProps) {

  const [ orderList, setOrderList ] = useState(orders || []);

  function handleOpenModalView(id: string){
    alert('modal' + id)
  }

  return (
   <>
    <Head>
      <title> Dashboard - AllPizzaria </title>
    </Head>
    <div>
      <Header/>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button>
            <FiRefreshCcw size={25} color='#2C9A22' />
          </button>
        </div>
          <article className={styles.listOreders}>
          {orderList.map(item => (
            <section key={item.id} className={styles.orderItem}>
              <button onClick={ () => handleOpenModalView(item.id)}>
                <div className={styles.tag}></div>
                <span>Mesa {item.table}</span>
              </button>
            </section>
          ))}
          </article>
        
      </main>
    </div>
   </>
  )
};

export const getServerSideProps = canSSRAuth(async (ctx) =>{

  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/orders');

  return {
    props: {
      orders: response.data
    }
  }
})