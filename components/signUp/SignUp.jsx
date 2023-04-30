import React, { useState } from 'react';
import {StyleSheet, View, TextInput, Text, Platform, ToastAndroid} from 'react-native';
import axios from 'axios';
import {defaultStyles, linkerURI} from "../styles";
import TextLink from "../TextLink";
import CustomButton from "../CustomButton";

const pusher = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
};
const SignUp = ({route, navigation}) => {
    const { from } = route.params;
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loadScreen = () => {
        if (from === 'Главная') {
            navigation.navigate('Страница авторизации')
        }
        else {
            navigation.goBack();
        }

    }
    const handleLogin = () => {
        const data = {
            email: email,
            username: username,
            password: password,
        };
        setUsername('')
        setEmail('')
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
            else console.log('Попытка авторизации');
            axios.post(linkerURI.register, data)
                .then(response => {
                    pusher(`Регистрация завершена успешно!\nusername:${response.data.username}\nemail:${response.data.email}`)
                    loadScreen()
                })
                .catch(error => {
                    if (Platform.OS === 'android') {
                        pusher('Убедитесь в корректности данных')
                    }
                    else {
                        console.log(error)
                    }
                });
        };
    };

    const buttons = [
        {
            text: 'Зарегистрироваться',
            action: handleLogin,
            styles: {
                btnBox: {
                    ...style.buttonBox,
                    width: '60%',
                    borderBottomLeftRadius: 15,
                    backgroundColor: defaultStyles.buttons.yellow,
                },
                btnText: style.buttonTextStyle,
            }
        },
        {
            text: 'Авторизация',
            action: () => loadScreen(),
            styles: {
                btnBox: {
                    ...style.buttonBox,
                    width: '40%',
                    borderBottomRightRadius: 15,
                    backgroundColor: defaultStyles.buttons.green,
                },
                btnText: style.buttonTextStyle,
            }
        }
    ]

    return (
        <View style={{justifyContent: 'space-between', flex: 1, backgroundColor: defaultStyles.backGround,}}>
            <View style={style.field}>
                <View style={style.innerBlock}>
                    <Text style={{marginVertical: 5, fontSize: 16, fontWeight: 500}}>Email</Text>
                    <TextInput
                        placeholder="Введи электронную почту..."
                        value={email}
                        onChangeText={setEmail}
                        style={style.inputField}
                    />
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
                        {buttons.map( (element, index) => <CustomButton text={element.text} actionFunc={element.action} style={element.styles} key={index}/>)}
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
        borderRadius: 0,
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextStyle: {
        color: 'black',
        fontWeight: 600,
        letterSpacing: 1,
        fontSize: 16
    },

    innerBlock: {
        paddingTop: 20,
        paddingBottom: 45,
        borderRadius: 15,
        backgroundColor: 'rgba(161,161,161,0.36)',
        width: '80%',
        height: 290,
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

export default SignUp;