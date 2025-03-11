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
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/authSlice';
import { toastMsg } from '../../components/Toast';

const { width } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
    userName: Yup.string()
        .required('Invalid email or phone number')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email format'
        )
        .min(3, 'Username must be at least 3 characters long'),
    password: Yup.string()
        .required('Invalid password'),
});

const Login = () => {
    const navigation = useNavigation();
    const [rememberMe, setRememberMe] = useState(false);
    const [savedCredentials, setSavedCredentials] = useState({ userName: '', password: '' });
    const dispatch = useDispatch();

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
            if (rememberMe) {
                await AsyncStorage.setItem('userName', values.userName);
                await AsyncStorage.setItem('password', values.password);
            } else {
                await AsyncStorage.removeItem('userName');
                await AsyncStorage.removeItem('password');
            }
            const response = await dispatch(login({ email: values.userName, password: values.password })).unwrap();
            toastMsg(response?.data.message || 'Login successful', 'success');
    
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
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Formik
                initialValues={{ userName: savedCredentials.userName, password: savedCredentials.password }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>
                            Welcome to <Text style={styles.highlight}>Innova</Text> Inventory System
                        </Text>

                        <TextInput
                            placeholder={'Email Address'}
                            placeholderColor={customStyles.Colors.placeHolderColor}
                            value={values.userName}
                            onChangeText={handleChange('userName')}
                            onBlur={handleBlur('userName')}
                            errorMessage={touched.userName && errors.userName ? errors.userName : ''}
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

                        <View style={styles.linkContainer}>

                            {/* <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                                <Text style={styles.linkText2}>Change Password</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text style={styles.linkText2}>Forgot my password</Text>
                            </TouchableOpacity>
                        </View>

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
                            textColor="#fff"
                            text={isSubmitting ? null : 'Log in'}
                            onPress={handleSubmit}
                            loading={isSubmitting}
                        />

                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>Don’t have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={styles.registerLink}> Sign up Now</Text>
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
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 10,
        color: '#000',
    },
    highlight: {
        color: customStyles.backgroundColors.primary1,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
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

export default Login;

