import * as Application from 'expo-application';

const LINK = "http://192.168.31.78:8000/"
// const LINK = "http://192.168.64.223:8000/"
// const LINK ='http://26.242.229.65:8000/'

export const deviceINFO = {
    id: Application.androidId
}

export const defaultStyles = {
    colorBtn: 'rgba(50,116,155,0.36)',
    backGround: 'rgba(39,108,114,0.76)',
    buttons: {
        green: '#0bca62',
        yellow: '#fbd737',
        orange: '#fa7060',
        purple: '#7f6cd3'
    }
    // backGround: 'rgba(26,139,147,0.49)',

}

export const linkerURI = {
    login:`${LINK}api/v1/auth/token/login/`,
    userPhoto: `${LINK}api/v1/photo/`,
    register: `${LINK}api/v1/auth/users/`,
    checkDevId: `${LINK}api/v1/iddev/`,
    newsData: `${LINK}api/v1/news/`,
    upPhoto: `${LINK}api/v1/update_profile_photo/`,
    logout: `${LINK}api/v1/auth/token/logout/`,
};

const style = {
    btnBox: {},
    btnText: {}
}