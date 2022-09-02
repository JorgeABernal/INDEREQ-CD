import React, { useState, useEffect, useCallback } from 'react';
import { View,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

import Scanner from './Screens/Scaner';
import Home from './Screens/Home';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App(){
  const [appIsReady, setAppIsReady] = useState(false);;
  /*const {loadedFont} = ({
    'Fredoka-Bold': require('./assets/Fuentes/Fredoka/Fredoka-Bold.ttf'),
    'Fredoka-Light': require('./assets/Fuentes/Fredoka/Fredoka-Light.ttf'),
    'Fredoka-Medium': require('./assets/Fuentes/Fredoka/Fredoka-Medium.ttf'),
    'Fredoka-Regular': require('./assets/Fuentes/Fredoka/Fredoka-Regular.ttf'),
    'Fredoka-SemiBold': require('./assets/Fuentes/Fredoka/Fredoka-SemiBold.ttf'),
  });*/

  /*const fetchFonts = () =>{
    return Font.loadAsync({
      'Fredoka-Bold': require('./assets/Fuentes/Fredoka/Fredoka-Bold.ttf'),
      'Fredoka-Light': require('./assets/Fuentes/Fredoka/Fredoka-Light.ttf'),
      'Fredoka-Medium': require('./assets/Fuentes/Fredoka/Fredoka-Medium.ttf'),
      'Fredoka-Regular': require('./assets/Fuentes/Fredoka/Fredoka-Regular.ttf'),
      'Fredoka-SemiBold': require('./assets/Fuentes/Fredoka/Fredoka-SemiBold.ttf'),
    })*/

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'Fredoka-Bold': require('./assets/Fuentes/Fredoka/Fredoka-Bold.ttf'),
          'Fredoka-Light': require('./assets/Fuentes/Fredoka/Fredoka-Light.ttf'),
          'Fredoka-Medium': require('./assets/Fuentes/Fredoka/Fredoka-Medium.ttf'),
          'Fredoka-Regular': require('./assets/Fuentes/Fredoka/Fredoka-Regular.ttf'),
          'Fredoka-SemiBold': require('./assets/Fuentes/Fredoka/Fredoka-SemiBold.ttf'),
        })
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        //await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        console.log("Si se pudo");
        console.log("app is ready: " + appIsReady);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
      console.log("segundo check : " + appIsReady)
      console.log("App is ready");
    }
  }, [appIsReady]);

  if (!appIsReady) return null, console.log("App is not ready");

  return(
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Scaner" component ={Scanner} />
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
