import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Dollar from '../../assets/images/dollar.png';
import Last from '../../assets/images/lastInventory.png';
import * as customStyles from "../../utils/color";
import Profit from '../../assets/images/profit.png';

const Growth = () => {
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 25 }} />
            <View style={styles.rowContainer}>
                <View style={styles.cardSecondary}>
                    <Image source={Dollar} style={styles.image} resizeMode="cover" />
                    <Text style={styles.cardSecondaryValue}>$24,500</Text>
                    <Text style={styles.cardSecondaryTitle}>Total Revenue</Text>
                </View>

                <View style={styles.cardSecondary}>
                    <Image source={Last} style={styles.image} resizeMode="cover" />
                    <Text style={styles.cardSecondaryValue}>12</Text>
                    <Text style={styles.cardSecondaryTitle}>Last Inventory</Text>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.cardSecondary}>
                    <Image source={Profit} style={styles.image} resizeMode="cover" />
                    <Text style={styles.cardSecondaryValue}>509,200</Text>
                    <Text style={styles.cardSecondaryTitle}>Total Product</Text>
                </View>

                <View style={styles.cardSecondary}>
                    <Image source={Last} style={styles.image} resizeMode="cover" />
                    <Text style={styles.cardSecondaryValue}>560</Text>
                    <Text style={styles.cardSecondaryTitle}>Total Visitors</Text>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.cardSecondary}>
                    <Image source={Dollar} style={styles.image} resizeMode="cover" />
                    <Text style={styles.cardSecondaryValue}>80</Text>
                    <Text style={styles.cardSecondaryTitle}>Total Employee</Text>
                </View>

                <View style={styles.cardSecondary}>
                    <Image source={Profit} style={styles.image} resizeMode="cover" />
                    <Text style={styles.cardSecondaryValue}>$20,000</Text>
                    <Text style={styles.cardSecondaryTitle}>Total Expenses</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
 
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 0,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    cardSecondary: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        padding: 15,
        flex: 1,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardSecondaryTitle: {
        fontSize: 14,
        color: customStyles.Colors.inventoryText,
        marginBottom: 10,
        paddingTop: 4
    },
    cardSecondaryValue: {
        fontSize: 28,
        fontWeight: "600",
        color: "#1f2a42",
        paddingTop: 16
    },
});

export default Growth;
