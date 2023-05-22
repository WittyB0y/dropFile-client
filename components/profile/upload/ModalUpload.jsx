import {Modal, Text, View, StyleSheet, TextInput, ScrollView} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {percentWidth, pusher} from "../../bll";
import {useState} from "react";
import CustomButton from "../../CustomButton";
import axios from "axios";
import {defaultStyles, linkerURI} from "../../styles";
import User from "./User";

const ModalUpload = ({state, setState, fileName, token, data, fileid}) => {
    const [user, setUser] = useState('')
    const [accessPeriod, setAccessPeriod] = useState('');
    function removeItemFromArray(item) {
        const index = data.indexOf(item);
        if (index > -1) {
            data.splice(index, 1);
        }
    }



    const postData = (username, time, fileid) => {
        const dataPost = {
            'fileid': fileid,
            'user':username,
            'time':time,
        }
        axios.post(linkerURI.createPermission, dataPost,{headers: {
                'Authorization': `Token ${token}`,
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
                    <CustomButton text={'Предоставить доступ'} actionFunc={() => {
                        postData(user, accessPeriod, fileid)
                        setUser('')
                        setAccessPeriod('')
                    }} style={{btnBox: {paddingHorizontal: 10, backgroundColor: defaultStyles.buttons.blue}, btnText:{}}} />
                </View>

                <View style={css.userList}>
                    {data && (
                        <ScrollView>
                            <View style={{display: 'flex', gap: 5}}>
                                {data.map( element => (
                                    <User key={element.id + data.indexOf(element)}
                                          existBefore={element.existBefore}
                                          seenUser={element.seenUser}
                                          lookingSeeUsers={element.lookingSeeUsers}
                                          fileid={fileid}
                                          token={token}
                                          user={element}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    )}
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