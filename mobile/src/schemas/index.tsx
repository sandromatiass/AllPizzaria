import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("Digite um email válido")
    .required('Email é obrigatório'),
  password: Yup
    .string()
    .min(8, ({ min }) => `A senha deve conter no minimo ${min} caracteres`)
    .required('Senha é obrigatoria'),
});