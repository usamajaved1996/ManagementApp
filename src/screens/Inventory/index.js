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
} from 'react-native';
import * as customStyles from "../../utils/color";
import AddInventoryModal from '../../components/Modals/addInventoryModal';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../slices/inventorySlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OverviewModal from '../../components/Modals/overViewModal';

const InventoryScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.inventory);

  const dummyData = [
    { id: '01', product: 'Coca Cola 1 Litre', category: 'Drinks', price: '$10', stock: '11pcs' },
    { id: '02', product: 'Pepsi 500ml', category: 'Drinks', price: '$5', stock: '20pcs' },
    { id: '03', product: 'Apple iPhone 13', category: 'Electronics', price: '$999', stock: '5pcs' },
    { id: '04', product: 'Samsung Galaxy S21', category: 'Electronics', price: '$850', stock: '8pcs' },
    { id: '05', product: 'Nike Running Shoes', category: 'Footwear', price: '$120', stock: '15pcs' },
    { id: '06', product: 'Adidas Sneakers', category: 'Footwear', price: '$110', stock: '10pcs' },
    { id: '07', product: 'LG 55-inch TV', category: 'Electronics', price: '$600', stock: '7pcs' },
    { id: '08', product: 'Sony Noise Cancelling Headphones', category: 'Electronics', price: '$250', stock: '12pcs' },
    { id: '09', product: 'Bose Bluetooth Speaker', category: 'Electronics', price: '$150', stock: '18pcs' },
    { id: '10', product: 'Apple MacBook Pro', category: 'Electronics', price: '$2000', stock: '3pcs' },
    { id: '11', product: 'Dell Inspiron Laptop', category: 'Electronics', price: '$700', stock: '10pcs' },
    { id: '12', product: 'Puma Sports T-shirt', category: 'Clothing', price: '$30', stock: '25pcs' },
    { id: '13', product: 'Levi\'s Jeans', category: 'Clothing', price: '$60', stock: '18pcs' },
    { id: '14', product: 'Samsung Galaxy Watch', category: 'Electronics', price: '$250', stock: '5pcs' },
    { id: '15', product: 'Sony PlayStation 5', category: 'Electronics', price: '$499', stock: '10pcs' },
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const [isOverViewModal, setOverViewModal] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openOverViewModal = () => setOverViewModal(true);
  const closeOverViewModal = () => setOverViewModal(false);

  useEffect(() => {
    dispatch(getProducts()); // Fetch data when screen loads
  }, [dispatch]);

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
    <View style={styles.table}>
      <View style={styles.tableHeaderRow}>
        <Text style={[styles.tableHeader, { width: 65 }]}>Action</Text>
        <Text style={[styles.tableHeader, { width: 150 }]}>ID</Text>
        <Text style={[styles.tableHeader, { width: 140 }]}>Product</Text>
        <Text style={[styles.tableHeader, { width: 160 }]}>Category</Text>
        <Text style={[styles.tableHeader, { width: 80 }]}>Price</Text>
        <Text style={[styles.tableHeader, { width: 120 }]}>Stock</Text>
      </View>
    </View>
  );

  // Render each row
  const renderItem = ({ item }) => (

    <TouchableOpacity style={styles.tableRow} onPress={openModal}>
      <TouchableOpacity style={[styles.menuButton, styles.cell, styles.actionColumn]} onPress={() => handleMenuPress(item)}>
        <Text style={styles.menuText}>•••</Text>
      </TouchableOpacity>
      <Text style={[styles.tableData, { width: 150 }]}>{item.id}</Text>
      <Text style={[styles.tableData, { width: 140 }]}>{item.product}</Text>
      <Text style={[styles.tableData, { width: 160 }]}>{item.category}</Text>
      <Text style={[styles.tableData, { width: 80 }]}>{item.price}</Text>
      <Text style={[styles.tableData, { width: 120 }]}>{item.stock}</Text>

    </TouchableOpacity>
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
            data={dummyData}  // Use dummyData if loading or no items
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 80 }} // Adds padding at the bottom
          />
        </View>
      </ScrollView>

      <View style={styles.fabView}>
        <TouchableOpacity style={[styles.fabButton, styles.firstFabButton]} onPress={openOverViewModal} activeOpacity={0.9}>
          <Icon name="visibility" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fabButton, styles.secondFabButton]} onPress={openModal} activeOpacity={0.9}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>

      <AddInventoryModal visible={isModalVisible} onClose={closeModal} />
      <OverviewModal visible={isOverViewModal} onClose={closeOverViewModal} />

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
    backgroundColor: '#f4f4f4', // Background color for better contrast
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Title color for better visibility
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd', // Light border for input
    borderRadius: 8,
    paddingHorizontal: 40,
    height: 48,
    backgroundColor: '#fff', // White background for the search input
    color: '#4A5670'
  },
  iconButton: {
    position: 'absolute',
    left: 10,
    top: '45%',
    transform: [{ translateY: -10 }],
  },
  iconText: {
    fontSize: 14,
    paddingTop: 4,
    color: '#555' // Icon color to match the theme
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
  fabView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  fabButton: {
    backgroundColor: customStyles.Colors.darkGreen,
    borderRadius: 0,
    padding: 14,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
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


export default InventoryScreen;
