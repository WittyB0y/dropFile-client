import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

export default function CustomButton({text, actionFunc, isActive = true , style = {btnBox: {}, btnText: {}}}){
    return (
        <TouchableWithoutFeedback onPress={actionFunc} disabled={!isActive} >
            <View style={{...css.buttonBox, ...style.btnBox}}>
                <Text style={{...css.buttonText, ...style.btnText}}>{text}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const css = StyleSheet.create({
    buttonBox: {
        backgroundColor: '#dedede',
        paddingVertical: 10,
        borderRadius: 10,
        width: '70%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 1
    }
})