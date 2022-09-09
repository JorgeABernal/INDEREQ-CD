import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Alert} from 'react-native';
import { usePreventScreenCapture } from 'expo-screen-capture';
import { useNavigation } from '@react-navigation/native';
import { useFetchClave } from '../Hooks/Clave.hook';
import QRCode from 'react-native-qrcode-svg';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TouchableCmp from '../assetsUI/TouchableCmp';

let logoINDEREQ = require('../images/logo.png');

const oInitState = {
  id: '',
  nombreC: '',
  fecha: '',
};

const Home = () =>{
  const [globalData, setGlobalData] = useState(oInitState);
  const [clave] = useFetchClave();
  const navigation = useNavigation();

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

  // * Prevent go back to scan screen
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    })
  }, [navigation]);

  useEffect(() => {
    if (clave) {
      setGlobalData(formatData(clave));
    }
  }, [clave]);

  const handleQR = () => {
    setGlobalData({
      ...globalData,
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
        <Text style={styles.texto4}>&#9432; Toca tu QR para actualizarlo &#9432;</Text>
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
    height: Dimensions.get('window').height*0.225
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
    width: Dimensions.get('window').width*1,
    marginTop: Dimensions.get('window').width*0.01,
    marginBottom: Dimensions.get('window').width*0.01,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Fredoka-Regular',
    fontSize:25
  },
  texto3:{
    fontSize: Dimensions.get('window').width*0.03,
    textAlign: 'center',
    color: '#DDD',
    marginTop: Dimensions.get('window').width*0.025
  },
  texto4:{
    // width: Dimensions.get('window').width*0.9,
    fontFamily: 'Fredoka-Regular',
    marginTop: Dimensions.get('window').width*0.025,
    paddingVertical: Dimensions.get('window').width*0.015,
    fontSize: Dimensions.get('window').width*0.0275,
    backgroundColor: '#FFF',
    textAlign: 'center',
    color: '#000',
    fontWeight: '700',
    // borderWidth: Dimensions.get('window').width*0.01,
    borderColor: '#A00'
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