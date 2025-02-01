import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

const Header = ({ headerText, onBackPress, backIcon }) => {
    return (
        <SafeAreaView style={styles.safeArea}> 
            <View style={styles.headerContainer}>
                {/* Linear Gradient Background */}
                <LinearGradient
                    colors={['#2F5E41', '#2B2B95']} 
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#f9f9f9', 
    },
    headerContainer: {
        height: Platform.OS === 'ios' ? 60 : 60, // Increase height for iOS
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    gradientBackground: {
        ...StyleSheet.absoluteFillObject,
    },
    backIconContainer: {
        position: "absolute",
        left: 16,
        top: Platform.OS === 'ios' ? 20 : 20, // Adjust position for iOS
    },
    backIcon: {
        width: 13,
        height: 20,
    },
    headerTextContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 16 : 16, // Adjust for iOS
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
    },
});

export default Header;
