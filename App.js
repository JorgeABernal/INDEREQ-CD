import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';
// import QRDinamico from './components/QRDinamico';
// import logo from '.INDEREQ/images';

import QRCode from 'react-native-qrcode-svg';


export default function App() {
  const BotonEspecial = () =>{
    var fecha = new Date().toDateString();
    fecha = fecha.split(" ")
    // console.log(fecha);
    
    var id = "MarioNinja1526";
    var hora = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    var pinAleatorio = [];
    // var pinAleatorio = Math.round(Math.random()*10);
    for (let i = 0; i < 4; i++) {
      var pinAleProv;
      pinAleProv = Math.round(Math.random()*10)
      if (pinAleProv <= 9) {
        pinAleatorio.push(pinAleProv)   
      } else {
        i--;
      }
    }

    var pinFinal = '' + pinAleatorio[0] + pinAleatorio[1] + pinAleatorio[2] + pinAleatorio[3]; 
    // console.log("PIN ALEATORIO[0]" + pinAleatorio[0]);
    // console.log("PIN ALEATORIO[1]" + pinAleatorio[1]);
    // console.log("PIN ALEATORIO[2]" + pinAleatorio[2]);
    // console.log("PIN ALEATORIO[3]" + pinAleatorio[3]);
    // console.log("PIN ALEATORIO FULL" + pinAleatorio);
    var data = '{"anio":' + fecha[3] +', "mes":"' + fecha[1] + '", "diaNum":' + fecha[2] + ', "dia":"' + fecha[0] + '"';
    data += ', "hora":' + hora + ', "min":' + min + ', "sec": ' + sec + ', "pin":' + pinFinal + '}'
    // var PRUEBA1 = {"anio" : fecha[3]};
    console.log("DATA>" + data);
    setdataGlobal(data);
  }
  let logoINDEREQ = require('./images/logo.png');
  const [dataGlobal, setdataGlobal] = useState();
  return (
    <View style={styles.container}>
      {/* <Text>{data}</Text> */}
      <QRCode value={dataGlobal} size={300} logo={logoINDEREQ}/>
      {/* <QRDinamico/> */}
      
      <Button onPress={BotonEspecial} title="holamundo">Hola Presioname</Button>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
