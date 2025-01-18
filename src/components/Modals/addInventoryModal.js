import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import * as customStyles from "../../utils/color";
import AddManual from '../../assets/images/addInventoryImg.png';
import AddScan from '../../assets/images/addInventoryScanImg.png';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const AddInventoryModal = ({ visible, onClose }) => {
    const navigation = useNavigation(); // Access navigation object

    return (
        <Modal transparent animationType="slide" visible={visible}>
            <View style={styles.modalOverlay}>
                <View style={styles.bottomModal}>
                    {/* Gradient Header */}
                    <LinearGradient
                        colors={['#2F5E41', '#2B2B95']} // Gradient colors
                        style={styles.gradientBackground}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <Text style={styles.title}>Add Inventory</Text>
                    </LinearGradient>
                    <View style={{
                        marginTop: 12
                    }} />
                    {/* Option Buttons */}
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => {
                            navigation.navigate('AddInventory'); // Correctly navigate to the 'Login' screen
                            onClose(); // Call the onClose function
                        }}
                    >
                        <View style={styles.optionContent}>
                            <Image
                                source={AddManual} // Replace with a local or remote image
                                style={styles.optionIcon}
                            />

                            <View>
                                <Text style={styles.optionTitle}>Add Manually</Text>
                                <Text style={styles.optionDescription}>
                                    Add your inventory details manually
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => {
                            navigation.navigate('Scanner'); // Navigate to the Scanner screen
                            onClose(); // Close the modal
                        }}
                    >
                        <View style={styles.optionContent}>
                            <Image
                                source={AddScan} // Replace with a local or remote image
                                style={styles.optionIcon}
                            />
                            <View>
                                <Text style={styles.optionTitle}>Add by Scan</Text>
                                <Text style={styles.optionDescription} >
                                    Add your inventory details by scanning barcode
                                </Text>

                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    gradientBackground: {
        padding: 20,
    },
    bottomModal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        width: '100%',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#fff',

    },
    optionButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: '#D0D0D0',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        width: 65,
        height: 65,
        marginRight: 10,
        resizeMode: 'contain'
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    optionDescription: {
        fontSize: 14,
        color: '#4C4C4C',
        fontWeight: '400',
        width: '90%'

    },
    closeButton: {
        marginTop: 14,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: customStyles.Colors.blueTheme
    },
    closeButtonText: {
        color: customStyles.Colors.blueTheme,
        fontSize: 16,
        fontWeight: '400',
    },
});

export default AddInventoryModal;
