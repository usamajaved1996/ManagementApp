import React, { useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import TextInput from '../../components/textinput/index'; // Import the reusable component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Button from '../../components/button/index'; // Import CustomButton component
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for back arrow
import * as customStyles from "../../utils/color";
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width, height } = Dimensions.get('window');
const validationSchema = Yup.object().shape({
    code: Yup.string()
        .required('Temporary code is required'),
    currentPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Current password is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const ResetPassword = () => {
    const navigation = useNavigation();

  const handleSave = async (values, { setSubmitting }) => {
        navigation.navigate('Login')
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{
                currentPassword: '', password: '',
                confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSave}
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
                            Setting up your password
                        </Text>
                        <Text style={styles.subTitle}>
                            Setting up your Password.
                        </Text>
                        <View style={{ marginBottom: 35 }}>
                            <TextInput
                                value={values.currentPassword}
                                onChangeText={handleChange('currentPassword')}
                                onBlur={handleBlur('currentPassword')}
                                errorMessage={touched.currentPassword && errors.currentPassword ? errors.currentPassword : ''}
                                placeholder={'Enter Current Password'}
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
                        <Button
                            textColor="#fff"
                            text={'Set Password'}
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
        top: 15, // Adjust the position
        left: 8,
        zIndex: 10, // Ensure the header is above the other content
    },
    backButton: {
        padding: 10,
    },
});


export default ResetPassword;


