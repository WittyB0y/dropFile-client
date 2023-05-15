import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const UploadsComp = ({route}) => {
    const { token } = route.params;
    const [fileUri, setFileUri] = useState(null);


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
            const response = await axios.post('http://192.168.31.78:8000/api/v1/loadfiles/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        setFileUri(null)
    };

    return (
        <View>
            <Text>{token}</Text>
            {fileUri ? (
                <Text>{fileUri}</Text>
            ) : (
                <TouchableOpacity onPress={handleFilePick}>
                    <Text>Select file</Text>
                </TouchableOpacity>
            )}
            <Button title="Upload" onPress={handleFileUpload} disabled={!fileUri} />
        </View>
    );
};

export default UploadsComp;