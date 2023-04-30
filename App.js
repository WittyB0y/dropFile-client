import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ToastAndroid } from 'react-native';
import MainStack from './navigator';
import {useEffect} from "react";
import * as ScreenCapture from "expo-screen-capture";
export default function App() {


  // useEffect(() => {
  //   async function preventScreenCapture() {
  //     await ScreenCapture.preventScreenCaptureAsync();
  //   }
  //   preventScreenCapture();
  // }, []);
  return (
      <MainStack/>
  );
}
