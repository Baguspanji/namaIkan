import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Route from './src/routes'

function App() {
  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}

export default App;