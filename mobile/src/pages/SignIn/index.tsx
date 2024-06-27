import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { loginValidationSchema } from '../../schemas';
import Input from '../../components/input/index';

export default function SignIn() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassWord ] = useState('');

  function handleLogin(){
    console.log(email)

    if(email === '' || password === ''){
      return;
    }

  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/LogoPizzaria.png')}
      />
      
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={values => console.log(values)}
      >
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
              <Text style={styles.buttonText}>Acessar</Text>
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