import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native';
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
      <View style={styles.cuadrante1}>
        <Image
          style={styles.logoTexto}
          source={require('../images/indereq-logo-texto.png')}
        />
      </View>
      <View style={styles.cuadrante2}>
                <Text style={styles.texto1}>Bienvenido nuevamente</Text>
                <Text style={styles.texto2}>{route.params.datos}</Text>
                <Text style={styles.texto1}>¿Qué actividad estás realizando?</Text>
            </View>
      {/* <Text>Info: {route.params.datos}</Text> */}
      <View style={styles.cuadrante3}>
      </View>
      <View style={styles.QR}>
        <QRCode value={dataGlobal} size={Dimensions.get('window').width*0.75} logo={logoINDEREQ}/>      
      </View>
      {/* <Button onPress={GenerarQR} title="Generar QR"/> */}
      <Text style={styles.texto3}>{'Centro de Desarrollo \n Facultad de Informática UAQ \n Todos los derechos reservados 2022 (C)'}</Text>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#266FB6',
    alignItems: 'center',
  },
  logoTexto:{
    width: Dimensions.get('window').width,
    resizeMode: 'contain'
  },
  cuadrante1:{
    justifyContent: 'center',
    height: Dimensions.get('window').height*0.20
  },
  cuadrante2:{
    height: Dimensions.get('window').height*0.20
  },
  cuadrante3:{
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    backgroundColor: 'white',
    borderRadius: 300,
    transform: [{scaleX: 1.5}]
  },
  texto1:{
    fontSize: Dimensions.get('window').width*0.03,
    textAlign: 'center',
    color: 'white',
  },
  texto2:{
    fontSize: Dimensions.get('window').width*0.05,
    width: Dimensions.get('window').width*0.9,
    // height: Dimensions.get('window').width*0.15,
    marginTop: Dimensions.get('window').width*0.01,
    marginBottom: Dimensions.get('window').width*0.01,
    textAlign: 'center',
    color: 'white',
  },
  QR:{
    marginTop: Dimensions.get('window').width*-0.875
  },
  texto3:{
      fontSize: Dimensions.get('window').width*0.025,
      textAlign: 'center',
      color: '#DDD',
      marginTop: Dimensions.get('window').width*0.2
  }
});
