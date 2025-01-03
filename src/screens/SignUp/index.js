import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import TextInput from '../../components/textinput/index';
import Button from '../../components/button/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as customStyles from "../../utils/color";
import * as Yup from 'yup';
import Google from '../../assets/images/google.png';

const { width } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
    storeName: Yup.string()
        .required('Store Name is required')
        .min(3, 'Store Name must be at least 3 characters long'),
    email: Yup.string()
        .required('Email Address is required')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email format'
        ),
    phone: Yup.string()
        .required('Phone Number is required')
        .matches(/^[0-9]{10,15}$/, 'Phone Number must be 10-15 digits long'),
    password: Yup.string()
        .required('Password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup = () => {
    const navigation = useNavigation();
    const [rememberMe, setRememberMe] = useState(false);
    const [savedCredentials, setSavedCredentials] = useState({ userName: '', password: '' });

    useEffect(() => {
        // Load saved credentials from AsyncStorage
        const loadSavedCredentials = async () => {
            const storedUserName = await AsyncStorage.getItem('userName');
            const storedPassword = await AsyncStorage.getItem('password');
            if (storedUserName && storedPassword) {
                setSavedCredentials({ userName: storedUserName, password: storedPassword });
                setRememberMe(true);
            }
        };
        loadSavedCredentials();
    }, []);

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            console.log('Login attempt', values);

            if (rememberMe) {
                // Save credentials to AsyncStorage
                await AsyncStorage.setItem('userName', values.email);
                await AsyncStorage.setItem('password', values.password);
            } else {
                // Clear saved credentials if "Remember me" is unchecked
                await AsyncStorage.removeItem('userName');
                await AsyncStorage.removeItem('password');
            }
        } catch (error) {
            console.error('Login error', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Formik
                initialValues={{
                    storeName: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>
                            Welcome to <Text style={styles.highlight}>Name</Text> Inventory System.
                        </Text>
                        <TextInput
                            placeholder={'Store Name'}
                            placeholderColor={customStyles.Colors.placeHolderColor}
                            value={values.storeName}
                            onChangeText={handleChange('storeName')}
                            onBlur={handleBlur('storeName')}
                            errorMessage={touched.storeName && errors.storeName ? errors.storeName : ''}
                        />
                        <TextInput
                            placeholder={'Email Address'}
                            placeholderColor={customStyles.Colors.placeHolderColor}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            errorMessage={touched.email && errors.email ? errors.email : ''}
                        />
                        <TextInput
                            placeholder={'Phone Number'}
                            placeholderColor={customStyles.Colors.placeHolderColor}
                            value={values.phone}
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            errorMessage={touched.phone && errors.phone ? errors.phone : ''}
                        />
                        <TextInput
                            placeholder={'Password'}
                            placeholderColor={customStyles.Colors.placeHolderColor}
                            secureTextEntry
                            iconName="eye"
                            iconColor="#7E7E82"
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            errorMessage={touched.password && errors.password ? errors.password : ''}
                        />
                        <TextInput
                            placeholder={'Confirm Password'}
                            placeholderColor={customStyles.Colors.placeHolderColor}
                            secureTextEntry
                            iconName="eye"
                            iconColor="#7E7E82"
                            value={values.password}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            errorMessage={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
                        />

                        <View style={styles.rememberContainer}>
                            <TouchableOpacity
                                style={styles.checkbox}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <Icon
                                    name={rememberMe ? 'checkbox-outline' : 'square-outline'}
                                    size={20}
                                    color="#000"
                                />
                            </TouchableOpacity>
                            <Text style={styles.rememberText}>Remember me</Text>
                        </View>

                        <Button
                            backgroundColor={customStyles.backgroundColors.primary}
                            textColor="#fff"
                            text={isSubmitting ? null : 'Create Account'}
                            onPress={handleSubmit}
                            loading={isSubmitting}
                        />

                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.registerLink}> Log in Now</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.orText}>or Access Quickly</Text>

                        <TouchableOpacity style={styles.googleButton}>
                            <Image source={Google} style={styles.image} resizeMode="cover" />
                            <Text style={styles.googleText}>Sign in with google</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 19,
        fontWeight: '800',
        marginBottom: 10,
        color: '#000',
    },
    highlight: {
        color: customStyles.backgroundColors.primary1,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 35,
        marginTop: 10,
    },
    linkText1: {
        fontSize: 14,
        color: '#BD3C32',
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    linkText2: {
        fontSize: 14,
        color: '#0E0E52',
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30
    },
    checkbox: {
        marginRight: 6,
    },
    rememberText: {
        fontSize: 14,
        color: '#000',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    registerText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    registerLink: {
        fontSize: 16,
        fontWeight: '800',
        color: customStyles.backgroundColors.primary1,
    },
    orText: {
        textAlign: 'center',
        marginVertical: 30,
        color: '#555',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    image: {
        marginRight: 16,
        width: 22,
        height: 22,
    },
    googleText: {
        fontSize: 14,
        color: '#000',
    },
});

export default Signup;
