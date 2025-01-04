import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>

      <View style={styles.profitCard}>
        <Text style={styles.profitTitle}>Profit amount</Text>
        <Text style={styles.profitValue}>$ 15,237,000</Text>
        <Text style={styles.profitChange}>+15% From the previous week</Text>
      </View>

      <View style={styles.statCardsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>25</Text>
          <Text style={styles.statLabel}>Total Products</Text>
          <Text style={styles.statUpdate}>Update: 20 July 2024</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Product Category</Text>
          <Text style={styles.statUpdate}>Update: 20 July 2024</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>11,967</Text>
          <Text style={styles.statLabel}>Total Sold</Text>
          <Text style={styles.statUpdate}>Update: 20 July 2024</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2.5jt</Text>
          <Text style={styles.statLabel}>Monthly Income</Text>
          <Text style={styles.statUpdate}>Update: 20 July 2024</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  welcomeContainer: {
    flex: 1,
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#888888',
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  profitCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FF7F50',
    borderRadius: 12,
  },
  profitTitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  profitValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 8,
  },
  profitChange: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  statCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  statLabel: {
    fontSize: 14,
    color: '#888888',
    marginVertical: 4,
  },
  statUpdate: {
    fontSize: 12,
    color: '#CCCCCC',
  },
});

export default Dashboard;
