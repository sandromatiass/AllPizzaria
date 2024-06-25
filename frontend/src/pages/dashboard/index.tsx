import { canSSRAuth } from '@/utils/canSSRAuth';

import Head from 'next/head';

import styles from './styles.module.scss';

import { Header } from '@/components/Header';
import { ModalOrder } from '@/components/ModalOrder';

import { FiRefreshCcw } from 'react-icons/fi';

import { setupAPIClient } from '@/services/api';

import { useEffect, useState } from 'react';

import Modal from 'react-modal';

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface DashboardProps {
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}

if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

export default function DashBoard({ orders }: DashboardProps) {
  const [orderList, setOrderList] = useState(orders || []);
  const [modalItem, setModalItem] = useState<OrderItemProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  function handleCloseModal() {
    setModalVisible(false);
    setModalItem([]);
  };

  async function handleOpenModalView(id: string) {
    const apiClient = setupAPIClient();
    const response = await apiClient.get('/orders/detail', {
      params: {
        order_id: id,
      }
    });

    setModalItem(response.data);
    setModalVisible(true);
  };

  async function handleFinishItem(id: string){
    const apiClient = setupAPIClient();
    await apiClient.put('/order/finish', {
      order_id: id,
    })

    const response = await apiClient.get('/orders');

    setOrderList(response.data);

    setModalVisible(false);
    setIsRefreshing(false);
  };

  async function handleRefreshOrders(){
    setIsRefreshing(true); 
    const apiClient = setupAPIClient();

    try {
      const response = await apiClient.get('/orders');
      setOrderList(response.data);
    } catch (error) {
      console.error('Erro ao atualizar pedidos:', error);
    } finally {
        setIsRefreshing(false); 
    }
  }

  useEffect(() => {
    handleRefreshOrders();

    const intervalId = setInterval(() => {
      handleRefreshOrders();
      setIsRefreshing(true);
    }, 50000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Head>
        <title> Dashboard - AllPizzaria </title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button onClick={handleRefreshOrders} disabled={isRefreshing}>
              <FiRefreshCcw size={25} color='#2C9A22' />
            </button>
          </div>
          <article className={styles.listOreders}>

            {orderList.length === 0 && (
              <span className={styles.empytList}>
                Nenhum pedido aberto foi encontrado...
              </span>
            )}

            {orderList.map(item => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>

        <ModalOrder
          isOpen={modalVisible}
          onRequestClose={ handleCloseModal }
          order={modalItem}
          handleFinishOrder={ handleFinishItem }
        />
      </div>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/orders');
  return {
    props: {
      orders: response.data
    }
  };
});
