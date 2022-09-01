import React from 'react';
import {Platform} from 'react-native';
import {TouchableOpacity, TouchableNativeFeedback} from "react-native-gesture-handler";

const TouchableCmp = (props) =>{
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return(
        <TouchableComponent onPress={props.onPress} style={props.style} background={props.background}>
            {props.children}    
        </TouchableComponent>
    )
}

export default TouchableCmp;