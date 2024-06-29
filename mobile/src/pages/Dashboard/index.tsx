import React, {useContext, useState} from 'react';

import { AuthContext } from '../../contexts/AuthContaxtt';

import { 
  SafeAreaView, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet 
} from 'react-native';

import { useNavigation } from '@react-navigation/native'; 
import { StackParamsList } from '../../routes/app.routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function Dashboard(){

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const { signOut } = useContext(AuthContext);

  const [ table, setTable ] = useState('');

  async function openOrder(){
    if(table === ''){
      return;
    }

    navigation.navigate('Order', { number: table, order_id: ''});
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Novo pedido</Text>

      <TextInput
        placeholder='Número da mesa'
        placeholderTextColor='#9E9E9E'
        style={styles.input}
        keyboardType='numeric'
        value={table}
        onChangeText={setTable}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#FAF6E8'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#BE1010',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#9E9E9E',
    borderColor: '#9E9E9E',
    borderWidth: 1,
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#BE1010',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  }
})