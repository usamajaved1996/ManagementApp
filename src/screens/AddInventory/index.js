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
import CustomTextInput from '../../components/textinput/index'; // Adjust the path as needed
import Header from '../../components/header';
import HeaderImg from '../../assets/images/headerImg.png';
import BackIcon from '../../assets/images/back.png';
import * as customStyles from "../../utils/color";

const AddInventory = ({navigation}) => {
    const [form, setForm] = useState({
        productName: '',
        plu: '',
        sku: '',
        category: '',
        price: '',
        quantity: '',
        productDescription: '',
    });

    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };
    const handleBackPress = () => {
        navigation.goBack();
    };
    const handleSubmit = () => {
        console.log('Form Submitted:', form);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Header
                headerText="Inventory"
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
                        value={form.plu}
                        onChangeText={(value) => handleInputChange('plu', value)}
                    />

                    <Text style={styles.label}>SKU</Text>
                    <CustomTextInput
                        placeholder="e.g., cap, belt..."
                        value={form.sku}
                        onChangeText={(value) => handleInputChange('sku', value)}
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
                        value={form.quantity}
                        onChangeText={(value) => handleInputChange('quantity', value)}
                    />

                    <Text style={styles.label}>Product Description</Text>
                    <TextInput
                        placeholder="Write something..."
                        placeholderTextColor={'black'}
                        multiline={true}
                        style={styles.multilineInput} // Adjust height for multiline input
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
        paddingBottom: 20, // Extra padding at the bottom for smooth scrolling
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
        height: 130, // Height for multiline input
        textAlignVertical: 'top', // Ensures text starts at the top
        marginTop:20
    },
});

export default AddInventory;
