import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TextInput
 } from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

type RouteDetailParams = {
  Order: {
    number: string | number;
    order_id: string;
  }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order(){

  const route = useRoute<OrderRouteProps>();

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        <TouchableOpacity >
          <Feather name='trash-2' size={28} color='#BE1010'/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input}>
        <Text style={{ color: '#000' }}>Pizzas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input}>
        <Text style={{ color: '#000' }}>Pizzas Calabresa</Text>
      </TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput 
          style={[styles.input, { width: '60%', textAlign: 'center'}]}
          placeholder='1'
          placeholderTextColor='#9E9E9E'
          keyboardType='numeric'
          value='1'
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6E8',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize:30,
    fontWeight: 'bold',
    color: '#2C9A22',
    marginRight: 14,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    width: '100%',
    height: 40,
    marginBottom: 12, 
    justifyContent: 'center',
    paddingHorizontal: 8,
    //Sobra para IOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombra para Android
    elevation: 5,
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  qtdText: {
    fontSize: 24,
    color: '#BE1010',
    fontWeight: 'bold',
    //Sobra para IOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombra para Android
    elevation: 5,
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonAdd: {
    backgroundColor: '#2C9A22',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#BE1010',
    height: 40,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  }

})