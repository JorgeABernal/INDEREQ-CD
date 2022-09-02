import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TouchableCmp from '../assetsUI/TouchableCmp';
import { usePreventScreenCapture } from 'expo-screen-capture';

let logoINDEREQ = require('../images/logo.png');
const actividades = ["Entrada/Salida", "Futbol", "Voleibol", "Atletismo"];

const oInitState = {
  id: '',
  nombreC: '',
  act: 'Entrada/Salida',
  fecha: '',
};

const Home = () =>{
  const [globalData, setGlobalData] = useState(oInitState);
  const [actData, setActAdata] = useState("Entrada/Salida");

  usePreventScreenCapture();
  
  const formatData = data => {
    let { idPropio, nombre, apellidoP, apellidoM } = JSON.parse(data);
    let nombreCompleto = `${nombre} ${apellidoP} ${apellidoM}`;
  
    return {
      ...globalData,
      id: idPropio,
      nombreC: nombreCompleto, 
      fecha: new Date()
    };
  };

  useEffect(() => {
    (async () => {
      setGlobalData(formatData(await getClave()));
    })();
  }, []);
  
  const getClave = async () => await AsyncStorage.getItem("data");

  const handleQR = selectedItem => {
    if (selectedItem) {
      setActAdata(selectedItem);
    }

    setGlobalData({
      ...globalData,
      act: selectedItem ? selectedItem : actData,
      fecha: new Date()
    });
  };

  //* To visualize
  useEffect(() => {
    if (globalData.fecha !== '') {
      console.log("->", globalData, "\nFecha", globalData.fecha.toString());
    }
  }, [globalData]);

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
        <Text style={styles.texto2}>{globalData.nombreC}</Text>
        <Text style={styles.texto4}>¿Qué actividad estás realizando?</Text>
      </View>
      <View style={styles.select}>
        <SelectDropdown 
            searchPlaceHolder='Selecciona una actividad'
            data={actividades}
            onSelect={handleQR}
            defaultButtonText={actData}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
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
      <View style={{overflow: 'hidden', borderRadius: 200, transform: [{scaleX: 1.6}]}}>
        <TouchableCmp onPress={handleQR}>
          <View style={styles.cuadrante3}>
            <QRCode value={JSON.stringify(globalData)} size={Dimensions.get('window').width*0.5} logo={logoINDEREQ}/>
          </View>
        </TouchableCmp>
      </View>
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
    transform: [{scaleY: 1.6}]
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
    marginTop: Dimensions.get('window').width*0.01,
    marginBottom: Dimensions.get('window').width*0.01,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Fredoka-Regular',
    fontSize:25
  },
  texto3:{
    fontSize: Dimensions.get('window').width*0.025,
    textAlign: 'center',
    color: '#DDD',
    marginTop: Dimensions.get('window').width*0.02
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
  dropdown1BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontFamily:'Fredoka-Light',
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
    marginTop:Dimensions.get('window').height*-.043
  },
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left',fontFamily:'Fredoka-Light',},
  select:{
  }
});