import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

let logoINDEREQ = require('../images/logo.png');

const subirClave = async (id) => {
  await AsyncStorage.setItem("id", id);
}

const bajarClave = async () => await AsyncStorage.getItem("id");

const Home = ({route}) =>{
  const [dataGlobal, setdataGlobal] = useState();

  useEffect(() => {
    let escaneo = route.params.datos;
    subirClave(escaneo);
    GenerarQR();
  }, []);

  const getClave = async () => await bajarClave();
  
  //FUNCION PARA GENERAR QRs
  const GenerarQR = async () =>{
    let fecha = new Date().toDateString().split(" ");
      
    let id = await getClave();
    let hora = new Date().getHours();
    let min = new Date().getMinutes();
    let sec = new Date().getSeconds();

    let data = `{
      "id": ${id}, 
      "anio": ${fecha[3]}, 
      "mes": ${fecha[1]}, 
      "diaNum": ${fecha[2]}, 
      "dia": ${fecha[0]}, 
      hora": ${hora}, 
      "min": ${min}, 
      "sec": ${sec}
    }`;
    setdataGlobal(data);
  }
  return (
    <View style={styles.container}>
      <Text>Info: {route.params.datos}</Text>
      <QRCode value={dataGlobal} size={300} logo={logoINDEREQ}/>      
      <Button onPress={GenerarQR} title="Generar QR"/>
      <StatusBar style="auto" />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ABC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
