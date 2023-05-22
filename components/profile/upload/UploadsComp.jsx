import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { defaultStyles, linkerURI } from "../../styles";
import CustomButton from "../../CustomButton";
import UploadFile from "./UploadFile";
import { pusher } from "../../bll";

const UploadsComp = ({ route }) => {
    const { token } = route.params;
    const [fileUri, setFileUri] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFilePick = async () => {
        const result = await DocumentPicker.getDocumentAsync();
        if (!result.cancelled) {
            setFileUri(result.uri);
        }
    };

    const handleFileUpload = async () => {
        let fileType = fileUri.split('.').pop();
        console.log(fileType);
        const formData = new FormData();
        formData.append('file', {
            uri: fileUri,
            name: `file.${fileType}`,
            type: 'multipart/form-data',
        });

        try {
            if (fileType === 'ZIP' || fileType === 'zip') {
                setIsLoading(true);
                pusher('Загрузка файла на сервер...\nДождись сообщения об успешной загрузке!', 'long');
                const response = await axios.post(linkerURI.loadfiles, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${token}`,
                    },
                });
                pusher('Файл загружен!');
            } else {
                pusher('Файл должен быть с расширением .zip');
            }
        } catch (error) {
            console.log(error);
            pusher('Ошибка загрузки!');
        }

        setFileUri(null);
        setIsLoading(false);
    };

    useEffect(() => {
        const getFiles = async () => {
            const res = await axios.get(linkerURI.myfiles, { headers: { Authorization: `Token ${route.params.token}` } });
            setData(res.data);
        };
        getFiles();
    }, []);

    return (
        <View style={css.bg}>
            {fileUri ? (
                <Text>Вы выбрали: {fileUri}</Text>
            ) : (
                <TouchableOpacity onPress={handleFilePick} style={css.uploadBtn}>
                    <Text style={css.uploadBtn__text}>+</Text>
                </TouchableOpacity>
            )}
            <View style={{marginBottom: 5 ,width: '95%', display: 'flex', flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center'}}>
                <CustomButton
                    text={'Загрузить'}
                    actionFunc={handleFileUpload}
                    isActive={fileUri}
                    style={{ btnBox: { width: '60%', backgroundColor: defaultStyles.buttons.yellow }, btnText: {} }}
                />
                {fileUri && (
                    <CustomButton
                        text={'Отмена'}
                        actionFunc={() => setFileUri(null)}
                        style={{ btnBox: { width: '35%', backgroundColor: defaultStyles.buttons.orange}, btnText: {} }}
                    />
                )}


            </View>
            {isLoading && <ActivityIndicator style={css.loadingIndicator} size="large" color="#000000" />}
            <Text>Кол-во файлов: {data.length}</Text>
            <ScrollView>
                {data.map((elem) => (
                    <UploadFile file={elem} key={data.indexOf(elem)} token={route.params.token} />
                ))}
            </ScrollView>
        </View>
    );
};

const css = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: defaultStyles.backGround,
        display: 'flex',
        alignItems: 'center',
    },
    uploadBtn: {
        backgroundColor: '#323232',
        paddingVertical: 8,
        marginVertical: 8,
        aspectRatio: '1/1',
        borderRadius: 100,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadBtn__text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#d4d4d4',
    },
    loadingIndicator: {
        marginTop: 20,
    },
});

export default UploadsComp;
