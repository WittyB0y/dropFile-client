import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';

const CustomBtn = ({textData,actionFunc, btnBox, btnTextStyle}) => {
    return (
        <TouchableWithoutFeedback onPress={actionFunc} >
            <View style={btnBox}><Text  style={btnTextStyle}>{textData}</Text></View>
        </TouchableWithoutFeedback>
    );
};


export default CustomBtn;