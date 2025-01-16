import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";
import HeaderImg from '../../assets/images/headerImg.png';
import BackIcon from '../../assets/images/back.png';
import Header from "../../components/header/index";
import * as customStyles from "../../utils/color";
import CustomPicker from "../../components/dropDown/index"; // Import CustomPicker
import Button from "../../components/button";

const ProfileScreen = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();
    };

    // Declare state variables for the input fields
    const [firstName, setFirstName] = useState("Kevin");  // Initial value set to "Kevin"
    const [lastName, setLastName] = useState("Ryan");  // Initial value set to "Ryan"
    const [language, setLanguage] = useState(null);  // Start with null value
    const [format, setFormat] = useState(null);

    const languageItems = [
        { label: "English", value: "english" },
        { label: "Spanish", value: "spanish" },
    ];

    const formatItems = [
        { label: "United States", value: "united-states" },
        { label: "United Kingdom", value: "united-kingdom" },
    ];

    return (
        <View style={styles.container}>
            <Header
                headerText="Profile"
                onBackPress={handleBackPress}
                backIcon={BackIcon}
                headerImg={HeaderImg}
            />
            <View style={styles.mainContent}>
                <Text style={styles.header}>Profile</Text>
                <Text style={styles.subHeader}>
                    Your personal information and account security settings.
                </Text>

                <View style={styles.profileImageContainer}>
                    <View style={styles.profileImage}>
                        <Text style={styles.profileInitials}>KR</Text>
                    </View>
                    <View>
                        <Text style={styles.profileLabel}>Profile Image</Text>
                        <TouchableOpacity>
                            <Text style={styles.updateLink}>Update Profile Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.label}>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={firstName} // Bind the value to the state variable
                    onChangeText={(text) => setFirstName(text)} // Update the state on text change
                />

                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={lastName} // Bind the value to the state variable
                    onChangeText={(text) => setLastName(text)} // Update the state on text change
                />

                <Text style={styles.label}>Language</Text>
                <CustomPicker
                    items={languageItems}
                    value={language}
                    onChangeValue={setLanguage}
                    placeholder="Select Language"
                />

                <Text style={styles.label}>Date, time and number format</Text>
                <Text style={styles.description}>
                    Format: December 23, 2024, 12/23/2024, 1:29 PM EST, and 1,234.56
                </Text>

                <CustomPicker
                    items={formatItems}
                    value={format}
                    onChangeValue={setFormat}
                    placeholder="Select Format"
                />
                {/* <Button
                    textColor="#fff"
                    text={'Save'}
                /> */}
            </View>
            <View style={{ width: '95%', alignSelf: 'center', marginTop: 30 }}>
                <Button
                    textColor="#fff"
                    text={'Save'}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customStyles.backgroundColors.bGColor,
    },
    header: {
        fontSize: 21,
        fontWeight: "600",
        marginBottom: 8,
        color: "#333",
    },
    subHeader: {
        fontSize: 16,
        color: "#4C4C4C",
        marginBottom: 20,
        fontWeight: "400",
    },
    mainContent: { paddingTop: 32, paddingLeft: 17, paddingRight: 17 },
    profileImageContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderStyle: "dashed",
        borderRadius: 8,
        backgroundColor: "#ffffff",
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: customStyles.Colors.blueTheme,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    profileInitials: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    profileLabel: {
        fontSize: 16,
        color: "#333",
        fontWeight: "500",
    },
    updateLink: {
        fontSize: 14,
        color: customStyles.Colors.green,
        marginTop: 5,
        fontWeight: "500",
    },
    label: {
        fontSize: 14,
        color: "#00000",
        marginBottom: 5,
        fontWeight: "600",
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#f8f9fc",
        fontSize: 14,
    },
    description: {
        fontSize: 14,
        color: "#4C4C4C",
        marginBottom: 10,
        fontWeight: "500",
    },
});

export default ProfileScreen;
