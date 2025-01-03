import React, { useState, useContext } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as customStyles from "../../utils/color";

const CustomTextInput = ({
    placeholder,
    secureTextEntry = false,
    style,
    placeholderColor = 'black',
    iconColor = '#000',
    errorMessage,
    ...props
}) => {
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry);

    const toggleSecureTextEntry = () => {
        setIsSecureTextEntry(!isSecureTextEntry);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer, style]}>
                <TextInput
                    style={[
                        styles.input,
                        {
                            borderColor: errorMessage ? 'red' : customStyles.Colors.textInputBorder, // Apply red border on error
                            borderWidth: 1, // Ensure border width is 1
                        },

                    ]}
                    placeholder={placeholder}
                    secureTextEntry={isSecureTextEntry}
                    placeholderTextColor={placeholderColor}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.icon}>
                        <Icon name={isSecureTextEntry ? "eye-off" : "eye"} size={24} color={iconColor} />
                    </TouchableOpacity>
                )}
            </View>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%', // Ensure the container takes full width
        alignSelf:'center'
    },
    inputContainer: {
        position: 'relative',
        width: '100%', // Ensure it takes up full width
        marginTop: 20,
    },
    input: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: customStyles.Colors.textInputBgColor,
        height: 56, // Fixed height to prevent changes when error occurs
        width: '100%', // Ensure the input takes up 100% width
        fontSize: 15,
        fontWeight: '400'
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 4,
        transform: [{ translateY: 12 }], // Keep the icon vertically centered
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 8, // Add space between input and error text
        marginLeft: 4,
        fontWeight:'500'
    },
});

export default CustomTextInput;
