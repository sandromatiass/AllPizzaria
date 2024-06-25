import * as Yup from 'yup';

type ImagemProps = {
  type: string
}

export const loginSchema = Yup.object().shape({
  email: Yup.string()
  .email('Email inválido!')
  .required('Email é obrigatório!'),

  password: Yup.string()
  .required('Senha é obrigatória!')
  .min(8, 'Senha deve ter pelo menos 6 caracteres!'),
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string()
  .required('Informe seu nome!')
  .min(3, 'Digite seu nome completo!')
  .max(50, 'Faça uma abreviação!')
  .matches(/^[a-zA-Z\s]+$/, 'O nome deve conter apenas letras!'),

  email: 
  Yup.string()
  .email('Email inválido')
  .required('Email é obrigatório!'),

  password: Yup.string()
  .required('Senha é obrigatória!')
  .min(8, 'Senha deve ter pelo menos 6 caracteres!'),
});

export const categorySchema = Yup.object().shape({
  name: Yup.string()
  .required('O campo não pode ficar em branco.')
  .min(3, 'A categoria deve ter mais caracteres.')
  .max(50, 'A categoria deve ter menos caracteres.')
});

export const productSchema = Yup.object().shape({
  name: Yup.string()
    .required('O campo não pode ficar em branco.')
    .min(3, 'A categoria deve ter mais caracteres.')
    .max(50, 'A categoria deve ter menos caracteres.'),
  
  categorySelected: Yup.number()
    .required('Categoria é obrigatória!')
    .nullable()
    .typeError('Categoria é obrigatória!'),

  price: Yup.string()
    .required('Valor do produto é obrigatório!'),

  description: Yup.string()
    .required('Descrição é obrigatória!')
    .min(10, 'A descrição deve ser mais detalhada!'),
  
});