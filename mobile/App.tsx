import {StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar  backgroundColor='#FAF6E8' barStyle='dark-content' translucent={false}/>
      <Routes/>
    </NavigationContainer>
  );
}

