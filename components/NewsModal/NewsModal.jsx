import {FlatList, Modal, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {percentWidth, pusher} from "../bll";
import TextLink from "../TextLink";
import Pagination from "react-native-pagination";
import {defaultStyles, linkerURI} from "../styles";

export default function NewsModal({state, setState}){

    // const data = [
    //     {
    //         title: 'Новости недели!',
    //         text: 'Котик по имени Артёмка был жестко выебан своим парнем! Его паренень так жестко трахал Артемку, что тот умолял остновиться, но тот его не слушал... Артёмкина дырочка в данный момент полнотью раздолбана и заживает, пока снова его парень ее не раздолбит.',
    //         link: 'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg',
    //         // image: ''
    //     },
    //     {
    //         title: 'Новости недели!',
    //         text: 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    //         link: 'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg',
    //         // image: ''
    //     }
    // ]

    const flatListRef = useRef(null);

    const [page, setPage] = useState(1)
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(linkerURI.newsData)
            setData(res.data)
        }
        getData()
    }, [])

    const renderData = ({ item }) => (
        <View style={modals.data}>
            <View style={modals.logo__box}>
                <Text style={modals.logo}>{item.title}</Text>
            </View>
            <View style={modals.modalWindow__text__box}>
                <Text style={modals.modalWindow__text}>
                    {item.text}
                </Text>
            </View>
            {item.link && (
                <View style={modals.link__box}>
                    <TextLink text={'Перейти'} url={item.link} style={modals.linker} key={data.indexOf(item)} />
                </View>
            )}
        </View>
    )

    return (
        <Modal visible={state} animationType='fade' transparent={true}>
            <View style={modals.modalWindow}>
                <AntDesign name="closecircleo" size={percentWidth(13)} color="white" style={modals.modalWindow__icon} onPress={() => setState(false)}/>
                <View style={modals.modalWindow__box}>
                    <View style={modals.modalWindow__header__box}>
                        <Text style={modals.modalWindow__header}>
                            Новости {`${page}/${data.length}`} 🥵
                        </Text>
                    </View>

                    <View style={modals.handlerPage}>
                        <FlatList
                            ref={flatListRef}
                            data={data.slice((page - 1), page)}
                            renderItem={renderData}
                            keyExtractor={(item, index) => index}
                        />
                        <Pagination
                            paginationItems={data}
                            currentPage={page}
                            setPage={setPage}
                            flatListRef={flatListRef}
                        />
                    </View>

                    <View style={modals.modalWindow__box__arrows}>
                        <TouchableWithoutFeedback  onPress={() => {
                            if (page > 1) {
                                setPage(page - 1)
                            } else {
                                pusher('Это последняя новость на сегодня, ожидайте обновления в будущем!', 'long')
                            }
                        }}>
                            <View style={modals.modalWindow__box__arrows__left}>
                                <AntDesign name="left" size={32} ocolor="black"/>
                                <Text>Previous</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback  onPress={() => {
                            if (page < data.length) {
                                setPage(page + 1)
                            } else {
                                pusher('Это самая первая новость, дальше уже некуда...', 'long')
                            }
                        }}>
                            <View style={modals.modalWindow__box__arrows__right}>
                                <Text>Next</Text>
                                <AntDesign name="right" size={32} color="black"/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const modals = StyleSheet.create({
    modalWindow:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        height: '100%',
        backgroundColor: 'rgba(79,79,79,0.85)',
    },
    modalWindow__icon: {
        position: 'absolute',
        margin: 15,
        top: 0,
        right: 0,
    },
    modalWindow__box: {
        width: '80%',
        height: '60%',

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderRadius: 15,
        backgroundColor: '#262626',
    },
    data: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    handlerPage: {
        width: '100%',
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalWindow__header__box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        paddingTop: '3%',
        paddingBottom: '2%',
        width: '100%',
        maxHeight: '30%',

        borderBottomWidth: 3,
        borderBottomColor: '#fff',
    },
    modalWindow__header: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
    },
    logo__box: {
        width: '100%',
    },
    logo: {
        color: '#fff',
        fontSize: 20,
        // marginVertical: 5,
        textAlign: 'center'
    },
    modalWindow__text__box: {
        paddingHorizontal: 10,
        width: '100%',
        // height: '100%',
        marginVertical: 10,
        borderBottomColor: '#0e00d9',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalWindow__text: {
        color: '#fff'
    },
    link__box: {
        width: '100%',
        // height: '100%',
        paddingVertical: 7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    linker: {
        textAlign: 'center',
        color: '#88af00',
        textDecorationLine: 'underline',
        fontSize: 18,
        fontWeight: '700'
    },
    modalWindow__box__arrows: {
        width: '100%',
        maxHeight: '15%',
        height: '12%',

        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modalWindow__box__arrows__left: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',

        backgroundColor: defaultStyles.buttons.purple,
        width: '50%',
        height: '100%',

        borderBottomLeftRadius: 15,
    },
    modalWindow__box__arrows__right: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',

        backgroundColor: defaultStyles.buttons.orange,
        width: '50%',
        height: '100%',

        borderBottomRightRadius: 15,
    }
})


//     <View style={modals.logo__box}>
//     <Text style={modals.logo}>Заголовок</Text>
// </View>
// <View style={modals.modalWindow__text__box}>
//     <Text style={modals.modalWindow__text}>
//         1. Мой котик самый лучший {'\n'}
//         2. Мой котик самый лучший {'\n'}
//         3. Мой котик самый лучший {'\n'}
//         4. Мой котик самый лучший {'\n'}
//         5. Мой котик самый лучший {'\n'}
//     </Text>
// </View>
// <View style={modals.link__box}>
//     <MaterialCommunityIcons name="gesture-tap" size={28} color="white" />
//     <TextLink text={'Link'} url={'https://reactnative.dev/docs/toastandroid'} style={modals.linker} />
//     <MaterialCommunityIcons name="gesture-tap" size={28} color="white" />
// </View>