import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

let logoINDEREQ = require('../images/logo.png');
const actividades = ["Entrada/Salida", "Futbol", "Voleibol", "Atletismo"];

const subirClave = async (id) => {
  await AsyncStorage.setItem("id", id);
}

const bajarClave = async () => await AsyncStorage.getItem("id");

const Home = ({route}) =>{
  const [dataGlobal, setdataGlobal] = useState();
  const [valor, setValor] = useState(0);
  let valorAct = 0;

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
      "sec": ${sec},
      "act": ${valorAct},
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
        <Text style={styles.texto4}>¿Qué actividad estás realizando?</Text>
      </View>
      {/* <Text>Info: {route.params.datos}</Text> */}
      <View style={styles.select}>
        <SelectDropdown 
          	data={actividades}
            onSelect={(selectedItem, index) => {  //Egypt 0, Canada 1
              valorAct = index;
              GenerarQR();
            }}
            defaultButtonText={'Selecciona una actividad'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
      </View>
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
    resizeMode: 'contain',
    marginTop:Dimensions.get('window').height*0.05
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
    transform: [{scaleX: 1.6}]
  },
  texto1:{
    fontSize: Dimensions.get('window').width*0.03,
    textAlign: 'center',
    color: 'white',
    fontFamily:'Fredoka-Light',
    marginTop:Dimensions.get('window').height*.02,
    fontSize:12
  },
  texto2:{
    fontSize: Dimensions.get('window').width*0.05,
    width: Dimensions.get('window').width*0.9,
    // height: Dimensions.get('window').width*0.15,
    marginTop: Dimensions.get('window').width*0.01,
    marginBottom: Dimensions.get('window').width*0.01,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Fredoka-Regular',
    fontSize:25
  },
  texto4:{
    fontSize: Dimensions.get('window').width*0.03,
    textAlign: 'center',
    color: 'white',
    fontFamily:'Fredoka-Light',
    marginTop:Dimensions.get('window').height*.02,
    fontSize:12
  },
  QR:{
    marginTop: Dimensions.get('window').width*-0.875
  },
  texto3:{
      fontSize: Dimensions.get('window').width*0.025,
      textAlign: 'center',
      color: '#DDD',
      marginTop: Dimensions.get('window').width*0.2
  },
  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginTop: Dimensions.get('window').height*-.03,
    marginBottom: Dimensions.get('window').height*.03,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left',fontFamily:'Fredoka-Light',},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF', marginTop:Dimensions.get('window').height*-.043},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left',fontFamily:'Fredoka-Light',},
  select:{
  }
});
