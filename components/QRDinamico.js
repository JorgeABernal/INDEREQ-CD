import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {  View, Text } from 'react-native';

const QRDinamico = (props) =>{
    var fecha = new Date().toDateString();
    var hora = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    var data = '{fecha : ' + fecha +', hour : '+ hora+ ', min : ' + min + ', sec : ' + sec + '}'
    // JSON.parse(data);
    
    return(
        <View>
            <Text>{data}</Text>
        {/* <QRCode value={data}/> */}
    </View>
)
}
export default QRDinamico;

