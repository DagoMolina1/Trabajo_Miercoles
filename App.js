import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import NavigationBottomStack from './components/Navigation/BottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <NavigationBottomStack/>
    </NavigationContainer>
  )
}