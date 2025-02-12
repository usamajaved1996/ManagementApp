import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import CustomTextInput from '../../components/textinput/index';
import Header from '../../components/header';
import HeaderImg from '../../assets/images/headerImg.png';
import BackIcon from '../../assets/images/back.png';
import * as customStyles from "../../utils/color";
import { updateEmployee, getEmployeeById } from '../../slices/payRollSlice';
import { toastMsg } from '../../components/Toast';
import { useDispatch, useSelector } from 'react-redux';

const EditEmployee = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { employeeId } = route.params;

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        contact: '',
        employeeType: '',
        department: '',
        address: '',
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await dispatch(getEmployeeById(employeeId));
            if (response?.payload) {
                const data = response.payload;
                setForm({
                    firstName: data.name.split(' ')[0] || '',
                    lastName: data.name.split(' ')[1] || '',
                    gender: data.gender,
                    email: data.email,
                    contact: data.contact,
                    employeeType: data.employeeType,
                    department: data.department,
                    address: data.address,
                });
            }
        };
        fetchEmployee();
    }, [dispatch, employeeId]);

    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                ...form,
                id: employeeId ,
                name: `${form.firstName} ${form.lastName}`.trim(),
            };
            delete payload.firstName;
            delete payload.lastName;

            const response = await dispatch(updateEmployee( payload ));
            if (response) {
                toastMsg('Employee Updated Successfully', 'success');
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error updating employee', error);
            toastMsg('Unexpected error occurred', 'error');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Header
                headerText="Edit Employee"
                onBackPress={handleBackPress}
                backIcon={BackIcon}
                headerImg={HeaderImg}
            />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <Text style={styles.label}>First Name</Text>
                    <CustomTextInput
                        value={form.firstName}
                        onChangeText={(value) => handleInputChange('firstName', value)}
                    />
                    <Text style={styles.label}>Last Name</Text>
                    <CustomTextInput
                        value={form.lastName}
                        onChangeText={(value) => handleInputChange('lastName', value)}
                    />
                    <Text style={styles.label}>Gender</Text>
                    <CustomTextInput
                        value={form.gender}
                        onChangeText={(value) => handleInputChange('gender', value)}
                    />
                    <Text style={styles.label}>Email</Text>
                    <CustomTextInput
                        value={form.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    <Text style={styles.label}>Contact</Text>
                    <CustomTextInput
                        value={form.contact}
                        onChangeText={(value) => handleInputChange('contact', value)}
                    />
                    <Text style={styles.label}>Employee Type</Text>
                    <CustomTextInput
                        value={form.employeeType}
                        onChangeText={(value) => handleInputChange('employeeType', value)}
                    />
                    <Text style={styles.label}>Department</Text>
                    <CustomTextInput
                        value={form.department}
                        onChangeText={(value) => handleInputChange('department', value)}
                    />
                    <Text style={styles.label}>Residential Address</Text>
                    <CustomTextInput
                        value={form.address}
                        onChangeText={(value) => handleInputChange('address', value)}
                    />
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update</Text>
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
        paddingBottom: 20,
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
    }
});

export default EditEmployee;
