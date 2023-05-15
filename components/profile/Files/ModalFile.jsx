import {Modal, View, StyleSheet, Text} from "react-native";
import {AntDesign, EvilIcons} from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import {percentWidth, pusher} from "../../bll";
import {useState} from "react";

const ModalFile = ({state, setState, img}) => {
    const [photo, setPhoto] = useState(0)
    return (
        <Modal visible={state} animationType={'fade'}>
            <View style={css.content}>
                <ImageViewer
                    saveToLocalByLongPress={false}
                    enableSwipeDown={true}
                    onSwipeDown={() => setState(false)}
                    style={css.img}
                    minScale={1}
                    pageAnimateTime={300}
                    renderArrowLeft={() => (
                        <EvilIcons
                            name="chevron-left"
                            size={percentWidth(10)}
                            color="#fff"
                            onPress={() => photo >= 1 && setPhoto(photo - 1)}
                        />
                    )}
                    renderArrowRight={() => (
                        <EvilIcons
                            name="chevron-right"
                            size={percentWidth(10)}
                            color="#fff"
                            onPress={() => photo < img.length - 1 && setPhoto(photo + 1)}
                        />
                    )}
                    index={photo}
                    imageUrls={img.map( elem => ({url: elem.fileLink}))}
                    renderIndicator={(currentIndex, allSize) => (
                        <View style={css.counter__box}>
                            <Text style={css.counter}>
                                {photo + 1}/{img.length}
                            </Text>
                        </View>
                    )}
                />

                <AntDesign
                    name="close"
                    size={percentWidth(12)}
                    color="#d4d4d4"
                    style={css.closeIcon}
                    onPress={() => setState(false)}
                />
            </View>
        </Modal>
    )
}

const css = StyleSheet.create({
    bg: {
        backgroundColor: '#2d2d2d',
        height: '100%',
        alignItems: "center"
    },
    closeIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10,
        zIndex: 1
    },
    counter__box: {
        paddingHorizontal: 3,
        paddingVertical: 7,
        backgroundColor: '#333',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        width: '30%',
        position: 'absolute',
        top: 0,
        left: '35%',
        right: '35%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    counter: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: 2,
        color: '#d4d4d4'
    },

    img: {
        width: '100%',
        height: '100%',
        zIndex: 0
    },
    content: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        // zIndex: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        backgroundColor: 'rgba(84,5,5,0.71)'
    },
})

export default ModalFile