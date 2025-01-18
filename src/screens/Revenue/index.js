import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library

const Revenue = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor="#888"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16
    },

    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#8D8D8DBD",
        marginTop: 5
    },
    searchIcon: {
        marginRight: 8,
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
        color: "#000000",
    },
});

export default Revenue;
