import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import {defaultStyles,linkerURI} from "../../styles";
import CustomButton from "../../CustomButton";
import UploadFile from "./UploadFile";
import {pusher} from "../../bll";

const UploadsComp = ({route}) => {
    const [fileUri, setFileUri] = useState(null);
    const [data, setData] = useState([])

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
        setFileUri(null);

    };
    useEffect(() => {
        const getFiles = async () => {
            const res = await axios.get(linkerURI.myfiles, { headers: { Authorization: `Token ${route.params.token}` } })
            setData(res.data)
        }
        getFiles()
    }, [])

    return (
        <View style={css.bg}>
            {fileUri ? (
                <Text>Вы выбрали: {fileUri}</Text>
            ) : (
                <TouchableOpacity onPress={handleFilePick} style={css.uploadBtn}>
                    <Text style={css.uploadBtn__text}>+</Text>
                </TouchableOpacity>
            )}
            <CustomButton
                text={'Upload'}
                actionFunc={handleFileUpload}
                isActive={fileUri}
                style={{btnBox: {marginVertical: 3}, btnText: {}}}
            />
            <Text>Кол-во файлов: {data.length}</Text>
            <ScrollView>
                {data.map( elem => <UploadFile file={elem} key={data.indexOf(elem)} token={route.params.token} />)}
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
        alignItems: 'center'
    },
    uploadBtn__text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#d4d4d4'
    }
})

export default UploadsComp;