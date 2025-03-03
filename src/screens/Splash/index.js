import React from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 

const Splash = () => {
    return (
        <LinearGradient
            colors={['#2F5E41', '#2B2B95']} // Gradient colors
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
        <View style={styles.textContainer}>
            <StatusBar backgroundColor="#2F5E41" barStyle="light-content" />
            <Text style={styles.title}>INNOVA MANAGEMENT</Text>
        </View>
       </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 27,
        fontWeight: '600',
        paddingLeft: 6,
        paddingRight: 6
    },
});

export default Splash;
