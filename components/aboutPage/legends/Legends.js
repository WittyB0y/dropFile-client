import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export default function Legends({photoUrl, TextDes}) {
    return (
        <View style={{alignItems:'center', justifyContent: 'center', display: 'flex'}}>
            <Image borderRadius={100} style={styles.img}  source={photoUrl}></Image>
            <Text style={{textAlign: 'center', fontWeight: '700'}}>{TextDes}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 120,

    },
});