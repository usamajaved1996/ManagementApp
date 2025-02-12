// screens/AddInventory.js

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../slices/inventorySlice'; // Import the action
import CustomTextInput from '../../components/textinput/index'; // Adjust the path as needed
import Header from '../../components/header';
import HeaderImg from '../../assets/images/headerImg.png';
import BackIcon from '../../assets/images/back.png';
import * as customStyles from "../../utils/color";
import { toastMsg } from '../../components/Toast';

const AddInventory = ({ navigation }) => {
    const [form, setForm] = useState({
        productName: '',
        PLU: '',
        SKU: '',
        category: '',
        price: 0,
        stock: 0,
        productDescription: '',
    });

    const dispatch = useDispatch(); // Use dispatch hook

    const handleInputChange = (field, value) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: field === 'price' || field === 'stock' ? parseInt(value) || 0 : value
        }));
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleSubmit = async () => {
        try {
            const response = await dispatch(addProduct(form));
            if (response) {
                toastMsg('Inventory Added', 'success');
                navigation.goBack();
            }

        } catch (error) {
            console.error('Login error', error);
            toastMsg('Unexpected error occurred', 'error');
        } 
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
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <Text style={styles.label}>Product Name</Text>
                    <CustomTextInput
                        placeholder="e.g., cap, belt..."
                        value={form.productName}
                        onChangeText={(value) => handleInputChange('productName', value)}
                    />

                    <Text style={styles.label}>PLU</Text>
                    <CustomTextInput
                        placeholder="e.g., cap, belt..."
                        value={form.PLU}
                        onChangeText={(value) => handleInputChange('PLU', value)}
                    />

                    <Text style={styles.label}>SKU</Text>
                    <CustomTextInput
                        placeholder="e.g., cap, belt..."
                        value={form.SKU}
                        onChangeText={(value) => handleInputChange('SKU', value)}
                    />

                    <Text style={styles.label}>Category</Text>
                    <CustomTextInput
                        placeholder="e.g., cap, belt..."
                        value={form.category}
                        onChangeText={(value) => handleInputChange('category', value)}
                    />

                    <Text style={styles.label}>Price</Text>
                    <CustomTextInput
                        placeholder="e.g., 100, 200..."
                        keyboardType="numeric"
                        value={form.price}
                        onChangeText={(value) => handleInputChange('price', value)}
                    />

                    <Text style={styles.label}>Quantity</Text>
                    <CustomTextInput
                        placeholder="e.g., 1, 2, 3..."
                        keyboardType="numeric"
                        value={form.stock}
                        onChangeText={(value) => handleInputChange('stock', value)}
                    />

                    <Text style={styles.label}>Product Description</Text>
                    <TextInput
                        placeholder="Write something..."
                        placeholderTextColor={'black'}
                        multiline={true}
                        style={styles.multilineInput}
                        value={form.productDescription}
                        onChangeText={(value) => handleInputChange('productDescription', value)}
                    />

                    <View style={{ height: 80 }} /> {/* Spacer to ensure button visibility */}
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add</Text>
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
        backgroundColor: customStyles.Colors.textInputBgColor,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: customStyles.Colors.textInputBorder,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 14,
        color: '#333',
        height: 130,
        textAlignVertical: 'top',
        marginTop: 20,
    },
});

export default AddInventory;
