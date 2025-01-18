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
import AddInventoryModal from '../../components/Modals/addInventoryModal';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OverviewModal from '../../components/Modals/overViewModal';

const InventoryScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample data with different products and categories
  const data = [
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
      <Text style={[styles.cell, styles.headerText, styles.idColumn]}>ID</Text>
      <Text style={[styles.cell, styles.headerText, styles.productColumn]}>Product</Text>
      <Text style={[styles.cell, styles.headerText, styles.categoryColumn]}>Category</Text>
      <Text style={[styles.cell, styles.headerText, styles.priceColumn]}>Price</Text>
      <Text style={[styles.cell, styles.headerText, styles.stockColumn]}>Stock</Text>
    </View>
  );

  // Render each row
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity style={[styles.cell, styles.actionColumn]} onPress={() => handleMenuPress(item)}>
        <Text style={styles.actionText}>•••</Text>
      </TouchableOpacity>
      <Text style={[styles.cell, styles.idColumn]}>{item.id}</Text>
      <Text style={[styles.cell, styles.productColumn]}>{item.product}</Text>
      <Text style={[styles.cell, styles.categoryColumn]}>{item.category}</Text>
      <Text style={[styles.cell, styles.priceColumn]}>{item.price}</Text>
      <Text style={[styles.cell, styles.stockColumn]}>{item.stock}</Text>
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
  },
  headerText: {
    fontWeight: 'bold',
    color: '#000',
  },
  idColumn: {
    width: 50, // Fixed width for ID column
    textAlign: 'center',
  },
  productColumn: {
    width: 180, // Reduced width for Product column
    textAlign: 'left',
    flexWrap: 'wrap',  // Allow wrapping for long product names
  },
  categoryColumn: {
    width: 120, // Fixed width for Category column
    textAlign: 'left',
  },
  priceColumn: {
    width: 80, // Fixed width for Price column
    textAlign: 'center',
  },
  stockColumn: {
    width: 90, // Fixed width for Stock column
    textAlign: 'center',
  },
  actionColumn: {
    width: 65, // Fixed width for Action column
    textAlign: 'center',
    justifyContent: 'center'
  },
  actionText: {
    fontSize: 10,
    color: '#555',
    fontWeight: '900',
    textAlign: 'center',
  },
  fabView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 12,
    overflow: 'hidden', // Ensures buttons appear joined
  },
  fabButton: {
    backgroundColor: customStyles.Colors.darkGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstFabButton: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  secondFabButton: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  fabText: {
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

export default InventoryScreen;
