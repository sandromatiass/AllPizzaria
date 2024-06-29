import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { loginValidationSchema } from '../../schemas';
import Input from '../../components/input/index';
import { AuthContext } from '../../contexts/AuthContaxtt';

export default function SignIn() {

  const { signIn, loadingAuth } = useContext(AuthContext)

  async function handleLogin(
    values: {
      email: string; 
      password: string
    }, 
      setSubmitting: (isSubmiting: boolean) => void
    ) {
      try {
        await signIn(values);
      } catch {
        console.log('erro ao fazer login!!')
      }finally {
        setSubmitting(false);
      }
    };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/LogoPizzaria.png')}
      />
      
      <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={loginValidationSchema}
          onSubmit={(values, {setSubmitting}) => {
            if (!values.email || !values.password) {
              setSubmitting(false);
              return;
            }
            setSubmitting(true);
            handleLogin(values, setSubmitting); 
          }}>
        {({ handleSubmit }) => (
          <View style={styles.inputContainer}>
            <Input
              name="email"
              placeholder="Digite seu email"
              placeholderTextColor="#9E9E9E"
            />

            <Input
              name="password"
              placeholder="Digite sua senha"
              placeholderTextColor="#9E9E9E"
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              { loadingAuth ? (
                <ActivityIndicator size={25} color='#BE1010'/>
              ) : (
                <Text style={styles.buttonText}>Acessar</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF6E8'
  },
  logo: {
    marginBottom: 18,
    width: '65%',
    height: 150
  },
  inputContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  button: {
    width: '95%',
    height: 40,
    backgroundColor: '#BE1010',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
});