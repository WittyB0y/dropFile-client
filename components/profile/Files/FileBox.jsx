import {Animated, Image, StyleSheet, Text, View} from "react-native";
import {defaultStyles} from "../../styles";
import CustomButton from "../../CustomButton";
import {useRef, useState} from "react";
import {PanGestureHandler, State} from "react-native-gesture-handler";
import ModalFile from "./ModalFile";
import {getFullDate, percentWidth, zeroOrNo} from "../../bll";

const FileBox = ({ file }) => {
    const [swipe, setSwipe] = useState(false)
    const [modalWindow, setModalWindow] = useState(false)
    const accessible = Date.now() <= new Date(Date.parse(file.existBefore))
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
            }, 100)
            setModalWindow(true)
        },
        style: {
            btnBox: {
                backgroundColor: '#250d7c',
                width: '30%',
                right: '5%',
                position: 'absolute',

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            btnText: {
                color: '#fff',
                textAlign: 'center',
                fontSize: percentWidth(5)
            }
        }
    }
    const fileNaming = (fileName) => {
        return fileName.replace(/^(.{6}).*?(\.[^.]+)$/, (match, p1, p2) => p1 + '...' + p2) // "Screen...png"
    }
    const handleGesture = ({nativeEvent}) => {
        if(accessible && nativeEvent.translationX < -50 && nativeEvent.state === State.ACTIVE){
            Animated.timing(offsetX, {
                toValue: -percentWidth(35),
                duration: 400,
                useNativeDriver: true
            }).start()
            setTimeout(() => {
                setSwipe(true)
            }, 360)
        } else if (accessible && nativeEvent.translationX >= 0 && nativeEvent.state === State.ACTIVE || !swipe){
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
            <ModalFile state={modalWindow} setState={setModalWindow} img={file.renderdata} />

            <PanGestureHandler onGestureEvent={handleGesture} activeOffsetX={[-10, 10]}>
                <Animated.View style={{...css.file, transform: [{ translateX: offsetX }]}}>
                    <View style={css.file}>
                        <View style={css.verticalData}>
                            <View style={css.file__profile}>
                                <Image source={{ uri : file.fileid.userid.photo}} style={css.profile__img} />
                            </View>

                            <View style={css.file__data}>
                                {file.fileid && (
                                    <View style={css.file__data__box}>
                                        <Text style={css.file__data__text__label}>Имя файла:</Text>
                                        <View style={css.file__data_output}>
                                            <Text style={css.file__data__text__description}> {fileNaming(file.fileid.name)}</Text>
                                        </View>
                                    </View>
                                )}
                                {file.createdAt && (
                                    <View style={css.file__data__box}>
                                        <Text style={css.file__data__text__label}>Дата создания:</Text>
                                        <View style={css.file__data_output}>
                                            <Text style={css.file__data__text__description}> {getFullDate(file.createdAt)}</Text>
                                        </View>
                                    </View>
                                )}
                                {file.existBefore && (
                                    <View style={css.file__data__box}>
                                        <Text style={css.file__data__text__label}>Доступно до:</Text>
                                        <View style={css.file__data_output}>
                                            <Text style={css.file__data__text__description}> {getFullDate(file.existBefore)}</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>

                    { accessible ? (
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
        backgroundColor: '#323232',
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
        // backgroundColor: '#831010',
        position: 'relative',

        borderBottomColor: '#578b90',
        borderBottomWidth: 2,
        borderLeftColor: '#578b90',
        borderLeftWidth: 2,
        borderBottomLeftRadius: 10,

        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    file__data_output: {
        // backgroundColor: '#4b42c2',
        width: '50%',
        position: 'relative',

        marginTop: 4,
        marginRight: 4
    },
    file__data__text__label: {
        textAlign: 'left',
        fontWeight: '600',
        // textDecorationLine: 'underline',
        color: '#d4d4d4'
    },
    file__data__text__description: {
        fontSize: 14,
        color: '#bebebe',
        textAlign: 'left'
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
        width: '90%',
        aspectRatio: '1/1',
        borderRadius: 100
    },
    profile__username: {
        textAlign: 'center',
        fontSize: 14,
        color: '#d4d4d4'
    },
    accessible: {
        width: '100%',
        paddingVertical: 2,
        marginTop: 4,

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