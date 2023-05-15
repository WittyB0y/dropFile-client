import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import {defaultStyles, linkerURI} from "../styles";

export default async function pickImage(token, func, id) {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (result.assets) {
        // получаем путь к файлу из свойства "uri"
        let localUri = result.assets[0].uri;
        console.log(localUri)
        // конвертируем путь к файлу в объект "Files"
        let file = await FileSystem.getInfoAsync(localUri);
        let fileType = file.uri.split('.').pop(); // получаем расширение файла

        // создаем объект FormData и добавляем файл в него
        let formData = new FormData();
        formData.append('photo', {
            uri: localUri,
            type: `image/${fileType}`,
            name: `photo.${fileType}`,
        });
        formData.append('userid', id);
        console.log('axios', id)
        axios
            .patch(`${linkerURI.upPhoto}${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`,
                },
            })
            .then(response => {
                func(response.data.photo);
            })
            .catch(error => {
                console.error(error);
            });
    }
}
