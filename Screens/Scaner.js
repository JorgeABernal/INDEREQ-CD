import React, { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';


const Scanner = ({route}) =>{
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(()=>{
        (async ()=> {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) =>{
        setScanned(true);
        await AsyncStorage.setItem("data", data);
        navigation.navigate('Home');
    };
    
    if (hasPermission === null){
        return <Text>Requesting for camera permission</Text>
    }
    if (hasPermission === false){
        return <Text>No access to camera</Text>
    }

    return(
        <View style={styles.container}>
            <View style={styles.cuadrante1}>
                <Image
                    style={styles.logoTexto}
                    source={require('../images/indereq-logo-texto.png')}
                />
            </View>
            <View style={styles.cuadrante2}>
                <Text style={styles.texto1}>Bienvenido</Text>
                <Text style={styles.texto2}>Por favor,</Text>
                <Text style={styles.texto2}>escanéa el QR</Text>
            </View>
            <Camera
                onBarCodeScanned={scanned ? undefined:handleBarCodeScanned}
                style = {{height:Math.round((Dimensions.get('window').width)), width:Dimensions.get('window').width}}
                ratio={'1:1'}
            />
            <View style={styles.cuadrante3}>
                <Text style={styles.texto3}>{'Centro de Desarrollo \n Facultad de Informática UAQ \n Todos los derechos reservados 2022 (C)'}</Text>
            </View>
        </View>
    )
}

export default Scanner;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#266FB6',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    logoTexto:{
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        marginTop:Dimensions.get('window').height*.05
    },
    cuadrante1:{
        justifyContent: 'center',
        height: Dimensions.get('window').height*0.20,
    },
    cuadrante2:{
        // justifyContent: 'center',
        //backgroundColor: 'red',
        height: Dimensions.get('window').height*0.20
    },
    cuadrante3:{
        height: 'auto',
    },
    texto1:{
        fontSize: Dimensions.get('window').width*0.04,
        textAlign: 'center',
        color: 'white',
        marginTop: Dimensions.get('window').width*0.055,
        marginBottom: Dimensions.get('window').width*0.025,
        fontFamily:'Fredoka-Regular',
        fontSize:20,
    },
    texto2:{
        fontSize: Dimensions.get('window').width*0.065,
        textAlign: 'center',
        color: 'white',
        fontFamily:'Fredoka-Regular',
        fontSize:30,
    },
    texto3:{
        fontSize: Dimensions.get('window').width*0.025,
        textAlign: 'center',
        color: '#DDD',
        marginTop: Dimensions.get('window').width*0.05,
        marginTop: Dimensions.get('window').width*0.15,
        fontFamily:'Fredoka-Light',
    }
})
