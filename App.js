import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

import Scanner from './Screens/Scaner';
import Home from './Screens/Home';

const Stack = createStackNavigator();

function App(){
  const [fontLoaded, setFontLoaded] = useState(false)


  const fetchFonts = () =>{
    return Font.loadAsync({
      'Fredoka-Bold': require('./assets/Fuentes/Fredoka/Fredoka-Bold.ttf'),
      'Fredoka-Light': require('./assets/Fuentes/Fredoka/Fredoka-Light.ttf'),
      'Fredoka-Medium': require('./assets/Fuentes/Fredoka/Fredoka-Medium.ttf'),
      'Fredoka-Regular': require('./assets/Fuentes/Fredoka/Fredoka-Regular.ttf'),
      'Fredoka-SemiBold': require('./assets/Fuentes/Fredoka/Fredoka-SemiBold.ttf'),
    })
  }
  if(!fontLoaded){
    return(
      <AppLoading
          startAsync={fetchFonts}
          onFinish={()=>setFontLoaded(true)}
          onError={console.warn}
      />
    )
  }

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

