import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../components/textinput/index';
import Header from '../../components/header';
import HeaderImg from '../../assets/images/headerImg.png';
import BackIcon from '../../assets/images/back.png';
import { addProduct } from '../../slices/inventorySlice';
import { toastMsg } from '../../components/Toast';
import { useDispatch } from 'react-redux';

const AddInventory = ({ navigation }) => {
    const dispatch = useDispatch();
    
    const validationSchema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required'),
        PLU: Yup.string().required('PLU is required'),
        SKU: Yup.string().required('SKU is required'),
        category: Yup.string().required('Category is required'),
        price: Yup.number().typeError('Price must be a number').required('Price is required'),
        stock: Yup.number().typeError('Stock must be a number').required('Stock is required'),
        productDescription: Yup.string().required('Product Description is required'),
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
                headerText="Add Inventory"
                onBackPress={handleBackPress}
                backIcon={BackIcon}
                headerImg={HeaderImg}
            />
            <View style={styles.container}>
                <Formik
                    initialValues={{
                        productName: '',
                        PLU: '',
                        SKU: '',
                        category: '',
                        price: '',
                        stock: '',
                        productDescription: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const formattedValues = {
                                ...values,
                                price: Number(values.price),
                                stock: Number(values.stock)
                            };
                            const response = await dispatch(addProduct(formattedValues)).unwrap();
                            if (response) {
                                toastMsg('Inventory Added', 'success');
                                navigation.goBack();
                            }
                        } catch (error) {
                            toastMsg('Unexpected error occurred', 'error');
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                            {Object.keys(values).map((key) => (
                                <View key={key}>
                                    <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Text>
                                    {key === 'productDescription' ? (
                                        <TextInput
                                            placeholder="Enter product description"
                                            value={values[key]}
                                            onChangeText={handleChange(key)}
                                            onBlur={handleBlur(key)}
                                            style={styles.multilineInput}
                                            multiline
                                        />
                                    ) : key === 'price' || key === 'stock' ? (
                                        <CustomTextInput
                                            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                            value={values[key]}
                                            onChangeText={handleChange(key)}
                                            onBlur={handleBlur(key)}
                                            keyboardType="numeric"
                                        />
                                    ) : (
                                        <CustomTextInput
                                            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                            value={values[key]}
                                            onChangeText={handleChange(key)}
                                            onBlur={handleBlur(key)}
                                        />
                                    )}
                                    {touched[key] && errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
                                </View>
                            ))}
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
        marginLeft: 3,
    },
    button: {
        backgroundColor: '#001f54',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    multilineInput: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        color: '#333',
        height: 130,
        textAlignVertical: 'top',
        marginTop:12
    },
});

export default AddInventory;
