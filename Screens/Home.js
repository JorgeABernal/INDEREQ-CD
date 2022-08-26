import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

let logoINDEREQ = require('../images/logo.png');

const subirClave = async (id) => {
  await AsyncStorage.setItem("id", id);
}

const bajarClave = async ()  =>{
    // return jsonValue != null ? JSON.parse(jsonValue):null;
    // const jsonValue = await AsyncStorage.getItem("id");
    return await AsyncStorage.getItem("id");
} 
//await AsyncStorage.getItem("id");


const Home = ({route}) =>{
  const [dataGlobal, setdataGlobal] = useState();
  const [clave, setClave] = useState("");

  useEffect(() => {
    let scaneo = route.params.datos;
    subirClave(escaneo);
    GenerarQR();
  }, []);

  const getClave = async () => await bajarClave();
  
  // CLAVE TOMADA DEL SISTEMA 
  var escaneo = route.params.datos;
  subirClave(escaneo);
  
  //FUNCION PARA GENERAR QRs
  const GenerarQR = async () =>{
      var fecha = new Date().toDateString();
      fecha = fecha.split(" ")
      
    var id = await getClave();
    var hora = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    var data = '{"id": "' + id + '", "anio":' + fecha[3] +', "mes":"' + fecha[1] + '", "diaNum":' + fecha[2] + ', "dia":"' + fecha[0] + '"';
    data += ', "hora":' + hora + ', "min":' + min + ', "sec": ' + sec + '}'
    console.log("DATOS: " +data);
    setdataGlobal(data);
    //setdataGlobal(escaneo);
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
