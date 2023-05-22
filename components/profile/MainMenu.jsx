import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {defaultStyles, deviceINFO, linkerURI} from "../styles";
import axios from "axios";
import CustomButton from "../CustomButton";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ProfileModal from "./ProfileModal";
import {logout, percentWidth, pusher} from "../bll";

const devIDdev = deviceINFO.id

async function controllerPermis(navigation, data, userid, token) {


    if (data == null) {
        const data = { devid: devIDdev };
        const config = {headers: { Authorization: `Token ${token}` } }
        axios.patch(`${linkerURI.checkDevId}${userid}/`, data, config)
            .then(response => {
                pusher('Аккаунт связан с устройством\nВ этот аккаунт можно будет войти только с этого устройства:).')
            })
            .catch(error => {
                console.error(error);
            });
        console.log('nullik')
    }
    else if (data === devIDdev) {pusher('Авторизация прошла успешно!')}
    else {
        pusher('Иди нах*й!\nАккаунт связан с другим устройством!')
        pusher('Ну, или ты просто ЛОХ и после обновления прошивки у тебя сменился DEVICE_ID:).\nЗаводи новый акк:)')
        navigation.goBack();
    }
}

const MainMenu = ({ route, navigation }) => {
    const [url, setUrl] = useState('');
    const [id, setId] = useState('');
    const [modalWindow, setModalWidow] = useState(false);
    const { token } = route.params;

    const loadScreen = (nameScreen, token= {}, from={}) => {
        const data = {token, ...from}
        navigation.navigate(nameScreen, data)
    }

    const buttons = [
        {
            title: 'Загрузить файлы',
            action: () => loadScreen('Загрузки', token),
            styles: {
                btnBox: {
                    backgroundColor: defaultStyles.buttons.green
                },
                btnText: {},
            }
        },
        {
            title: 'Доступные файлы',
            action: () => loadScreen('Файлы', token),
            styles: {
                btnBox: {
                    backgroundColor: defaultStyles.buttons.yellow
                },
                btnText: {},
            }
        },
        {
            title: 'Выйти',
            action: () => {
                logout(token);
                navigation.navigate('Страница авторизации');
            },
            styles: {
                btnBox: {
                    backgroundColor: defaultStyles.buttons.orange
                },
                btnText: {},
            }
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(linkerURI.userPhoto, { headers: { Authorization: `Token ${token}` } });
                setUrl(response.data[0].photo);
                // console.log('htis', response.data[0].photo)
                // await setId(response.data[0].userid)
                const ID = response.data[0].userid
                const checkDevid = await axios.get(`${linkerURI.checkDevId}${ID}/`, {headers: { Authorization: `Token ${token}` } });
                setId(ID)
                await controllerPermis(navigation, checkDevid.data.devid, ID, token)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [token]);

    console.log(url, 'url')
    return (
        <View style={css.bg}>
            <ProfileModal state={modalWindow} setState={setModalWidow} photoURI={url} token={token} id={id} setUrl={setUrl} />

            <View style={css.handler}>
                <View style={css.header}>
                    <TouchableWithoutFeedback onPress={() => setModalWidow(true) }>
                        {url ? (
                            <View style={css.header__image}>
                                <Image style={css.img} source={{uri: url}}/>
                            </View>

                            ) : <MaterialCommunityIcons name="gesture-tap" size={22} color="#fff" />}
                    </TouchableWithoutFeedback>
                    <Text style={css.header__text}>Привет, {route.params.login}!!!</Text>
                    <View style={css.header__description}>
                        <Text style={css.header__description__text}>Нажми на фотографию, чтобы обновить её</Text>
                        <MaterialCommunityIcons name="gesture-tap" size={percentWidth(5)} color="#fff" />
                    </View>
                    {/*<Text style={css.header__description__text}>Нажми на фото профиля, чтобы изменить его</Text>*/}
                </View>

                <ScrollView style={css.scroll}>
                    <View style={css.userData}>
                        {buttons.map( (element, index) => (
                            <CustomButton
                                key={index}
                                text={element.title}
                                actionFunc={element.action}
                                style={element.styles} />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const css = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: defaultStyles.backGround,
    },
    handler: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        width: '100%',
        height: '100%',
        // flex: 1,
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',

        width: '100%',
        height: '45%',
    },
    img: {
        height: '70%',
        aspectRatio: '1/1',
        // width: 200,
        marginTop: '3%',
        borderRadius: 100
    },
    img__icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 10
    },
    header__image: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header__text: {
        fontSize: 22,
        fontWeight: '600',
    },
    header__description: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header__description__text: {
        textAlign: 'center',

    },
    userData: {
        width: '100%',
        gap: 7,

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})

export default MainMenu;