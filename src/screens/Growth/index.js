import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Growth = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Growth</Text>
            <Text>Here, you can view detailed reports on stock, sales, and more.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Growth;
