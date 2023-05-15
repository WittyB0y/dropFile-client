import {View, Text, StyleSheet, ScrollView} from "react-native";
import {defaultStyles, LINK} from "../../styles";
import FileBox from "./FileBox";
import {useEffect, useState} from "react";
import axios from "axios";

const Files = ({route}) => {
    const {token} = route.params
    const [data, setData] = useState([{}])
    useEffect(() => {
        const getUserData = async () => {
            console.log(token)
            const res = await axios.get(`${LINK}api/v1/sharedfiles/`, { headers: { Authorization: `Token ${token}` } })
            console.log(res.data)
            setData(res.data)
        }
        getUserData()
    }, [])
    return(
        <View style={css.screen}>
            <ScrollView>
                <View style={css.title__box}>
                    <Text style={css.title}>Всего файлов: {data.filter( elem => elem.userSeeClient).length}</Text>
                    <Text>Свайпни файл влево, чтобы просмотреть</Text>
                </View>
                {data.map((element, index) => ( element.userSeeClient &&
                    <FileBox file={element} key={index} token={token} />
                ))}
            </ScrollView>
        </View>
    )
}

const css = StyleSheet.create({
    screen: {
        backgroundColor: defaultStyles.backGround,
        height: '100%',
    },
    title__box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#a10000',
        paddingVertical: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default Files