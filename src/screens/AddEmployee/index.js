import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../components/textinput/index';
import Header from '../../components/header';
import HeaderImg from '../../assets/images/headerImg.png';
import BackIcon from '../../assets/images/back.png';
import { addEmployee } from '../../slices/payRollSlice';
import { toastMsg } from '../../components/Toast';
import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

const AddEmployee = ({ navigation }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [employeeTypeOptions] = useState([
        { label: 'Permanent', value: 'PERMANENT' },
        { label: 'Contractual', value: 'CONTRACTUAL' }
    ]);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        gender: Yup.string().required('Gender is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        contact: Yup.string().matches(/^\d{10,15}$/, 'Invalid contact number').required('Contact is required'),
        employeeType: Yup.string().required('Employee Type is required'),
        department: Yup.string().required('Department is required'),
        address: Yup.string().required('Address is required'),
    });

    const handleBackPress = () => {
        navigation.goBack();
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
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        gender: '',
                        email: '',
                        contact: '',
                        employeeType: '',
                        department: '',
                        address: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const payload = {
                                ...values,
                                name: `${values.firstName} ${values.lastName}`.trim(),
                            };
                            delete payload.firstName;
                            delete payload.lastName;

                            const response = await dispatch(addEmployee(payload));
                            if (response) {
                                toastMsg('Employee Added', 'success');
                                navigation.goBack();
                            }
                        } catch (error) {
                            toastMsg('Unexpected error occurred', 'error');
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => (
                        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                            <Text style={styles.label}>First Name</Text>
                            <CustomTextInput
                                placeholder="First Name"
                                value={values.firstName}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                            />
                            {touched.firstName && errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                            <Text style={styles.label}>Last Name</Text>
                            <CustomTextInput
                                placeholder="Last Name"
                                value={values.lastName}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                            />
                            {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                            <Text style={styles.label}>Gender</Text>
                            <CustomTextInput
                                placeholder="Gender"
                                value={values.gender}
                                onChangeText={handleChange('gender')}
                                onBlur={handleBlur('gender')}
                            />
                            {touched.gender && errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

                            <Text style={styles.label}>Email</Text>
                            <CustomTextInput
                                placeholder="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                keyboardType="email-address"
                            />
                            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                            <Text style={styles.label}>Contact</Text>
                            <CustomTextInput
                                placeholder="Contact"
                                value={values.contact}
                                onChangeText={handleChange('contact')}
                                onBlur={handleBlur('contact')}
                                keyboardType="phone-pad"
                            />
                            {touched.contact && errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}

                            <Text style={styles.label}>Employee Type</Text>
                            <DropDownPicker
                                open={open}
                                value={values.employeeType}
                                items={employeeTypeOptions}
                                setOpen={setOpen}
                                setValue={(callback) => setFieldValue('employeeType', callback())}
                                style={styles.dropdown}
                                dropDownContainerStyle={styles.dropdownContainer}
                                placeholder="Select Employee Type"
                            />
                            {touched.employeeType && errors.employeeType && <Text style={styles.errorText}>{errors.employeeType}</Text>}

                            <Text style={styles.label}>Department</Text>
                            <CustomTextInput
                                placeholder="Department"
                                value={values.department}
                                onChangeText={handleChange('department')}
                                onBlur={handleBlur('department')}
                            />
                            {touched.department && errors.department && <Text style={styles.errorText}>{errors.department}</Text>}

                            <Text style={styles.label}>Residential Address</Text>
                            <CustomTextInput
                                placeholder="Address"
                                value={values.address}
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                            />
                            {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

                            <TouchableOpacity style={[styles.button, isSubmitting && styles.disabledButton]} onPress={handleSubmit} disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Add</Text>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    )}
                </Formik>
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 3
    },
    button: {
        backgroundColor: '#001f54',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    dropdown: {
        borderColor: '#0000004D',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginTop:12,
        height:56
    },
    dropdownContainer: {
        borderColor: '#0000004D',
        borderWidth: 1,
    },
});

export default AddEmployee;
