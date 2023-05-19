import {Modal, Text, View, StyleSheet, TextInput, ScrollView} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {percentWidth, pusher} from "../../bll";
import {useState} from "react";
import CustomButton from "../../CustomButton";
import axios from "axios";
import {linkerURI} from "../../styles";
import User from "./User";

const ModalUpload = ({state, setState, fileName, token, data}) => {
    const [user, setUser] = useState('')
    const [accessPeriod, setAccessPeriod] = useState('');

    // console.log(fileName)
    // const data = [
    //     {
    //         "id": 27,
    //         "lookingSeeUsers": [
    //             {
    //                 "id": 2,
    //                 "username": "Meow",
    //                 "photo_url": "/media/users/2/profile/profile_photo_be169678-b17b-45e6-b090-31d111fb5965.png "
    //             }
    //         ],
    //         "createdAt": "2023-05-19T20:36:07.878693+03:00",
    //         "existBefore": "2023-05-19T20:41:07.877950+03:00",
    //         "seenUser": 0,
    //         "webSee": false,
    //         "userSeeClient": true,
    //         "amount": 0,
    //         "fileid": 6
    //     },
    //     {
    //         "id": 28,
    //         "lookingSeeUsers": [
    //             {
    //                 "id": 2,
    //                 "username": "Meow",
    //                 "photo_url": "/media/users/2/profile/profile_photo_29bd7ab6-8579-4ee7-8de3-159df17dd83c.png"
    //             }
    //         ],
    //         "createdAt": "2023-05-19T20:45:41.941035+03:00",
    //         "existBefore": "2023-05-20T11:00:41.941035+03:00",
    //         "seenUser": 0,
    //         "webSee": false,
    //         "userSeeClient": true,
    //         "amount": 0,
    //         "fileid": 6
    //     },
    //     {
    //         "id": 29,
    //         "lookingSeeUsers": [
    //             {
    //                 "id": 2,
    //                 "username": "Meow",
    //                 "photo_url": "/media/users/2/profile/profile_photo_29bd7ab6-8579-4ee7-8de3-159df17dd83c.png"
    //             }
    //         ],
    //         "createdAt": "2023-05-19T21:32:46.004530+03:00",
    //         "existBefore": "2023-05-21T08:54:46.004530+03:00",
    //         "seenUser": 0,
    //         "webSee": false,
    //         "userSeeClient": true,
    //         "amount": 0,
    //         "fileid": 6
    //     },
    //     {
    //         "id": 30,
    //         "lookingSeeUsers": [
    //             {
    //                 "id": 2,
    //                 "username": "Meow",
    //                 "photo_url": "/media/users/2/profile/profile_photo_29bd7ab6-8579-4ee7-8de3-159df17dd83c.png"
    //             }
    //         ],
    //         "createdAt": "2023-05-19T21:33:02.173522+03:00",
    //         "existBefore": "2023-05-22T21:33:02.173522+03:00",
    //         "seenUser": 0,
    //         "webSee": false,
    //         "userSeeClient": true,
    //         "amount": 0,
    //         "fileid": 6
    //     },
    //     {
    //         "id": 31,
    //         "lookingSeeUsers": [
    //             {
    //                 "id": 2,
    //                 "username": "Meow",
    //                 "photo_url": "/media/users/2/profile/profile_photo_29bd7ab6-8579-4ee7-8de3-159df17dd83c.png"
    //             }
    //         ],
    //         "createdAt": "2023-05-19T23:10:02.189095+03:00",
    //         "existBefore": "2023-05-20T02:52:02.189095+03:00",
    //         "seenUser": 0,
    //         "webSee": false,
    //         "userSeeClient": true,
    //         "amount": 0,
    //         "fileid": 6
    //     },
    //     {
    //         "id": 32,
    //         "lookingSeeUsers": [
    //             {
    //                 "id": 2,
    //                 "username": "Meow",
    //                 "photo_url": "/media/users/2/profile/profile_photo_29bd7ab6-8579-4ee7-8de3-159df17dd83c.png"
    //             }
    //         ],
    //         "createdAt": "2023-05-19T23:10:38.562379+03:00",
    //         "existBefore": "2023-05-20T00:32:38.562379+03:00",
    //         "seenUser": 0,
    //         "webSee": false,
    //         "userSeeClient": true,
    //         "amount": 0,
    //         "fileid": 6
    //     }
    // ]

    const postData = (username, time) => {
        const dataPost = {
            'fileid': 6,
            'user':username,
            'time':time
        }
        axios.post(linkerURI.createPermission, dataPost,{headers: {
                'Authorization': `Token e6dd7025302ea6d9165f88f9f434ab03c0266522`
            }},
        ).then(
            response => {pusher('Успешно!')}
        ).catch(
            error => {pusher('Пользователь не найден!')}
        )
    }

    return(
        <Modal visible={state} animationType={'fade'} transparent={true} statusBarTranslucent={true}>
            <View style={css.bg}>
                <AntDesign name="closecircleo" size={percentWidth(13)} color="white" style={css.modalWindow__icon} onPress={() => setState(false)}/>
                <View style={css.fileNameField}>
                    <Text style={{fontSize: 22, color: '#d4d4d4', textAlign: 'center'}}>{fileName}</Text>
                </View>
                <View style={css.inpData}>
                    <TextInput
                        placeholder="Введи логин пользователя..."
                        value={user}
                        style={css.inputArea}
                        onChangeText={(text) => { setUser(text) }}
                        placeholderTextColor={'#000'}
                        clearTextOnFocus={true}
                    />
                    <TextInput
                        placeholder="Период доступа в минутах"
                        value={accessPeriod}
                        style={css.inputArea}
                        onChangeText={(event) => {
                            if (+event <= 4320 && +event > 0) setAccessPeriod(event)
                            if (+event > 4320) {
                                setAccessPeriod('4320')
                                pusher('Максимальное значение - 4320 минут (3 дня)')
                            }
                        }}
                        placeholderTextColor={'#000'}
                        clearTextOnFocus={true}
                        keyboardType={"numeric"}
                    />
                    <CustomButton text={'Загрузить'} actionFunc={() => {
                        postData(user, accessPeriod)
                        // getData()
                        console.log(user, accessPeriod)
                        setUser('')
                        setAccessPeriod('')
                    }} style={{btnBox: {paddingHorizontal: 10}, btnText:{}}} />
                </View>

                <View style={css.userList}>
                    <ScrollView>
                        <View style={{display: 'flex', gap: 5}}>
                            {data.map( element => (
                                <User key={element.id + data.indexOf(element)}
                                      existBefore={element.existBefore}
                                      seenUser={element.seenUser}
                                      lookingSeeUsers={element.lookingSeeUsers}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

const css = StyleSheet.create({
    bg: {
        backgroundColor: 'rgba(51,51,51,0.95)',
        flex: 1,
        paddingTop: 40,

        display: 'flex',
        alignItems: 'center'
    },
    modalWindow__icon: {
        position: 'absolute',
        right: 0,
        top: 0,
        margin: 20,
        marginTop: 40
    },
    fileNameField: {
        width: '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inpData: {
        marginTop: 15,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 13
    },
    inputArea: {
        fontSize: 18,
        backgroundColor: '#d4d4d4',
        borderRadius: 15,
        paddingHorizontal: 7,
        paddingVertical: 3
    },
    userList: {
        // backgroundColor: '#b70a0a',
        width: '95%',
        maxHeight: '70%',
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    }
})

export default ModalUpload