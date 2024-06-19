import * as Yup from 'yup';


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
})