import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import TextInput from '../../components/textinput/index';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/button/index';
import Icon from 'react-native-vector-icons/Ionicons';
import * as customStyles from "../../utils/color";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { resentCode, resetPassword } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { toastMsg } from '../../components/Toast';

const validationSchema = Yup.object().shape({
    code: Yup.string().required('OTP code is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const ResetPassword = ({ route }) => {
    const { email } = route.params; // Access the email parameter
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [showResendText, setShowResendText] = useState(false); // State to control text visibility

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowResendText(true);
        }, 1000); // 30 seconds delay

        return () => clearTimeout(timer); // Cleanup timer when component unmounts
    }, []);

    const handleReset = async (values, { setSubmitting }) => {
        try {
            const response = await dispatch(resetPassword({ email: email, password: values.password, code: values.code }));
            if (response) {
                toastMsg('Password Reset Successful', 'success');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Reset Password error', error);
            toastMsg('Unexpected error occurred', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await dispatch(resentCode({ email: email }));
            console.log('response', response)
            if (response) {
                toastMsg('OTP Resent Successfully', 'success');
            }
        } catch (error) {
            console.error('Resend OTP error', error);
            toastMsg('Unexpected error occurred', 'error');
        }
    };

    return (
        <Formik
            initialValues={{ code: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleReset}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Icon name={"arrow-back"} size={26} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Setting up your password</Text>
                        <Text style={styles.subTitle}>Please reset your password by providing the details below.</Text>
                        <View style={{ marginBottom: 35 }}>
                            <TextInput
                                value={values.code}
                                onChangeText={handleChange('code')}
                                onBlur={handleBlur('code')}
                                errorMessage={touched.code && errors.code ? errors.code : ''}
                                placeholder={'Enter OTP Code'}
                                placeholderColor={customStyles.Colors.placeHolderColor}
                            />
                            <TextInput
                                placeholder={'Enter New Password'}
                                placeholderColor={customStyles.Colors.placeHolderColor}
                                secureTextEntry
                                iconName="eye"
                                iconColor="#7E7E82"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                errorMessage={touched.password && errors.password ? errors.password : ''}
                            />
                            <TextInput
                                placeholder={'Confirm New Password'}
                                placeholderColor={customStyles.Colors.placeHolderColor}
                                secureTextEntry
                                iconName="eye"
                                iconColor="#7E7E82"
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                errorMessage={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
                            />
                        </View>

                        {/* Button for setting password */}
                        <Button
                            textColor="#fff"
                            text={isSubmitting ? null : 'Set Password'}
                            onPress={handleSubmit}
                            loading={isSubmitting}
                        />
                        {showResendText && (
                            <TouchableOpacity onPress={handleResendOTP}>
                                <Text style={styles.resendText}>Resend OTP</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingHorizontal: 20,
        marginTop: '40%',
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 10,
        color: '#000',
    },
    subTitle: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 10,
        color: '#1E1E1E',
    },
    header: {
        position: 'absolute',
        top: Platform.OS == 'ios' ? 50 : 15,
        left: 8,
        zIndex: 10,
    },
    backButton: {
        padding: 10,
    },
    timerText: {
        fontSize: 14,
        color: '#7E7E82',
        marginBottom: 20,
        textAlign: 'center',
    },
    resendText: {
        fontSize: 14,
        color: customStyles.Colors.blueTheme,
        textAlign: 'center',
        marginTop: 16,
        textDecorationLine: 'underline',
    },
});

export default ResetPassword;
