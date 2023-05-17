import {PanGestureHandler, State} from "react-native-gesture-handler";
import {Animated, Image, StyleSheet, Text, View} from "react-native";
import CustomButton from "../../CustomButton";
import {percentWidth} from "../../bll";
import {useRef, useState} from "react";
import {defaultStyles} from "../../styles";

const UploadFile = ({file}) => {
    const [swipe, setSwipe] = useState(false)
    const [modalWindow, setModalWindow] = useState(false)
    const offsetX = useRef(new Animated.Value(0)).current;

    const btn = {
        title: 'Найсроить доступ',
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
    const fields = [
        {fieldName: 'Тип файла', data: file.content_type, short: false, isDate: false},
        {fieldName: 'Имя файла', data: file.name, short: true, isDate: false},
        {fieldName: 'Дата создания', data: file.createdAt, short: false, isDate: true},
    ]
    const getFullDate = (bigDate, skip) => {
        if (skip) return
        const formatDate = (dateTimeString) => {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                fractionalSecondDigits: 6,
                timeZoneName: 'short',
                timeZone: 'Europe/Minsk', // Указываем временную зону Минск, Беларусь
            };

            const dt = new Date(dateTimeString);
            const formatter = new Intl.DateTimeFormat('ru', options);

            return formatter.format(dt);
        };

        const dateTimeString = new Date(Date.parse(bigDate));
        return formatDate(dateTimeString);

    }
    const fileNaming = (fileName, skip) => {
        if (skip) return fileName
        return fileName.replace(/^(.{6}).*?(\.[^.]+)$/, (match, p1, p2) => p1 + '...' + p2) // "Screen...png"
    }
    const handleGesture = ({nativeEvent}) => {
        if(nativeEvent.translationX < -50 && nativeEvent.state === State.ACTIVE){
            Animated.timing(offsetX, {
                toValue: -percentWidth(35),
                duration: 400,
                useNativeDriver: true
            }).start()
            setTimeout(() => {
                setSwipe(true)
            }, 360)
        } else if ( nativeEvent.translationX >= 0 && nativeEvent.state === State.ACTIVE || !swipe){
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

    const getMinsAgo = (bigDate) => {
        const currentDate = new Date();
        const serverDate = new Date(Date.parse(bigDate));
        const timeDiffMilliseconds = currentDate - serverDate;
        const timeDiffMinutes = Math.floor(timeDiffMilliseconds / 60000);
        return `${timeDiffMinutes} мин. назад`
    }

    return (
        <View style={css.box}>
            {/*<ModalFile state={modalWindow} setState={setModalWindow} img={file.renderdata} />*/}

            <PanGestureHandler onGestureEvent={handleGesture} activeOffsetX={[-10, 10]}>
                <Animated.View style={{...css.file, transform: [{ translateX: offsetX }]}}>
                    <View style={css.file}>
                        <View style={css.verticalData}>
                            <View style={css.file__profile}>
                                <Image source={{ uri : 'https://i.yapx.ru/WCenU.png'}} style={css.profile__img} />
                            </View>

                            <View style={css.file__data}>
                                {fields.map( element => (
                                    <View style={css.file__data__box}>
                                        <View style={css.file__data__text__box}>
                                            <Text style={css.file__data__text__label}>{element.fieldName}: </Text>
                                        </View>
                                        <View style={css.file__data_output}>
                                            <Text style={css.file__data__text__description}>{element.isDate ? getFullDate(element.data, !element.isDate) : fileNaming(element.data, !element.short)}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>

                        </View>
                    </View>
                    <View style={{...css.accessible, backgroundColor: defaultStyles.buttons.green}}>
                        <Text style={css.accessible__text}>{getMinsAgo(fields[2].data)}</Text>
                    </View>

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
        justifyContent: 'center',
        flexDirection: 'row',
    },
    file__data__text__box: {
        // backgroundColor: '#5d983f',
        height: '100%',
        width: '45%',
        position: 'relative',
    },
    file__data_output: {
        // backgroundColor: '#4b42c2',
        height: '100%',
        width: '55%',
        position: 'relative',

        marginTop: 4,
        marginRight: 4,
    },
    file__data__text__label: {
        textAlign: 'center',
        fontWeight: '600',
        // textDecorationLine: 'underline',
        color: '#d4d4d4'
    },
    file__data__text__description: {
        fontSize: 14,
        color: '#bebebe',
        textAlign: 'center',

    },
    file__profile: {
        // backgroundColor: 'rgba(161,0,187,0.5)',
        paddingVertical: 7,
        width: '30%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile__img: {
        width: '90%',
        aspectRatio: '1/1',
        // padding: 2,
        // borderRadius: 100
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

export default UploadFile