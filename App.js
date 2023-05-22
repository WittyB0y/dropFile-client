import MainStack from './navigator';
import {useEffect} from "react";
import * as ScreenCapture from "expo-screen-capture";
import axios from "axios";
import {deviceINFO, linkerURI} from "./components/styles";
import {pusher} from "./components/bll";
export default function App() {

  useEffect( ()=> {
    axios.post(linkerURI.logSession, {'devid': `${deviceINFO.id}`}).then(res => {pusher('Соединение установлено :)')}).catch(e => {pusher('Сервер не отвечает :(')})
  } )
  useEffect(() => {
    async function preventScreenCapture() {
      await ScreenCapture.preventScreenCaptureAsync();
    }
    preventScreenCapture();
  }, []);
  return (
      <MainStack/>
  );
}
