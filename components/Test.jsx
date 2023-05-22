import {Button, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {pusher} from "./bll";
import axios from "axios";

function Test() {
    const [accessPeriod, setAccessPeriod] = useState('');
    const [userLog, setUser] = useState('');
    const isButtonDisabled = userLog === '' || accessPeriod === '';
    const handleAccessPeriodChange = (text) => {
        // Проверяем, чтобы введенное значение было числом
        const numericValue = parseInt(text);
        if (!isNaN(numericValue)) {
            // Проверяем, чтобы значение было в допустимом диапазоне
            if (numericValue <= 4320) {
                setAccessPeriod(text);
            } else {
                // Если значение превышает максимальное допустимое число, обновляем состояние с максимальным значением
                setAccessPeriod('4320');
                pusher('Максимальное значение - 4320 минут (3 дня)')
            }
        }
    };
    const postData = (username, time) => {
        const data = {
            'fileid':'4',
            'user':username,
            'time':time

        }
        axios.post('http://192.168.31.78:8000/api/v1/createpermissons/',data,{headers: {
                    'Authorization': `Token e6dd7025302ea6d9165f88f9f434ab03c0266522`
        }},
        ).then(
            response => {pusher('Успешно!')}
        ).catch(
            error => {pusher('Пользователь не найден!')}
        )
    }
    const getData = () => {
        axios.get('http://192.168.31.78:8000/api/v1/createpermissons/',{headers: {
                'Authorization': `Token e6dd7025302ea6d9165f88f9f434ab03c0266522`,
                'fileid': '4'
            }} )
    }
    return(
        <View>
            <TextInput
                placeholder="Введи логин пользователя..."
                value={userLog}
                onChangeText={(text) => { setUser(text) }}
            />
            <TextInput
                placeholder="Период доступа в минутах"
                value={accessPeriod}
                onChangeText={handleAccessPeriodChange}
            />
            <Button title={'Load'} disabled={isButtonDisabled} onPress={() => {
                getData()
                postData(userLog, accessPeriod)
                console.log(userLog, accessPeriod)
                setUser('')
                setAccessPeriod('')
            }}/>

        </View>
    );
}
export default Test