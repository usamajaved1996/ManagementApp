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

const AddEmployee = ({ navigation }) => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        contact: '',
        type: '',
        department: '',
        address: '',
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
                headerText="Add New Employee"
                onBackPress={handleBackPress}
                backIcon={BackIcon}
                headerImg={HeaderImg}
            />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <Text style={styles.label}>First Name</Text>
                    <CustomTextInput
                        placeholder="John"
                        value={form.firstName}
                        onChangeText={(value) => handleInputChange('firstName', value)}
                    />
                    <Text style={styles.label}>Last Name</Text>
                    <CustomTextInput
                        placeholder="Michael"
                        value={form.lastName}
                        onChangeText={(value) => handleInputChange('lastName', value)}
                    />
                    <Text style={styles.label}>Gender</Text>
                    <CustomTextInput
                        placeholder="Male"
                        value={form.gender}
                        onChangeText={(value) => handleInputChange('gender', value)}
                    />

                    <Text style={styles.label}>Email</Text>
                    <CustomTextInput
                        placeholder="Email Address"
                        value={form.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                    />

                    <Text style={styles.label}>Contact</Text>
                    <CustomTextInput
                        placeholder="2341342612"
                        value={form.contact}
                        onChangeText={(value) => handleInputChange('contact', value)}
                    />

                    <Text style={styles.label}>Employee Type</Text>
                    <CustomTextInput
                        placeholder="Permanent"
                        value={form.type}
                        onChangeText={(value) => handleInputChange('type', value)}
                    />

                    <Text style={styles.label}>Department</Text>
                    <CustomTextInput
                        placeholder="Finance"
                        value={form.department}
                        onChangeText={(value) => handleInputChange('department', value)}
                    />
                    <Text style={styles.label}>Residential Address</Text>
                    <CustomTextInput
                        placeholder="Abc street"
                        value={form.address}
                        onChangeText={(value) => handleInputChange('address', value)}
                    />
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add</Text>
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

export default AddEmployee;
