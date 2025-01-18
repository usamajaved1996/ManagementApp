import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
} from 'react-native';
import * as customStyles from "../../utils/color";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import EmployeeDetailModal from '../../components/Modals/employeeDetailModal';

const Employee = ({navigation}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const data = [
        { name: 'Sean Palock', contact: '2445665656', email: 'Seanpol@gmail.com', gender: 'male', type: 'Part Time', department: 'IT' },
        { name: 'Emily Carter', contact: '9876543210', email: 'emily.carter@example.com', gender: 'female', type: 'Full Time', department: 'HR' },
        { name: 'John Doe', contact: '1234567890', email: 'john.doe@example.com', gender: 'male', type: 'Part Time', department: 'Finance' },
        { name: 'Sophia Turner', contact: '5432167890', email: 'sophia.turner@example.com', gender: 'female', type: 'Full Time', department: 'Marketing' },
        { name: 'Michael Brown', contact: '1122334455', email: 'michael.brown@example.com', gender: 'male', type: 'Part Time', department: 'IT' },
        { name: 'Olivia Wilson', contact: '9988776655', email: 'olivia.wilson@example.com', gender: 'female', type: 'Full Time', department: 'Operations' },
        { name: 'James Smith', contact: '6655443322', email: 'james.smith@example.com', gender: 'male', type: 'Part Time', department: 'Legal' },
        { name: 'Ava Johnson', contact: '7788990011', email: 'ava.johnson@example.com', gender: 'female', type: 'Full Time', department: 'Design' },
        { name: 'Liam Davis', contact: '5566778899', email: 'liam.davis@example.com', gender: 'male', type: 'Part Time', department: 'Development' },
        { name: 'Charlotte Garcia', contact: '3344556677', email: 'charlotte.garcia@example.com', gender: 'female', type: 'Full Time', department: 'Customer Support' },
    ];
    const handleMenuPress = (item) => {
        setSelectedItem(item);
        setMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
        setSelectedItem(null);
    };
    const openModal = () => setModalVisible(true);

    const closeModal = () => setModalVisible(false);
    const handleDelete = () => {
        console.log('Delete', selectedItem);
        closeMenu();
    };

    const handleUpdate = () => {
        console.log('Update', selectedItem);
        closeMenu();
    };
    const renderRow = ({ item }) => (
        <TouchableOpacity style={styles.tableRow} onPress={openModal}>
            <TouchableOpacity style={[styles.menuButton, styles.cell, styles.actionColumn]} onPress={() => handleMenuPress(item)}>
                <Text style={styles.menuText}>•••</Text>
            </TouchableOpacity>
            <Text style={[styles.tableData, { width: 150 }]}>{item.name}</Text>
            <Text style={[styles.tableData, { width: 140 }]}>{item.contact}</Text>
            <Text style={[styles.tableData, { width: 160 }]}>{item.email}</Text>
            <Text style={[styles.tableData, { width: 80 }]}>{item.gender}</Text>
            <Text style={[styles.tableData, { width: 120 }]}>{item.type}</Text>
            <Text style={[styles.tableData, { width: 120 }]}>{item.department}</Text>

        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor="#888"
                />
            </View>
            <ScrollView
                horizontal={true}
                style={styles.tableContainer}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableHeaderRow}>
                        <Text style={[styles.tableHeader, { width: 65 }]}>Action</Text>
                        <Text style={[styles.tableHeader, { width: 150 }]}>Name</Text>
                        <Text style={[styles.tableHeader, { width: 140 }]}>Contact</Text>
                        <Text style={[styles.tableHeader, { width: 160 }]}>Email</Text>
                        <Text style={[styles.tableHeader, { width: 80 }]}>Gender</Text>
                        <Text style={[styles.tableHeader, { width: 120 }]}>Employee</Text>
                        <Text style={[styles.tableHeader, { width: 120 }]}>Department</Text>
                    </View>


                    {/* Table Content */}
                    <FlatList
                        data={data}
                        renderItem={renderRow}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={() => {
                navigation.navigate('AddEmployee'); // Correctly navigate to the 'Login' screen
            }}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            {/* Modal for menu */}
            <EmployeeDetailModal visible={isModalVisible} onClose={closeModal} />

            {menuVisible && (
                <Modal transparent animationType="fade" visible={menuVisible}>
                    <TouchableOpacity style={styles.modalOverlay} onPress={closeMenu}>
                        <View style={styles.menu}>
                            <TouchableOpacity onPress={handleUpdate} style={styles.menuOptionContainer}>
                                <Text style={styles.menuOption}>Update</Text>
                            </TouchableOpacity>
                            <View style={styles.divider} />
                            <TouchableOpacity onPress={handleDelete} style={styles.menuOptionContainer}>
                                <Text style={styles.menuOption}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customStyles.backgroundColors.bGColor,
        padding: 16,
    },
    cell: {
        paddingHorizontal: 8,
        fontSize: 16,
        textAlign: 'center', // Ensures proper alignment
    },
    menuButton: {
        width: 50, // Adjust to fit the icon
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuText: {
        fontSize: 10,
        color: '#555',
        fontWeight: '900',
        textAlign: 'center', // Align names to the left
    },
    actionColumn: {
        width: 70,
        textAlign: 'center', // Align names to the left
    },
    addButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: customStyles.Colors.darkGreen,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden', // Ensures rounded corners
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    menuOptionContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    menuOption: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 16,
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#8D8D8DBD",
    },
    searchIcon: {
        marginRight: 8,
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
        color: "#000000",
    },
    tableContainer: {
        flex: 1,
        marginBottom: 16,
    },
    table: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        overflow: "hidden",
    },
    tableHeaderRow: {
        flexDirection: "row",
        backgroundColor: "#EDEDFE",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    tableHeader: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#000000",
        textAlign: "center", // Center-align ext
        paddingVertical: 8, // Add vertical padding
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center", // Align content vertically
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    tableData: {
        fontSize: 16,
        color: "#000000",
        textAlign: "center", // Match alignment with header
        paddingVertical: 8, // Add vertical padding
    },
});


export default Employee;
