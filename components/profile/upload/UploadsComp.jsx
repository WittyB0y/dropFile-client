import React, {useEffect, useState} from 'react';
import {Button, View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import {defaultStyles, LINK, linkerURI} from "../../styles";
import CustomButton from "../../CustomButton";
import UploadFile from "./UploadFile";
import {pusher, requesterFunc} from "../../bll";

const UploadsComp = ({route}) => {
    const { token } = route.params;
    const [fileUri, setFileUri] = useState(null);
    // const da = requesterFunc('GET', linkerURI.myfiles, { headers: { Authorization: `Token ${token}` } }).data
    // console.log(da)

    // const da = [
    //     {
    //         "slug": "5b769e9f-b4d6-4fa1-a664-1e54970b6562",
    //         "createdAt": "2023-05-15T21:54:52.143472+03:00",
    //         "downloded": 0,
    //         "seen": -1,
    //         "file": "http://26.242.229.65:8000/5b769e9f-b4d6-4fa1-a664-1e54970b6562.rar",
    //         "name": "Файлы для Mac OC.rar",
    //         "content_type": "application/octet-stream",
    //         "access": false
    //     },
    //     {
    //         "slug": "5b769e9f-b4d6-4fa1-a664-1e54970b6562",
    //         "createdAt": "2023-05-15T21:54:52.143472+03:00",
    //         "downloded": 0,
    //         "seen": -1,
    //         "file": "http://26.242.229.65:8000/5b769e9f-b4d6-4fa1-a664-1e54970b6562.rar",
    //         "name": "Файлы для Mac OC.rar",
    //         "content_type": "application/octet-stream",
    //         "access": true
    //     }
    // ]

    const handleFilePick = async () => {
        // { type: 'application/zip' }
        const result = await DocumentPicker.getDocumentAsync();
        if (!result.cancelled) {
            setFileUri(result.uri);
        }
    };

    const handleFileUpload = async () => {
        let fileType = fileUri.split('.').pop();
        console.log(fileType)
        const formData = new FormData();
        formData.append('file', {
            uri: fileUri,
            name: `file.${fileType}`,
            type: 'multipart/form-data',
        });
        try {
            const response = await axios.post(linkerURI.loadfiles, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`,
                },
            });
            if (response.data === 'Файл должен быть с расширением .zip') {pusher('Файл должен быть с расширением .zip')}
        } catch (error) {
            console.log(error);
        }
        setFileUri(null)
    };
    const [data, setData] = useState([])
    useEffect(() => {
        const getFiles = async () => {
            console.log(token)
            const res = await axios.get(linkerURI.myfiles, { headers: { Authorization: `Token ${token}` } })

            setData(res.data)
            console.log(data)
            // console.log('data')
        }
        getFiles()
    }, [])

    return (
        <View style={css.bg}>
            {/*<Text>Token: {token}</Text>*/}
            {fileUri ? (
                <Text>Вы выбрали: {fileUri}</Text>
            ) : (
                <TouchableOpacity onPress={handleFilePick} style={css.uploadBtn}>
                    <Text style={css.uploadBtn__text}>+</Text>
                </TouchableOpacity>
            )}
            {/*<Button title="Upload" onPress={handleFileUpload} disabled={!fileUri} />*/}
            <CustomButton
                text={'Upload'}
                actionFunc={handleFileUpload}
                isActive={fileUri}
                style={{btnBox: {marginVertical: 3}, btnText: {}}}
            />
            <Text>Кол-во файлов: {data.length}</Text>
            <ScrollView>
                {data.map( elem => <UploadFile file={elem} key={data.indexOf(elem)} />)}
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
        // width: '40%',
        borderRadius: 100,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadBtn__text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#d4d4d4'
    }
})

export default UploadsComp;