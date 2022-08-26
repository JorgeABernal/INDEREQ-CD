import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

let logoINDEREQ = require('./images/logo.png');

const subirClave = async (id) => {
  await AsyncStorage.setItem("id", id);
}

const bajarClave = async ()  => {
  const res = await AsyncStorage.getItem("id");
}

export default function App() {
  const [dataGlobal, setdataGlobal] = useState();
  
  // CLAVE TOMADA DEL SISTEMA 
  
  subirClave("hola");
  var id = "IdPrueba";
  bajarClave();

  //FUNCION PARA GENERAR QRs
  const GenerarQR = () =>{
    var fecha = new Date().toDateString();
    fecha = fecha.split(" ")
    
    var hora = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    var data = '{"id": "' + id + ', "anio":' + fecha[3] +', "mes":"' + fecha[1] + '", "diaNum":' + fecha[2] + ', "dia":"' + fecha[0] + '"';
    data += ', "hora":' + hora + ', "min":' + min + ', "sec": ' + sec + '}'
    console.log(data);
    setdataGlobal(data);
  }
  return (
    <View style={styles.container}>
      <QRCode value={dataGlobal} size={300} logo={logoINDEREQ}/>      
      <Button onPress={GenerarQR} title="Generar QR"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ABC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
