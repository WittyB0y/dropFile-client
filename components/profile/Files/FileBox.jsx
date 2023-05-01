import {Animated, Image, StyleSheet, Text, View} from "react-native";
import {defaultStyles} from "../../styles";
import CustomButton from "../../CustomButton";
import {useRef, useState} from "react";
import {PanGestureHandler, State} from "react-native-gesture-handler";
import ModalFile from "./ModalFile";

const FileBox = ({ file }) => {
    const [swipe, setSwipe] = useState(false)
    const [modalWindow, setModalWindow] = useState(false)
    const offsetX = useRef(new Animated.Value(0)).current;

    const btn = {
        title: 'Просмотр',
        action: () => {
            Animated.timing(offsetX, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }).start()
            setTimeout(() => {
                setSwipe(false)
            }, 110)
            setModalWindow(true)
        },
        style: {
            btnBox: {
                backgroundColor: '#250d7c',
                width: '30%',
                right: 20,
                position: 'absolute',

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            btnText: {
                color: '#fff',
                textAlign: 'center'
            }
        }
    }
    const getFullDate = (bigDate) => {
        const dd = new Date(Date.parse(bigDate))
        return `${dd.getDate()}.${dd.getUTCMonth().toString().length === 1 ? `0${dd.getMonth() + 1}` : dd.getMonth() + 1}.${dd.getFullYear()} ${dd.getUTCHours()}:${dd.getMinutes()}`
    }
    const handleGesture = ({nativeEvent}) => {
        if(nativeEvent.translationX < -50 && nativeEvent.state === State.ACTIVE){
            Animated.timing(offsetX, {
                toValue: -150,
                duration: 400,
                useNativeDriver: true
            }).start()
            setTimeout(() => {
                setSwipe(true)
            }, 300)
        } else if (nativeEvent.translationX >= 0 && nativeEvent.state === State.ACTIVE || !swipe){
            Animated.timing(offsetX, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }).start()
            setTimeout(() => {
                setSwipe(false)
            }, 110)
        }
    }

    return (
        <View style={css.box}>
            <ModalFile state={modalWindow} setState={setModalWindow} img={file.slug} />

            <PanGestureHandler onGestureEvent={handleGesture} activeOffsetX={[-10, 10]}>
                <Animated.View style={{...css.file, transform: [{ translateX: offsetX }]}}>
                    <View style={css.file}>
                        <View style={css.verticalData}>
                            <View style={css.file__profile}>
                                <Image source={{ uri : file.photo}} style={css.profile__img} />
                                <Text style={css.profile__username}>{file.username}</Text>
                            </View>

                            <View style={css.file__data}>
                                {file.name && (
                                    <View style={css.file__data__box}>
                                        <Text style={css.file__data__text__label}>Имя файла:</Text>
                                        <Text style={css.file__data__text__description}> {file.name}</Text>
                                    </View>
                                )}
                                {file.contentType && (
                                    <View style={css.file__data__box}>
                                        <Text style={css.file__data__text__label}>Тип файла:</Text>
                                        <Text style={css.file__data__text__description}> {file.contentType}</Text>
                                    </View>
                                )}
                                {file.created && (
                                    <View style={css.file__data__box}>
                                        <Text style={css.file__data__text__label}>Дата создания:</Text>
                                        <Text style={css.file__data__text__description}> {getFullDate(file.created)}</Text>
                                    </View>
                                )}
                                {file.during && (
                                    <View style={css.file__data__box}>
                                        <Text style={css.file__data__text__label}>Доступно до:</Text>
                                        <Text style={css.file__data__text__description}> {getFullDate(file.during)}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>

                    {file.accessibility ? (
                        <View style={{...css.accessible, backgroundColor: defaultStyles.buttons.green}}>
                            <Text style={css.accessible__text}>Доступно</Text>
                        </View>
                    ) : (
                        <View style={{...css.accessible, backgroundColor: defaultStyles.buttons.orange}}>
                            <Text style={css.accessible__text}>Время вышло</Text>
                        </View>
                    )}
                </Animated.View>
            </PanGestureHandler>

            {swipe && (
                <CustomButton text={btn.title} actionFunc={btn.action} style={btn.style}/>
            )}
        </View>
    )
}

const css = StyleSheet.create({
    box: {
        width: '100%',
        paddingVertical: 7,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    file: {
        backgroundColor: '#303030',
        width: '90%',

        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',

        borderRadius: 18
    },
    verticalData: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: 'rgba(176,0,42,0.5)',
    },
    file__data: {
        width: '70%',
        gap: 3,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    file__data__box: {
        width: '100%',
        padding: 3,

        // borderBottomColor: defaultStyles.backGround,
        // borderBottomWidth: 2,
        // borderLeftColor: defaultStyles.backGround,
        // borderLeftWidth: 2,
        // borderBottomLeftRadius: 10,

        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    file__data__text__label: {
        textAlign: 'left',
        fontWeight: '600',
        textDecorationLine: 'underline',
        color: '#d7d7d7'
    },
    file__data__text__description: {
        fontSize: 14,
        color: '#963fe8',
        textAlign: 'right'
    },
    file__profile: {
        // backgroundColor: 'rgba(161,0,187,0.5)',
        paddingVertical: 5,
        width: '30%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile__img: {
        width: '70%',
        aspectRatio: '1/1',
        borderRadius: 100
    },
    profile__username: {
        textAlign: 'center',
        fontSize: 14,
        color: '#d7d7d7'
    },
    accessible: {
        width: '100%',
        paddingVertical: 3,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
    },
    accessible__text: {
        fontSize: 18,
        fontWeight: '600'
    },
})

export default FileBox