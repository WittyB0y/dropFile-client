import {Dimensions, ToastAndroid} from "react-native";
import axios from "axios";
import {LINK, linkerURI} from "./styles";
export function pusher(message = '', duration = 'SHORT'){
    if (duration.toLowerCase() === 'short') {
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } else if (duration.toLowerCase() === 'long'){
        ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.BOTTOM)
    } else {
        console.log(`Compiled error! Are you correct: ${duration}?`)
    }
}

export const getFullDate = (bigDate) => {
    const dd = new Date(Date.parse(bigDate))
    return `${zeroOrNo(dd.getDate())}.${zeroOrNo(dd.getUTCMonth(), 1)}.${dd.getFullYear()} ${zeroOrNo(dd.getUTCHours(), 3)}:${zeroOrNo(dd.getMinutes())}`
}

export function logout (token) {
    axios.post(linkerURI.logout, {},{ headers: { Authorization: `Token ${token}` } })
        .then( () => pusher('Выход выполнен!'))
        .catch(error => console.log(error))
}

export function percentWidth(percent){
    return Math.round(Dimensions.get("window").width) * (percent/100)
}

export const zeroOrNo = (num, UTC = 0) => {
    return  (num + UTC).toString().length === 1 ? `0${num + UTC}` : num + UTC
}

export async function requesterFunc(method, link, dataAuth) {
    if (method==='GET') {
    const data = await axios.get(link, dataAuth)
    }
}