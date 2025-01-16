import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/header';
import HeaderImg from '../../assets/images/headerImg.png';
import BackIcon from '../../assets/images/back.png';
import * as customStyles from "../../utils/color";

const Notifications = ({ navigation }) => {
    const [phoneNotifications, setPhoneNotifications] = useState(false);
    const [notifications, setNotifications] = useState({
        communications: {
            mentions: false,
            updates: false,
            replies: false,
            reactions: false,
        },
        inventory: {
            newInventory: false,
            inventoryUpdates: false,
            inventoryStatus: false,
        },
    });
    const handleBackPress = () => {
        navigation.goBack();
    };
    const toggleSwitch = (category, type) => {
        setNotifications((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [type]: !prev[category][type],
            },
        }));
    };
    return (
        <View style={styles.container}>
            <Header
                headerText="Notifications"
                onBackPress={handleBackPress}
                backIcon={BackIcon}
                headerImg={HeaderImg}
            />
            <View style={styles.mainContent}>

                <Text style={styles.header}>Notifications</Text>
                <View style={styles.section}>
                    <View style={styles.phoneNotificationContainer}>
                        <View>
                            <Text style={styles.phoneTitle}>Phone notifications</Text>
                            <Text style={styles.phoneSubtitle}>Receive notifications directly on my phone</Text>
                        </View>
                        <Switch
                            value={phoneNotifications}
                            onValueChange={() => setPhoneNotifications(!phoneNotifications)}
                        />
                    </View>
                </View>

                <Text style={styles.subHeader}>Choose which notification you would like to receive</Text>

                <View style={styles.card}>
                    <View style={styles.tabContainer}>
                        <Text style={styles.tabText}>Communications</Text>
                    </View>
                    {Object.keys(notifications.communications).map((key) => (
                        <View style={styles.item} key={key}>
                            <Text style={styles.itemText}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                            <Switch
                                value={notifications.communications[key]}
                                onValueChange={() => toggleSwitch('communications', key)}
                            />
                        </View>
                    ))}
                </View>

                <View style={styles.card}>
                    <View style={styles.tabContainer}>
                        <Text style={styles.tabText}>Inventory</Text>
                    </View>
                    {Object.keys(notifications.inventory).map((key) => (
                        <View style={styles.item} key={key}>
                            <Text style={styles.itemText}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Text>
                            <Switch
                                value={notifications.inventory[key]}
                                onValueChange={() => toggleSwitch('inventory', key)}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customStyles.backgroundColors.bGColor,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#000000',
    },
    section: {
        marginBottom: 24,
    },
    mainContent: { paddingTop: 32, paddingLeft: 17, paddingRight: 17 },
    phoneNotificationContainer: {
        backgroundColor: '#E8E8F5',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    phoneTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    phoneSubtitle: {
        fontSize: 14,
        color: '#6C6C80',
    },
    subHeader: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        color: '#000000',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tabContainer: {
        backgroundColor: '#F5F5FA',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    itemText: {
        fontSize: 16,
        color: '#000000',
    },
});

export default Notifications;
