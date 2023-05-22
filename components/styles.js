import * as Application from 'expo-application';


// export const LINK = "http://192.168.31.78:8000/"
// export const LINK ='http://26.242.229.65:8000/'
export const LINK = "http://test.drop123.beget.tech/"

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
        purple: '#7f6cd3',
        blue: '#66dffd',
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
    loadfiles: `${LINK}api/v1/loadfiles/`,
    myfiles: `${LINK}api/v1/files/`,
    createPermission: `${LINK}api/v1/createpermissons/`,
    increaser: `${LINK}api/v1/increase/`,
    logSession: `${LINK}api/v1/addSession/`,
};

const style = {
    btnBox: {},
    btnText: {}
}