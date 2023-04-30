import {ToastAndroid} from "react-native";
import axios from "axios";
import {defaultStyles} from "./styles";
import {linkerURI} from "./styles";
export function pusher(message = '', duration = 'SHORT'){
    if (duration.toLowerCase() === 'short') {
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } else if (duration.toLowerCase() === 'long'){
        ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
    } else {
        console.log(`Compiled error! Are you correct: ${duration}?`)
    }
}

export function logout (token) {
    axios.post(linkerURI.logout, {},{ headers: { Authorization: `Token ${token}` } })
        .then( () => pusher('Выход выполнен!'))
        .catch(error => console.log(error))
}