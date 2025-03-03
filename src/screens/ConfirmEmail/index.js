import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import TextInput from '../../components/textinput/index'; // Import the reusable component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Button from '../../components/button/index'; // Import CustomButton component
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for back arrow
import * as customStyles from "../../utils/color";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toastMsg } from '../../components/Toast';
import { confirmEmail, resentCode } from '../../slices/authSlice';

const { width, height } = Dimensions.get('window');

const ConfirmEmail = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { email } = route.params; // Access the email parameter

    const [showResendText, setShowResendText] = useState(false); // State to control text visibility

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowResendText(true);
        }, 9000); // 30 seconds delay

        return () => clearTimeout(timer); // Cleanup timer when component unmounts
    }, []);

    const handleResendOTP = async () => {
        try {
            const response = await dispatch(resentCode({ email: email })).unwrap();
            toastMsg(response?.data.message || 'OTP Resent Successfully', 'success');
        } catch (error) {
            console.log('catch error:', error);
            const errorMessage = typeof error === 'string' ? error : error?.message || 'Unexpected error occurred';
            console.log('errorMessage error:', errorMessage);
            toastMsg(errorMessage, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleConfirm = async (values, { setSubmitting }) => {
        try {
            const response = await dispatch(confirmEmail({ email: email, code: values.code })).unwrap();
            toastMsg(response?.data.message || 'Email confirm', 'success');
            navigation.navigate('Login');
        } catch (error) {
            console.log('catch error:', error);
            const errorMessage = typeof error === 'string' ? error : error?.message || 'Unexpected error occurred';
            console.log('errorMessage error:', errorMessage);
            toastMsg(errorMessage, 'error');
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <Formik
            initialValues={{ code: '' }}
            onSubmit={handleConfirm}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Icon name={"arrow-back"} size={26} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>
                            Enter OTP code
                        </Text>
                        <Text style={styles.subTitle}>
                            Please enter the OTP code to confirm your account.
                        </Text>
                        <View style={{ marginBottom: 35 }}>
                            <TextInput
                                value={values.code}
                                onChangeText={handleChange('code')}
                                onBlur={handleBlur('code')}
                                errorMessage={touched.code && errors.code ? errors.code : ''}
                                placeholder={'OTP code'}
                                placeholderColor={customStyles.Colors.placeHolderColor}
                            />
                        </View>

                        <Button
                            textColor="#fff"
                            text={'Confirm'}
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
        marginTop: '40%'

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
        zIndex: 10, // Ensure the header is above the other content
    },
    backButton: {
        padding: 10,
    },
    resendText: {
        fontSize: 14,
        color: customStyles.Colors.blueTheme,
        textAlign: 'center',
        marginTop: 16,
        textDecorationLine: 'underline',
    },
});


export default ConfirmEmail;
