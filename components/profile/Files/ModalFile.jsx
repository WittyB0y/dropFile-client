import {Modal, View, StyleSheet} from "react-native";
import {AntDesign, EvilIcons} from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import {percentWidth, pusher} from "../../bll";

const ModalFile = ({state, setState, img}) => {
    return (
        <Modal visible={state} animationType={'fade'}>
            <View style={css.content}>
                <ImageViewer
                    imageUrls={img.map( elem => ({url: elem}))}
                    saveToLocalByLongPress={false}
                    enableSwipeDown={false}
                    style={css.img}
                    minScale={.95}
                    pageAnimateTime={300}
                    renderArrowLeft={ () => (
                        <EvilIcons name="chevron-left" size={percentWidth(10)} color="#fff" />
                    )}
                    renderArrowRight={() => (
                        <EvilIcons name="chevron-right" size={percentWidth(10)} color="#fff" />
                    )}
                    onMove={() => pusher('Труд освобождает')}
                />

                <AntDesign
                    name="close"
                    size={userWidth * .12}
                    color="#fff"
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
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        width: '30%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counter: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: 2
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