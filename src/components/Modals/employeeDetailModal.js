import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as customStyles from "../../utils/color";
import CustomTextInput from '../../components/textinput/index'; // Adjust the path as needed
import User from '../../assets/images/user.png';
import Email from '../../assets/images/envelope.png';
import Phone from '../../assets/images/phone.png';

const EmployeeDetailModal = ({ visible, onClose }) => {
    const [form, setForm] = useState({
        Deductions: '',
        Overtime: '',
        Bonus: '',
    });
    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };
    return (
        <Modal transparent animationType="slide" visible={visible}>
            <View style={styles.modalOverlay}>
                <View style={styles.bottomModal}>
                    {/* Gradient Header */}
                    <LinearGradient
                        colors={['#2F5E41', '#2B2B95']}
                        style={styles.gradientHeader}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <Text style={styles.headerTitle}>Employee Details</Text>
                    </LinearGradient>

                    {/* Content */}
                    <View style={styles.content}>
                        <View style={styles.infoRow}>
                            <Image source={User} style={styles.image} resizeMode="contain" />
                            <Text style={styles.infoLabel}>Name:</Text>
                            <Text style={styles.infoValue}>Sean Palock</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Image source={Email} style={styles.image} resizeMode="contain" />
                            <Text style={styles.infoLabel}>Email:</Text>
                            <Text style={styles.infoValue}>Seanpalock@gmail.com</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Image source={Phone} style={styles.image} resizeMode="contain" />
                            <Text style={styles.infoLabel}>Phone:</Text>
                            <Text style={styles.infoValue}>+112-233-433-2334</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Payroll Details</Text>
                        <Text style={styles.label}>Deductions</Text>
                        <CustomTextInput
                            placeholder="$2234"
                            value={form.Deductions}
                            onChangeText={(value) => handleInputChange('Deductions', value)}
                        />
                        <Text style={styles.label}>Overtime (hours)</Text>
                        <CustomTextInput
                            placeholder="08"
                            value={form.Overtime}
                            onChangeText={(value) => handleInputChange('Overtime', value)}
                        />
                        <Text style={styles.label}>Bonus Amount</Text>
                        <CustomTextInput
                            placeholder="$4535"
                            value={form.Bonus}
                            onChangeText={(value) => handleInputChange('Bonus', value)}
                        />

                        <View style={styles.netPayRow}>
                            <Text style={styles.netPayLabel}>Net Pay:</Text>
                            <Text style={styles.netPayValue}>$3456.00</Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <TouchableOpacity style={styles.upgradeButton}>
                        <Text style={styles.upgradeButtonText}>Upgrade</Text>
                    </TouchableOpacity>
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
    bottomModal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
        width: '100%',
    },
    gradientHeader: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#fff',
        paddingLeft: 2
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    infoRow: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#285238',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4C4C4C',
        marginLeft: 40
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
        marginVertical: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        color: '#000',
    },
    netPayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5FE',
        padding: 16,
        borderRadius: 5,
        marginVertical: 10,
    },
    netPayLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    netPayValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    upgradeButton: {
        backgroundColor: customStyles.Colors.blueTheme,
        paddingVertical: 16,
        alignItems: 'center',
        marginHorizontal: 16,
        borderRadius: 5,
        marginTop: 10,
    },
    upgradeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
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
    label: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    image: {
        width: 18,
        height: 18,
        marginRight:14,
        marginTop:3
    }
});

export default EmployeeDetailModal;
