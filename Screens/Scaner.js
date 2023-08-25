import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ActivityIndicator, Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { useFetchClave } from '../Hooks/Clave.hook';
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';

const { width, height, fontScale } = Dimensions.get('window');

const Scanner = () =>{
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [clave, loading] = useFetchClave();
  const navigation = useNavigation();

  // ? If you want to try the scanner screen, comment the following useEffect 
  // ? (and some lines below in the return)
  // useEffect(() => {
  //   if (clave) {
  //     navigation.navigate('Home');
  //   }
  // }, [clave]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    
    const msgError = () => Alert.alert(
      "Error", "El código QR no es válido", 
      [
        { 
          text: "OK",
          onPress: () => setScanned(false)
        }
      ]
    );

    let correctData = true;
    let dataKeys = [];

    try {
      console.log('JSON', typeof JSON.parse(data));
      dataKeys = Object.keys(JSON.parse(data));
    } catch(error) {
      console.log(error);
      msgError();
    }

    if (dataKeys.length === 3) {
      dataKeys.forEach(key => {
        if (!["id", "nombres", "apellidos"].includes(key)) {
          correctData = false;
        }
      });
    } else {
      correctData = false;  
    }

    if (correctData) {
      setScanned(true);
      await AsyncStorage.setItem("data", data);
      navigation.navigate('Home');
    } else {
      msgError();
      setScanned(false);
    }
  };
  
  if  (hasPermission === null){
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false){
    return <Text>No access to camera</Text>
  }

  return !loading ? (
    // return(
    <View style={styles.container}>
      <View style={styles.cuadrante1}>
        <Image
          style={styles.logoTexto}
          source={require('../images/FIF_logo_texto.png')}
        />
      </View>
      <View style={styles.cuadrante2}>
        <Text style={styles.texto1}>Bienvenido</Text>
        <Text style={styles.texto2}>Escanéa el QR</Text>
        <Text style={styles.texto4}>(El código QR te lo otoragaran los coordinadores)</Text>
      </View>
      <View style={styles.cuadrante3}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style = {styles.camera}
          ratio={'1:1'}
        />
      </View>
      <View style={styles.cuadrante4}>
        <Text style={styles.texto3}>{'Centro de Desarrollo \n Facultad de Informática UAQ \n Todos los derechos reservados 2023 (C)'}</Text>
      </View>
    </View>
  // )
  ) : null;
}

export default Scanner;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#3070B0',
    alignItems: 'center',
  },
  cuadrante1:{
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTexto:{
    width: width,
    resizeMode: 'contain',
  },
  cuadrante2:{
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cuadrante3:{
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cuadrante4:{
    width: width,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto1:{
    fontSize: 20 / fontScale,
    textAlign: 'center',
    color: 'white',
    fontFamily:'Fredoka-Regular',
  },
  texto2:{
    fontSize: 30 / fontScale,
    width: width,
    textAlign: 'center',
    color: 'white',
    fontFamily:'Fredoka-Regular',
  },
  texto3:{
    fontSize: 15 / fontScale,
    textAlign: 'center',
    color: '#DDD',
    fontFamily:'Fredoka-Light',
  },
  texto4:{
    fontSize: 15 / fontScale,
    color: "#FFF",
  },
  camera:{
    height: width,
    width: width,
  }
})
