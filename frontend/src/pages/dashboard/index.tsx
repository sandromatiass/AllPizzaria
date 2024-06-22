import { canSSRAuth } from '@/utils/canSSRAuth';

export default function DashBoard() {
  return (
    <h1>
      bem vindo ao painel
    </h1>
  )
};

export const getServerSideProps = canSSRAuth(async (ctx) =>{

  return {
    props: {}
  }
})