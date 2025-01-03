import React from 'react';
import { Text, StyleSheet, View, Image, StatusBar } from 'react-native';

const Splash = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#212264" barStyle="light-content" />
            <View style={{
                alignItems: 'center',
            }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>INVENTORY MANAGEMENT</Text>
            </View>
            {/* <Image source={SplashImage} style={styles.image} resizeMode="cover" /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212264'
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default Splash;
