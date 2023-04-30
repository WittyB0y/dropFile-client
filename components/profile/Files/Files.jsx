import {View, Text, StyleSheet, ScrollView} from "react-native";
import {defaultStyles} from "../../styles";
import FileBox from "./FileBox";

const Files = ({route}) => {
    const {token} = route.params
    const files = [
        {
            photo: 'http://26.242.229.65:8000/media/media/users/1/profile/profile_photo_b4a7eff7-8a96-49d1-82da-8ac35b44e9f2.png',
            username: 'iFuckMyKotik',
            created: '2023-04-29 21:30:35.431968',
            during: '2023-04-24 14:49:02.431968',
            amount: 20,
            contentType: 'doc/docx',
            accessibility: true,
            name: 'artemkaPassik.docx',
            slug: ['http://26.242.229.65:8000/media/media/users/1/profile/profile_photo_b4a7eff7-8a96-49d1-82da-8ac35b44e9f2.png', "http://26.242.229.65:8000/media/media/users/1/profile/profile_photo_b4a7eff7-8a96-49d1-82da-8ac35b44e9f2.png"],
        },
    ]

    return(
        <View style={css.screen}>
            <ScrollView>
                <View style={css.title__box}>
                    <Text style={css.title}>Всего файлов: {files.length}</Text>
                </View>
                {files.map((element, index) => (
                    <FileBox file={element} key={index} />
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