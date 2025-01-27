import React, { useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import TextInput from '../../components/textinput/index'; // Import the reusable component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Button from '../../components/button/index'; // Import CustomButton component
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for back arrow
import * as customStyles from "../../utils/color";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { forgotPassword } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { toastMsg } from '../../components/Toast';

const { width, height } = Dimensions.get('window');
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Invalid email')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email format'
        )
        .min(3, 'Username must be at least 3 characters long'),
});
const ForgotPassword = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleForgot = async (values, { setSubmitting }) => {
        try {
            const response = await dispatch(forgotPassword({ email: values.email }));
            // console.log('response on forgot', response)
            if (response) {
                toastMsg('OTP code send in email', 'success');
                navigation.navigate('ResetPassword', { email: values.email });
            }
        } catch (error) {
            console.error('Forgot Password error', error);
            toastMsg('Unexpected error occurred', 'error');
        } finally {
            setSubmitting(false);
        }

    };
    return (
        <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleForgot}
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
                            Reset your password
                        </Text>
                        <Text style={styles.subTitle}>
                            Please enter the email address you'd like your password reset information sent to.
                        </Text>
                        <View style={{ marginBottom: 35 }}>
                            <TextInput
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                errorMessage={touched.email && errors.email ? errors.email : ''}
                                placeholder={'Email Address'}
                                placeholderColor={customStyles.Colors.placeHolderColor}
                            />
                        </View>

                        <Button
                            textColor="#fff"
                            text={'Reset you password'}
                            onPress={handleSubmit}
                            loading={isSubmitting}
                        />
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
});


export default ForgotPassword;
