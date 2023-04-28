import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native';
import { usePreventScreenCapture } from 'expo-screen-capture';
import { useNavigation } from '@react-navigation/native';
import { useFetchClave } from '../Hooks/Clave.hook';
import QRCode from 'react-native-qrcode-svg';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TouchableCmp from '../assetsUI/TouchableCmp';
const { width, height, fontScale } = Dimensions.get('window');

let logoINDEREQ = require('../images/logo.png');

const oInitState = {
  id: '',
  nombreC: '',
  fecha: '',
};

const Home = () => {
  const [globalData, setGlobalData] = useState(oInitState);
  const [clave] = useFetchClave();
  const navigation = useNavigation();

  usePreventScreenCapture();

  const formatData = data => {
    let { id, nombres, apellidos } = JSON.parse(data);
    let nombreCompleto = `${nombres} ${apellidos}`;

    return {
      ...globalData,
      id: id,
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
          source={require('../images/FIF_logo_texto.png')}
        />
      </View>
      <View style={styles.cuadrante2}>
        <Text style={styles.texto1}>Bienvenido nuevamente</Text>
        <Text style={styles.texto2}>{globalData.nombreC}</Text>
        <Text style={styles.texto4}>&#9432; Toca tu QR para actualizarlo &#9432;</Text>
      </View>
      <View style={styles.cuadrante3}>
        <View style={styles.cuadrante3a}>
          <TouchableCmp onPress={handleQR}>
            <View style={styles.cuadrante3b}>
              <QRCode value={JSON.stringify(globalData)} size={Dimensions.get('window').width * 0.75} logo={logoINDEREQ} />
            </View>
          </TouchableCmp>
        </View>
      </View>
      <View style={styles.cuadrante4}>
        <Text style={styles.texto3}>{'Centro de Desarrollo \n Facultad de Informática UAQ \n Todos los derechos reservados 2023 (C)'}</Text>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3070B0',
    alignItems: 'center',
  },
  cuadrante1: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  logoTexto: {
    width: width,
    resizeMode: 'contain',
  },
  cuadrante2: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  texto1: {
    fontSize: 15 / fontScale,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Fredoka-Light',
  },
  texto2: {
    fontSize: 30 / fontScale,
    width: Dimensions.get('window').width * 1,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Fredoka-Regular',
  },
  texto3: {
    fontSize: 10 / fontScale,
    textAlign: 'center',
    color: '#DDD',
  },
  texto4: {
    width: width,
    height: 30,
    textAlignVertical: 'center',
    backgroundColor: '#FFF',
    borderColor: '#A00',
    fontFamily: 'Fredoka-Regular',
    fontSize: 15 / fontScale,
    textAlign: 'center',
    color: '#000',
    fontWeight: '700',
  },
  cuadrante3: {
    flex: 1,
    justifyContent: 'center',
  },
  cuadrante3a: {
    width: width*1.2,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 200,
  },
  cuadrante3b: {
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cuadrante4: {
    width: width,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  }
});