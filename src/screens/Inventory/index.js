import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const InventoryScreen = () => {
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

  // Render the header
  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.cell, styles.headerText, styles.idColumn]}>ID</Text>
      <Text style={[styles.cell, styles.headerText, styles.productColumn]}>Product</Text>
      <Text style={[styles.cell, styles.headerText, styles.categoryColumn]}>Category</Text>
      <Text style={[styles.cell, styles.headerText, styles.priceColumn]}>Price</Text>
      <Text style={[styles.cell, styles.headerText, styles.stockColumn]}>Stock</Text>
      <Text style={[styles.cell, styles.headerText, styles.actionColumn]}>Action</Text>
    </View>
  );

  // Render each row
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.idColumn]}>{item.id}</Text>
      <Text style={[styles.cell, styles.productColumn]}>{item.product}</Text>
      <Text style={[styles.cell, styles.categoryColumn]}>{item.category}</Text>
      <Text style={[styles.cell, styles.priceColumn]}>{item.price}</Text>
      <Text style={[styles.cell, styles.stockColumn]}>{item.stock}</Text>
      <TouchableOpacity style={[styles.cell, styles.actionColumn]}>
        <Text style={styles.actionText}>•••</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
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
        <Text style={styles.addButtonText}>+ Add New</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  iconButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
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
    width: 75, // Fixed width for Action column
    textAlign: 'center',
  },
  actionText: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#000080',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollContainer: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
});

export default InventoryScreen;
