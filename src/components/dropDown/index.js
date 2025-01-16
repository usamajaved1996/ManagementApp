// components/CustomPicker.js
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet } from "react-native";

const CustomPicker = ({ items, value, onChangeValue, placeholder }) => {
    const [open, setOpen] = useState(false); // State to control dropdown visibility

    return (
        <DropDownPicker
            open={open} // Use the open state to control visibility
            value={value} // Bind the value to the selected item
            items={items} // Pass the items list
            setOpen={setOpen} // Control dropdown open state
            setValue={onChangeValue} // Update the selected value
            setItems={items} // Not required for static items, can be omitted
            placeholder={placeholder} // Show placeholder text
            containerStyle={styles.container}
            dropDownStyle={styles.dropDownStyle} // Style for the open dropdown
            labelStyle={styles.labelStyle}
            style={styles.picker}
            placeholderStyle={styles.placeholderStyle}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        height: 48,
        marginBottom: 20,
    },
    picker: {
        backgroundColor: "#f8f9fc",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
    },
    dropDownStyle: {
        backgroundColor: "#4CAF50",  // Change this to any color you prefer for the open dropdown list
        borderRadius: 6, // Optional, rounded corners for the dropdown
        marginTop: 5, // Optional, gives space between the dropdown and the container
    },
    labelStyle: {
        fontSize: 14,
        color: "#333", // Text color for the selected item in the dropdown
    },
    placeholderStyle: {
        fontSize: 14,
        color: "#999", // Placeholder text color
    },
});

export default CustomPicker;
