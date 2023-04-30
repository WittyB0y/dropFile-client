import React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';

const TextLink = ({ url, text, style={fontSize: 25, fontWeight: '800'} }) => {
    const handlePress = () => {
        Linking.openURL(url);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={style}>{text}</Text>
        </TouchableOpacity>
    );
};

export default TextLink;
