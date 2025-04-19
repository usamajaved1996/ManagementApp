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
  ActivityIndicator,
  Alert,
  Platform,
  PermissionsAndroid
} from 'react-native';
import * as customStyles from "../../utils/color";
import AddInventoryModal from '../../components/Modals/addInventoryModal';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct, uploadInventoryFile } from '../../slices/inventorySlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OverviewModal from '../../components/Modals/overViewModal';
import { useIsFocused } from '@react-navigation/native';
import { toastMsg } from '../../components/Toast';
import DocumentPicker from 'react-native-document-picker';

const DocumentPickerModal = ({ visible, onClose, onFileSelect }) => {
  const handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.plainText,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
        ],
        allowMultiSelection: false,
      });
      if (res && res.length > 0) {
        onFileSelect(res[0]);
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Document picker error:', err);
        toastMsg('Failed to pick document', 'error');
      }
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.documentPickerModal}>
        <View style={styles.documentPickerContent}>
          <Text style={styles.documentPickerTitle}>Select File</Text>
          
          <TouchableOpacity 
            style={styles.documentOption}
            onPress={handleDocumentPick}
          >
            <Icon name="insert-drive-file" size={24} color="#333" />
            <Text style={styles.documentOptionText}>Choose File</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.closeDocumentPicker}
            onPress={onClose}
          >
            <Text style={styles.closeDocumentPickerText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const InventoryScreen = ({ navigation, route }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { items = [], loading } = useSelector((state) => state.inventory) || { items: [], loading: false };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = Array.isArray(items.data)
    ? items.data.filter(item =>
      item.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];


  const [isModalVisible, setModalVisible] = useState(false);
  const [isOverViewModal, setOverViewModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showDocumentPicker, setShowDocumentPicker] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openOverViewModal = () => setOverViewModal(true);
  const closeOverViewModal = () => setOverViewModal(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(getProducts());
    }
  }, [isFocused]);  // Removed dispatch from dependencies

  // Check if we should show the upload modal
  useEffect(() => {
    if (route.params?.showUploadModal) {
      setShowOptionsModal(true);
      // Clear the parameter so it doesn't show again
      navigation.setParams({ showUploadModal: undefined });
    }
  }, [route.params?.showUploadModal]);

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
      console.log('Update data', selectedItem.id);
      await dispatch(deleteProduct(selectedItem.id)).unwrap();
      onRefresh();
      toastMsg('Inventory Deleted', 'success');
    } catch (error) {
      console.error("Delete failed:", error);
      toastMsg(error?.message || 'Unexpected error occurred', 'error');
    }
    closeMenu();
  };

  const handleUpdate = () => {
    console.log('Update data', selectedItem.id);
    navigation.navigate('EditInventory', { productId: selectedItem.id });
    closeMenu();
  };

  const closeOptionsModal = () => {
    setShowOptionsModal(false);
  };

  const handleFileSelect = async (file) => {
    try {
      console.log('Selected file:', file);
      
      const fileExtension = file.name?.split('.').pop().toLowerCase();
      console.log('File extension:', fileExtension);
      
      if (!['xls', 'xlsx'].includes(fileExtension)) {
        console.log('Invalid file type:', fileExtension);
        toastMsg('Please select only Excel files (.xls or .xlsx)', 'error');
        return;
      }

      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        name: file.name,
      });

      console.log('Prepared formData:', formData);
      await dispatch(uploadInventoryFile(formData)).unwrap();
      console.log('File upload successful');
      toastMsg('File uploaded successfully', 'success');
      dispatch(getProducts());
    } catch (err) {
      console.error('Upload error:', err);
      toastMsg(err.message || 'Failed to upload file', 'error');
    } finally {
      setIsUploading(false);
      setShowDocumentPicker(false);
      closeOptionsModal();
    }
  };
  // Render the header
  const renderHeader = () => (
    <View style={styles.table}>
      <View style={styles.tableHeaderRow}>
        <Text style={[styles.tableHeader, { width: 60 }]}>Action</Text>
        <Text style={[styles.tableHeader, { width: 120 }]}>ID</Text>
        <Text style={[styles.tableHeader, { width: 140 }]}>Product</Text>
        <Text style={[styles.tableHeader, { width: 160 }]}>Category</Text>
        <Text style={[styles.tableHeader, { width: 80 }]}>Price</Text>
        <Text style={[styles.tableHeader, { width: 120 }]}>Stock</Text>
      </View>
    </View>
  );

  // Render each row
  const renderItem = ({ item }) => {
    return (
      <View style={styles.tableRow}>
        <TouchableOpacity style={[styles.menuButton, styles.cell, styles.actionColumn]} onPress={() => handleMenuPress(item)}>
          <Text style={styles.menuText}>•••</Text>
        </TouchableOpacity>
        <Text style={[styles.tableData, { width: 140 }]}>{item.id}</Text>
        <Text style={[styles.tableData, { width: 120 }]}>{item.name}</Text>
        <Text style={[styles.tableData, { width: 160 }]}>{item.category}</Text>
        <Text style={[styles.tableData, { width: 95 }]}>{item.price}</Text>
        <Text style={[styles.tableData, { width: 120 }]}>{item.stock}</Text>
      </View>
    );
  };


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
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 80 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />

        </View>
      </ScrollView>
      <View style={styles.fabView}>
        <View style={styles.fabButton} activeOpacity={0.9}>
          <TouchableOpacity onPress={openOverViewModal} style={styles.iconWrapper}>
            <Icon name="visibility" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowOptionsModal(true)} style={styles.iconWrapper}>
            <Icon name="file-upload" size={24} color="#fff" />
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

      {/* Options Modal */}
      <Modal
        visible={showOptionsModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.optionsModal}>
            <Text style={styles.modalTitle}>Inventory Options</Text>
            <TouchableOpacity
              style={[styles.modalButton, styles.removeButton]}
              onPress={() => setShowDocumentPicker(true)}
              disabled={isUploading}
            >
              {isUploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.modalButtonText}>Upload Inventory File</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeOptionsModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <DocumentPickerModal
        visible={showDocumentPicker}
        onClose={() => setShowDocumentPicker(false)}
        onFileSelect={handleFileSelect}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: customStyles.Colors.darkGreen,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
  },
  iconWrapper: {
    paddingHorizontal: 13,
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
  optionsModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalButton: {
    backgroundColor: customStyles.Colors.darkGreen,
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#FF4444',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  closeButtonText: {
    color: '#666',
    fontSize: 14,
  },
  documentPickerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  documentPickerContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  documentPickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  documentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  documentOptionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  closeDocumentPicker: {
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
  },
  closeDocumentPickerText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});


export default InventoryScreen;
