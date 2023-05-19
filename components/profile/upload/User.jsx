import {Text, View, StyleSheet, Image, TouchableWithoutFeedback} from "react-native";
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import {getFullDate, percentWidth} from "../../bll";
import {LINK} from "../../styles";

const User = ({existBefore, seenUser, lookingSeeUsers}) => {

    const users = lookingSeeUsers[0]

    // console.log(users)

    const Edit = () => {
        console.log('Edit')
    }
    const Watch = () => {
        console.log('Watch')
    }
    const Close = () => {
        console.log('Close')
        console.log(`http://26.242.229.65:8000${users.photo_url}`)
    }

    return (
        <View style={css.bg}>
            <View style={css.imageHandler}>
                <Image source={{uri: `http://26.242.229.65:8000${users.photo_url}`}} style={css.img} />
                <Text style={{...css.whiteText}}>{users.username}</Text>
            </View>
            <View style={css.dataHandler}>
                <View style={css.subText}>
                    <Text style={{...css.whiteText}}>Доступно до:</Text>
                    {existBefore.toString() && <Text style={{...css.whiteText}}>{getFullDate(existBefore)}</Text>}
                </View>
                <View style={css.subText}>
                    <Text style={{...css.whiteText}}>Просмотр:</Text>
                    {seenUser.toString() && <Text style={{...css.whiteText}}>{seenUser}</Text>}
                </View>
            </View>

            <View style={css.rightButtons}>
                <TouchableWithoutFeedback onPress={Close}>
                    <AntDesign name="close" size={percentWidth(7)} color="#323232" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={Watch}>
                    <Ionicons name="eye-outline" size={percentWidth(7)} color="#323232" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={Edit}>
                    <Feather name="edit-2" size={percentWidth(7)} color="#323232" />
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    bg: {
        backgroundColor: '#d4d4d4',
        borderRadius: 15,
        paddingVertical: 3,
        paddingHorizontal: 7,

        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 150
    },
    whiteText: {
        color: '#d4d4d4'
    },
    imageHandler: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 5,
        width: '35%',
        position: 'relative',

        backgroundColor: '#323232',
        borderRadius: 15,
    },
    img: {
        aspectRatio: '1/1',
        width: '100%',
        resizeMode: 'cover',
        height: '75%',
        borderRadius: 15,
    },
    dataHandler: {
        // backgroundColor: '#5a9d13',
        marginLeft: 5,
        width: '53%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    subText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#323232',
        borderRadius: 15,
        width: '100%',
        height: '45%'
    },
    rightButtons: {
        position: 'absolute',
        right: 0,
        height: '100%',
        width: '11%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        paddingRight: 3,
    },
})

export default User