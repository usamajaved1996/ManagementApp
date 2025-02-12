import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, updateProduct } from '../../slices/inventorySlice'; // Import necessary actions
import CustomTextInput from '../../components/textinput/index';
import Header from '../../components/header';
import { toastMsg } from '../../components/Toast';
import HeaderImg from '../../assets/images/headerImg.png';
import BackIcon from '../../assets/images/back.png';

const EditInventory = ({ navigation, route }) => {
    const { productId } = route.params; // Getting productId from params
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        productName: '',
        PLU: '',
        SKU: '',
        category: '',
        price: 0,
        stock: 0,
        productDescription: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await dispatch(getProductById(productId));
            if (response?.payload) {
                const data = response.payload;
                setForm({
                    productName: data.productName || '',
                    PLU: data.PLU || '',
                    SKU: data.SKU || '',
                    category: data.category || '',
                    price: data.price || 0,
                    stock: data.stock || 0,
                    productDescription: data.productDescription || '',
                });
            }
        };
        fetchProduct();
    }, [dispatch, productId]);

    const handleInputChange = (field, value) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: field === 'price' || field === 'stock' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async () => {
        try {
            const updatedData = { ...form, id: productId };
            const response = await dispatch(updateProduct(updatedData));
            if (response?.payload) {
                toastMsg('Product Updated Successfully', 'success');
                navigation.goBack();
            }
        } catch (error) {
            console.error('Update error', error);
            toastMsg('Unexpected error occurred', 'error');
        }
    };
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Header
                headerText="Edit Inventory"
                onBackPress={handleBackPress}
                backIcon={BackIcon}
                headerImg={HeaderImg}
            />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <Text style={styles.label}>Product Name</Text>
                    <CustomTextInput value={form.productName} onChangeText={(value) => handleInputChange('productName', value)} />

                    <Text style={styles.label}>PLU</Text>
                    <CustomTextInput value={form.PLU} onChangeText={(value) => handleInputChange('PLU', value)} />

                    <Text style={styles.label}>SKU</Text>
                    <CustomTextInput value={form.SKU} onChangeText={(value) => handleInputChange('SKU', value)} />

                    <Text style={styles.label}>Category</Text>
                    <CustomTextInput value={form.category} onChangeText={(value) => handleInputChange('category', value)} />

                    <Text style={styles.label}>Price</Text>
                    <CustomTextInput keyboardType="numeric" value={String(form.price)} onChangeText={(value) => handleInputChange('price', value)} />

                    <Text style={styles.label}>Quantity</Text>
                    <CustomTextInput keyboardType="numeric" value={String(form.stock)} onChangeText={(value) => handleInputChange('stock', value)} />

                    <Text style={styles.label}>Product Description</Text>
                    <TextInput
                        multiline
                        style={styles.multilineInput}
                        value={form.productDescription}
                        onChangeText={(value) => handleInputChange('productDescription', value)}
                    />
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
    },
    multilineInput: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 14,
        color: '#333',
        height: 130,
        textAlignVertical: 'top',
        marginTop: 20,
    },
});

export default EditInventory;
