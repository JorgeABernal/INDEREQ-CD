import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import Scanner from './Screens/Scaner';
import Home from './Screens/Home';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App(){
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Fredoka-Bold': require('./assets/Fuentes/Fredoka/Fredoka-Bold.ttf'),
          'Fredoka-Light': require('./assets/Fuentes/Fredoka/Fredoka-Light.ttf'),
          'Fredoka-Medium': require('./assets/Fuentes/Fredoka/Fredoka-Medium.ttf'),
          'Fredoka-Regular': require('./assets/Fuentes/Fredoka/Fredoka-Regular.ttf'),
          'Fredoka-SemiBold': require('./assets/Fuentes/Fredoka/Fredoka-SemiBold.ttf'),
        })
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return(
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Scaner" component ={Scanner} />
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
