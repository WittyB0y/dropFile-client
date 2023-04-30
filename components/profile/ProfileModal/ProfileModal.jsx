import {Modal, View, StyleSheet, Image, Dimensions} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import CustomButton from "../../CustomButton";
import pickImage from "../UploadProfilePhoto";
import {defaultStyles} from "../../styles";

export default function ProfileModal({state, setState, photoURI, token, setUrl, id}){
    const userWidth = Math.round(Dimensions.get("window").width)
    const buttons = [
        {
            title: 'Сменить фото',
            action: () => pickImage(token, setUrl, id),
            style: {
                btnBox: {
                    backgroundColor: defaultStyles.buttons.green
                },
                btnText: {}
            }
        }
    ]

    // console.log(userWidth * .12)

    return (
        <Modal visible={state} animationType={'fade'} transparent={true}>
            <View style={css.fullWindow}>
                <AntDesign name="closecircleo" size={userWidth * .12} color="white" style={css.modalWindow__icon} onPress={() => setState(false)}/>

                {photoURI ? <Image source={{uri: photoURI}} style={css.img}/> : null}
                {buttons.map((element, index) => (
                    <CustomButton
                        text={element.title}
                        actionFunc={element.action}
                        style={element.style}
                        key={index}
                    />
                ))}
            </View>
        </Modal>
    )
}

const css = StyleSheet.create({
    fullWindow: {
        width: '100%',
        height: '100%',

        backgroundColor: 'rgba(75,75,75,0.95)',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    img: {
        width: 300,
        height: 300,
        borderRadius: 45
    },
    modalWindow__icon: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10,
    },
})