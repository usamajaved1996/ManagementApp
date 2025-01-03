import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

const sampleInventory = [
  { id: '1', name: 'Product A', quantity: 100, price: '$10' },
  { id: '2', name: 'Product B', quantity: 50, price: '$15' },
  { id: '3', name: 'Product C', quantity: 20, price: '$25' },
];

const Dashboard = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemSubText}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemSubText}>Price: {item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Dashboard</Text>
      <FlatList
        data={sampleInventory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 15,
    backgroundColor: '#f4f4f4',
    marginVertical: 8,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubText: {
    fontSize: 14,
    color: '#555',
  },
});

export default Dashboard;
