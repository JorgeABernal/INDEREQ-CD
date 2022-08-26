import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Scanner from './Screens/Scaner';
import Home from './Screens/Home';

const Stack = createStackNavigator();

function App(){
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Scaner" component ={Scanner} />
      <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
  )
}

export default () =>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

