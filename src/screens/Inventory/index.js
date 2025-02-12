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
import AddInventoryModal from '../../components/Modals/addInventoryModal';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../../slices/inventorySlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OverviewModal from '../../components/Modals/overViewModal';
import { useIsFocused } from '@react-navigation/native';
import { toastMsg } from '../../components/Toast';

const InventoryScreen = ({navigation}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { items = [], loading } = useSelector((state) => state.inventory);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredItems = items.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOverViewModal, setOverViewModal] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openOverViewModal = () => setOverViewModal(true);
  const closeOverViewModal = () => setOverViewModal(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(getProducts()); // Fetch data when screen is focused
    }
  }, [dispatch, isFocused]);

 
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getProducts());
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

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      await dispatch(deleteProduct(selectedItem.id)).unwrap();
      onRefresh();
      toastMsg('Inventory Deleted', 'success');
    } catch (error) {
      console.error("Delete failed:", error);
    }
    closeMenu();
  };

  const handleUpdate = () => {
    console.log('Update', selectedItem);
    navigation.navigate('EditInventory', { productId: selectedItem.id });
    closeMenu();
};

  // Render the header
  const renderHeader = () => (
    <View style={styles.table}>
      <View style={styles.tableHeaderRow}>
        <Text style={[styles.tableHeader, { width: 60 }]}>Action</Text>
        <Text style={[styles.tableHeader, { width: 140 }]}>ID</Text>
        <Text style={[styles.tableHeader, { width: 140 }]}>Product</Text>
        <Text style={[styles.tableHeader, { width: 160 }]}>Category</Text>
        <Text style={[styles.tableHeader, { width: 80 }]}>Price</Text>
        <Text style={[styles.tableHeader, { width: 120 }]}>Stock</Text>
      </View>
    </View>
  );

  // Render each row
  const renderItem = ({ item }) => (

    <View style={styles.tableRow} >
      <TouchableOpacity style={[styles.menuButton, styles.cell, styles.actionColumn]} onPress={() => handleMenuPress(item)}>
        <Text style={styles.menuText}>•••</Text>
      </TouchableOpacity>
      <Text style={[styles.tableData, { width: 150 }]}>{item.id}</Text>
      <Text style={[styles.tableData, { width: 140 }]}>{item.productName}</Text>
      <Text style={[styles.tableData, { width: 160 }]}>{item.category}</Text>
      <Text style={[styles.tableData, { width: 80 }]}>{item.price}</Text>
      <Text style={[styles.tableData, { width: 120 }]}>{item.stock}</Text>

    </View>
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color={customStyles.Colors.darkGreen} style={styles.loader} />}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Product or Category"
          placeholderTextColor={'black'}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
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
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 80 }} // Adds padding at the bottom
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

          />
        </View>
      </ScrollView>
      <View style={styles.fabView}>
        <View style={styles.fabButton} activeOpacity={0.9}>
          <TouchableOpacity onPress={openOverViewModal} style={styles.iconWrapper}>
            <Icon name="visibility" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal} style={styles.iconWrapper}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </View>
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
    top: '39%',
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
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  fabButton: {
    flexDirection: 'row', // Arrange icons horizontally
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: customStyles.Colors.darkGreen,
    borderRadius: 12, // Fully rounded
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
  },
  iconWrapper: {
    paddingHorizontal: 13, // Space between icons
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
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
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});


export default InventoryScreen;
