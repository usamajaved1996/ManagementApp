import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

const Header = ({ headerText, onBackPress, backIcon }) => {
    return (
        <View style={styles.headerContainer}>
            {/* Linear Gradient Background */}
            <LinearGradient
                colors={['#2F5E41', '#2B2B95']} // Gradient colors
                style={styles.gradientBackground}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
            />
            {/* Back Icon */}
            <TouchableOpacity style={styles.backIconContainer} onPress={onBackPress}>
                <Image source={backIcon} style={styles.backIcon} resizeMode="contain" />
            </TouchableOpacity>
            {/* Header Text */}
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>{headerText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 60, // Adjust height as needed
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    gradientBackground: {
        ...StyleSheet.absoluteFillObject, // Ensures the gradient covers the entire container
    },
    backIconContainer: {
        position: "absolute",
        left: 16,
        top: 20,
    },
    backIcon: {
        width: 13,
        height: 20,
    },
    headerTextContainer: {
        position: 'absolute',
        top: 16,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff", // Ensure visibility against the gradient
        textAlign: "center",
    },
});

export default Header;
