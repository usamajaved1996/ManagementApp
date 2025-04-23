import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import * as customStyles from "../../utils/color";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import EmployeeDetailModal from '../../components/Modals/employeeDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, deleteEmployee } from '../../slices/payRollSlice';
import { useIsFocused } from '@react-navigation/native';
import { toastMsg } from '../../components/Toast';

const Employee = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { items = [], loading } = useSelector((state) => state.payroll) || { items: [], loading: false };

    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = Array.isArray(items.data)
    ? items.data.filter(item =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

    useEffect(() => {
        if (isFocused) {
            dispatch(getEmployee()); // Fetch data when screen is focused
        }
    }, [isFocused]);

    const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(getEmployee());
        setRefreshing(false);
    };

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

    const handleDelete = async () => {
        if (!selectedItem) return;
        try {
            await dispatch(deleteEmployee(selectedItem.id)).unwrap();
            onRefresh();
            toastMsg('Employee Data Deleted', 'success');
        } catch (error) {
            console.error("Delete failed:", error);
        }
        closeMenu();
    };
    
    const handleUpdate = () => {
        console.log('Update', selectedItem);
        navigation.navigate('EditEmployee', { employeeId: selectedItem.id });
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
            {loading && <ActivityIndicator size="large" color={customStyles.Colors.darkGreen} style={styles.loader} />}

            <View style={styles.searchBarContainer}>
                <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
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
                        data={filteredItems}
                        renderItem={renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

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
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
});


export default Employee;
