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

const PayRoll = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handleDelete = () => {
    console.log('Delete', selectedItem);
    closeMenu();
  };

  const handleUpdate = () => {
    console.log('Update', selectedItem);
    closeMenu();
  };

  // Render the header
  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.cell, styles.headerText, styles.actionColumn]}>Action</Text>
      <Text style={[styles.cell, styles.headerText, styles.nameColumn]}>Name</Text>
      <Text style={[styles.cell, styles.headerText, styles.contactColumn]}>Contact</Text>
      <Text style={[styles.cell, styles.headerText, styles.emailColumn]}>Email</Text>
      <Text style={[styles.cell, styles.headerText, styles.genderColumn]}>Gender</Text>
      <Text style={[styles.cell, styles.headerText, styles.typeColumn]}>Employee Type</Text>
      <Text style={[styles.cell, styles.headerText, styles.departmentColumn]}>Department</Text>

    </View>
  );

  // Render each row
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity style={[styles.menuButton, styles.cell, styles.actionColumn]} onPress={() => handleMenuPress(item)}>
      <Text style={styles.menuText}>•••</Text>
      </TouchableOpacity>
      <Text style={[styles.cell, styles.nameColumn]}>{item.name}</Text>
      <Text style={[styles.cell, styles.contactColumn]}>{item.contact}</Text>
      <Text style={[styles.cell, styles.emailColumn]}>{item.email}</Text>
      <Text style={[styles.cell, styles.genderColumn]}>{item.gender}</Text>
      <Text style={[styles.cell, styles.typeColumn]}>{item.type}</Text>
      <Text style={[styles.cell, styles.departmentColumn]}>{item.department}</Text>

    </View>
  );

  return (
    <View style={styles.container}>
       <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
        />
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Wrap the entire content in a horizontal ScrollView */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Wrap the FlatList and header to make the entire screen scroll horizontally */}
        <View style={styles.scrollContainer}>
          {renderHeader()}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 80 }} // Adds padding at the bottom
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      {/* Modal for menu */}
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
    padding: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    position: 'relative', // To position the icon inside the input field
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 40, // Added space for the icon inside the input
    height: 48,
    color: '#4A5670'
  },
  iconButton: {
    position: 'absolute',
    left: 10, // Position the icon inside the input at the start
    top: '45%',
    transform: [{ translateY: -10 }], // Center the icon vertically
  },
  iconText: {
    fontSize: 18,
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    paddingHorizontal: 8,
    fontSize: 16,
    textAlign: 'center', // Ensures proper alignment
  },
  headerText: {
    fontWeight: 'bold',
    color: '#000',
  },
  menuButton: {
    width: 50, // Adjust to fit the icon
    alignItems: 'center',
    justifyContent:'center'
  },
  menuText: {
    fontSize: 10,
    color: '#555',
    fontWeight:'900',
    textAlign: 'center', // Align names to the left

  },
  actionColumn: {
    width: 70,
    textAlign: 'center', // Align names to the left
  },
  nameColumn: {
    width: 120,
    textAlign: 'center', // Align names to the left
  },
  contactColumn: {
    width: 120,
    textAlign: 'center', // Center-align contact
  },
  emailColumn: {
    width: 200,
    textAlign: 'center', // Align email to the left
  },
  genderColumn: {
    width: 75,
    textAlign: 'center', // Center-align gender
  },
  typeColumn: {
    width: 140,
    textAlign: 'center', // Center-align employee type
  },
  departmentColumn: {
    width: 140,
    textAlign: 'center', // Center-align department
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
  scrollContainer: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4
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
});


export default PayRoll;
