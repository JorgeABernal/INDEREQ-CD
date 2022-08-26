import React, { useEffect } from "react";
import { Text, View, StyleSheet, Button, Linking, Dimensions, useWindowDimensions } from "react-native";
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

    const handleBarCodeScanned = ({ type, data }) =>{
        setScanned(true);
        //alert(`Scanned ${type} and ${data}`);
        navigation.navigate('Home',{datos:data});
    };
    
    if (hasPermission === null){
        return <Text>Requesting for camera permission</Text>
    }
    if (hasPermission === false){
        return <Text>No access to camera</Text>
    }

    return(
        <View style={styles.container}>
            <Text>Escanea el código para iniciar sesión</Text>
            <Camera
                onBarCodeScanned={scanned ? undefined:handleBarCodeScanned}
                style = {{height:Math.round((Dimensions.get('window').width * 4)/3), width:Dimensions.get('window').width}}
                ratio={'4:3'}
            />
        </View>
    )
}

export default Scanner;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
