import {StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/AuthContaxtt';

import Routes from './src/routes'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar  backgroundColor='#FAF6E8' barStyle='dark-content' translucent={false}/>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
};

