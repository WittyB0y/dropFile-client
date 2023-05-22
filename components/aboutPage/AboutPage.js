import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Linking,
} from "react-native";
import {defaultStyles} from "../styles";
import React from "react";
import Legends from "./legends/Legends";
import TextLink from "../TextLink";


const openLink = link => Linking.openURL(link)

let holderObj;
holderObj = [
    {
        url: require('../../assets/vanya.png'),
        text: 'Telegram: @Sertralin_e'
    },

    {
        url: require('../../assets/artem.png'),
        text: 'Python & React Developer\nTelegram: @Witty_B0y'
    },
    {
        url: require('../../assets/maxy.png'),
        text: 'React Developer\nTelegram: @aX_Xst'
    },

];
export default function AboutPage() {
    return (
        <ScrollView style={styles.container}>
             <View style={{alignItems: 'center',  display: 'flex'}}>
                 <Text style={{fontSize: 25, fontWeight: '800', textAlign: 'center'}}>Проектик сделан по просьбе <TouchableOpacity onPress={()=>openLink('https://t.me/Sertralin_e')} ><Text style={styles.textdecor1}>@Sertralin_e</Text ></TouchableOpacity>, даже не пытайтесь скринить — ничего не выйдет ;).{'\n'}Если нашли какие-то баги, тогда пишите в тг <TouchableOpacity onPress={()=>openLink('https://t.me/Witty_B0y')} ><Text style={styles.textdecor2}>@WittyB0y</Text ></TouchableOpacity>:).{'\n'}Отдельное спасибо этому котику <TouchableOpacity onPress={()=>openLink('https://t.me/aX_Xst')} ><Text style={styles.textdecor3}>@aX_Xst</Text ></TouchableOpacity> за помощь в разработке клиента.</Text>
                 {holderObj.map((value, index) => <Legends key={index} TextDes={value.text} photoUrl={value.url}/>)}
            </View>
            <View on style={styles.innerGit}>
                <Image style={styles.github}  source={require('../../assets/github.png')}></Image>
                <TextLink text={'GitHub: WittyB0y'} url={'https://github.com/WittyB0y'}/>
                <Text style={{marginBottom: 20}}>{'\n'}TwoTailsSolutions 2023{'\n'}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: defaultStyles.backGround,
    },
    img: {
        width: 120,
        height: 120,

    },
    github: {
        width: 200,
        height: 200,
    },
    innerGit: {
        width:'100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',

    },
    textdecor: {
        textDecorationLine: 'underline',
        color: '#b9a99a',
        fontSize: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        display: 'flex',
    },

    textdecor1: {
        textDecorationLine: 'underline',
        color: defaultStyles.buttons.green,
        fontSize: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        display: 'flex',
    },

    textdecor2: {
        textDecorationLine: 'underline',
        color: defaultStyles.buttons.yellow,
        fontSize: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        display: 'flex',
    },
    textdecor3: {
        textDecorationLine: 'underline',
        color: defaultStyles.buttons.orange,
        fontSize: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        display: 'flex',
    }
});