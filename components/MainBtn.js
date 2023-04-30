import {StyleSheet, View, Image, ScrollView} from "react-native";
import {defaultStyles} from "./styles";
import React, {useState} from "react";
import CustomButton from "./CustomButton";
import NewsModal from "./NewsModal/NewsModal";

export default function MainBtn({navigation}) {
    const [modalWindow, setModalWindow] = useState(true)

    const loadScreen = (nameScreen, token='', from={}) => {
        const data = {...token, ...from}
        navigation.navigate(nameScreen, data)
    }
    const Buttons = [
        {
            title: 'Войти',
            action: () => {loadScreen('Страница авторизации')},
            style: {
                btnBox: {
                    backgroundColor: defaultStyles.buttons.green
                },
                btnText: {}
            }
        },
        {
            title: 'Регистрация',
            action: () => {loadScreen('Регистрация', '',{from: 'Главная'})},
            style: {
                btnBox: {
                    backgroundColor: defaultStyles.buttons.yellow
                },
                btnText: {}
            }
        },
        {
            title: 'Новости',
            action: () => {setModalWindow(true)},
            style: {
                btnBox: {
                    backgroundColor: defaultStyles.buttons.orange
                },
                btnText: {}
            }
        },
        {
            title: 'О проекте',
            action: () => {loadScreen('О проекте')},
            style: {
                btnBox: {
                    backgroundColor: defaultStyles.buttons.purple
                },
                btnText: {}
            }
        },
    ]

    return (
        <View style={styles.container}>
            <NewsModal state={modalWindow} setState={setModalWindow} />

            <View style={styles.imgCont}>
                <Image style={styles.imgLogo} source={require('../assets/logoApp.png')}></Image>
            </View>

            <View style={styles.buttons}>
                <ScrollView>
                    {Buttons.map( (elem, index) => {
                        return (
                            <View style={styles.button} key={index}>
                                <CustomButton key={index} text={elem.title} actionFunc={elem.action} style={{btnBox: elem.style.btnBox, btnText: elem.style.btnText}}/>
                            </View>
                    )})}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        textAlign: 'center',
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: defaultStyles.backGround,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    imgLogo: {
        maxHeight: '50%',
        maxWidth: '60%',
        width: 250,
        height: 250,
        top: 50,
    },
    imgCont: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
        width: '100%'
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7
    },

    buttons: {
        position: 'relative',
        maxHeight: '40%',
        height: '35%',
        marginBottom: 10
    },
    customButtonBox:{
        width: '50%'
    },
    customButtonText:{
        color: '#6c00ff'
    },
});

