import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Reports = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Reports</Text>
      <Text>Here, you can view detailed reports on stock, sales, and more.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:40
  },
});

export default Reports;
