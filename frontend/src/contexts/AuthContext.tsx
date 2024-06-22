import { createContext, ReactNode, useState } from 'react';

import { destroyCookie, setCookie, parseCookies } from 'nookies';

import { useRouter } from 'next/router';

import { api } from '@/services/apiClient';

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email:string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData); 

export function signOut(){
  const router = useRouter();

  try{
    destroyCookie(undefined, '@nextauth.token')
    router.push('/')
  }catch{
    console.log('erro ao deslogar')
  };
};

export function AuthProvider({ children}: AuthProviderProps){
  const [ user,  setUser ] = useState<UserProps>();
  const isAuthenticated = !!user;
  const router = useRouter();

  async function signIn({email, password}: SignInProps){
    try{
      const response = await api.post('/session', {
        email,
        password
      });

      console.log(response.data);

      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/"
      });

      setUser({
        id,
        name,
        email
      });
      //passando o token para todas as requisições;
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      router.push('/dashboard')

    }catch(err){
      console.log('erro ao acessaar', err)
    };
  };

  async function signUp({name, email, password}: SignUpProps) {
    
    try {

      const response = await api.post('/users', {
        name,
        email,
        password
      });

      console.log("cadastrado com sucesso!");

      router.push('/');

    }catch(err){
      console.log("erro ao cadastrar", err);
    };
  };

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
      {children}
    </AuthContext.Provider>
  );
};