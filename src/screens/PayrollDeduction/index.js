import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput
} from 'react-native';
import CustomTextInput from '../../components/textinput/index'; // Adjust the path as needed
import Header from '../../components/header';
import HeaderImg from '../../assets/images/headerImg.png';
import BackIcon from '../../assets/images/back.png';
import * as customStyles from "../../utils/color";

const PayrollDeduction = ({ navigation }) => {
    const [form, setForm] = useState({
        Health: '',
        Garnishments: '',
        Others: '',
        FICA: '',
        Loans: ''
    });

    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };
    const handleBackPress = () => {
        navigation.goBack();
    };
    const handleSubmit = () => {
        console.log('Form Submitted:', form);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Header
                headerText="Payroll Deduction List"
                onBackPress={handleBackPress}
                backIcon={BackIcon}
                headerImg={HeaderImg}
            />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <Text style={styles.label}>Health Insurance</Text>
                    <CustomTextInput
                        placeholder="$2100"
                        keyboardType="phone-pad" // Use keyboardType="phone-pad"
                        value={form.Health}
                        onChangeText={(value) => handleInputChange('Health', value)}
                    />

                    <Text style={styles.label}>Garnishments</Text>
                    <CustomTextInput
                        placeholder="$1100"
                        keyboardType="phone-pad" // Use keyboardType="phone-pad"
                        value={form.Garnishments}
                        onChangeText={(value) => handleInputChange('Garnishments', value)}
                    />

                    <Text style={styles.label}>Others</Text>
                    <CustomTextInput
                        placeholder="$2100"
                        keyboardType="phone-pad" // Use keyboardType="phone-pad"
                        value={form.Others}
                        onChangeText={(value) => handleInputChange('Others', value)}
                    />

                    <Text style={styles.label}>FICA</Text>
                    <CustomTextInput
                        placeholder="$100"
                        keyboardType="phone-pad" // Use keyboardType="phone-pad"
                        value={form.FICA}
                        onChangeText={(value) => handleInputChange('FICA', value)}
                    />
                    <Text style={styles.label}>Loans</Text>
                    <CustomTextInput
                        placeholder="$100"
                        keyboardType="phone-pad" // Use keyboardType="phone-pad"
                        value={form.Loans}
                        onChangeText={(value) => handleInputChange('Loans', value)}
                    />

                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollContent: {
        paddingHorizontal: 14,
        paddingBottom: 20, // Extra padding at the bottom for smooth scrolling
    },
    label: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },

    button: {
        backgroundColor: '#001f54',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 14,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    multilineInput: {
        backgroundColor: customStyles.Colors.textInputBgColor,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: customStyles.Colors.textInputBorder,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 14,
        color: '#333',
        height: 130, // Height for multiline input
        textAlignVertical: 'top', // Ensures text starts at the top
        marginTop: 20
    },
});

export default PayrollDeduction;
