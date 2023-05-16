import React, { useState } from 'react';
import {StyleSheet, View, TextInput, Text, Platform} from 'react-native';
import axios from 'axios';
import {defaultStyles, linkerURI} from "./styles";
import TextLink from "./TextLink";
import CustomButton from "./CustomButton";
import {pusher} from "./bll";

const LoginScreen = ({navigation}) => {
    // TODO
    const [username, setUsername] = useState('Meow');
    const [password, setPassword] = useState('Weom');

    const loadScreen = (nameScreen, token='', from={}) => {
        const data = {...from, ...token}
        navigation.navigate(nameScreen, data)
    }
    const handleLogin = () => {
        const data = {
            username: username,
            password: password,
        };
        setUsername('')
        setPassword('')
        if (data.username.length <= 2 && data.password.length < 6) {
            if (Platform.OS === 'android') {
                pusher('Поля должны быть заполнены')
            }
            else console.log('Поля должны быть заполнены');
        }
        else {
            if (Platform.OS === 'android') {
                pusher('Попытка авторизации')
            }
            else console.log('Попытка авторизацииы');
            axios.post(linkerURI.login, data)
                .then(response => {
                    loadScreen('Меню', {token: response.data.auth_token, login: username})
                    console.log(response.data.auth_token);
                })
                .catch(error => {
                    if (Platform.OS === 'android') {
                        pusher('Неверные данные')
                    }
                    else {
                        console.log(error)
                    }
                });
        }
    };

    const buttons = [
        {
            text: 'Войти',
            action: handleLogin,
            isActive: true,
            styles: {
                btnBox: {
                    ...style.buttonBox,
                    width: '60%',
                    borderBottomLeftRadius: 15,
                    backgroundColor: defaultStyles.buttons.green,
                },
                btnText: style.buttonTextStyle,
            }
        },
        {
            text: 'Регистрация',
            action: () => loadScreen('Регистрация','',{from:'Страница авторизации'}),
            isActive: true,
            styles: {
                btnBox: {
                    ...style.buttonBox,
                    width: '40%',
                    borderBottomRightRadius: 15,
                    backgroundColor: defaultStyles.buttons.yellow,
                },
                btnText: style.buttonTextStyle,
            }
        }
    ]

    return (
        <View style={{justifyContent: 'space-between', flex: 1, backgroundColor: defaultStyles.backGround,}}>
            <View style={style.field}>
                <View style={style.innerBlock}>
                    <Text style={{marginVertical: 5, fontSize: 16, fontWeight: 500}}>Логин</Text>
                    <TextInput
                        placeholder="Введи логин..."
                        value={username}
                        onChangeText={setUsername}
                        style={style.inputField}
                    />
                    <Text style={{marginVertical: 5, fontSize: 16, fontWeight: 500}}>Пароль</Text>
                    <TextInput
                        placeholder="Введи пароль..."
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        style={style.inputField}
                    />
                    <View style={style.buttonField}>
                        {buttons.map( (element, index) => <CustomButton text={element.text} isActive={element.isActive} actionFunc={element.action} style={element.styles} key={index} />)}
                    </View>
                </View>
            </View>
            <View style={style.banner}>
                <TextLink text={'GitHub: WittyB0y'} url={'https://github.com/WittyB0y'}/>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    buttonBox: {
        height: '100%',
        bottom: 0,
        // border: '1px solid black',
        borderRadius: 0,
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextStyle: {
        color: 'black',
        fontWeight: 600,
        fontSize: 16
    },
    innerBlock: {
        paddingTop: 20,
        paddingBottom: 45,
        borderRadius: 15,
        backgroundColor: 'rgba(161,161,161,0.36)',
        width: '80%',
        height: 220,
        minHeight: 190,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    field: {
        display: `flex`,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '85%',
        alignItems: 'center'
    },

    banner: {
        width: '100%',
        height: '10%',
        minHeight: 45,
        backgroundColor: defaultStyles.backGround,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonField: {
        position: 'absolute',
        bottom: 0,
        display: `flex`,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 40,
        padding: 0,
        margin: 0

    },

    inputField: {
        backgroundColor: '#e8e8e8',
        width: '85%',
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 10,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },

})

export default LoginScreen;