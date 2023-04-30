import React from 'react';
import loginPage from './components/loginPage';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import MainBtn from "./components/MainBtn";
import AboutPage from "./components/aboutPage/AboutPage";
import MainMenu from "./components/profile/MainMenu";
import SignUp from "./components/signUp/SignUp";

const Stack = createStackNavigator();

export default function Navigate() {
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name={'Главная'} component={MainBtn}/>
            <Stack.Screen name={'Страница авторизации'} component={loginPage}/>
            <Stack.Screen name={'О проекте'} component={AboutPage}/>
            <Stack.Screen name={'Меню'} component={MainMenu}/>
            <Stack.Screen name={'Регистрация'} component={SignUp}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
};