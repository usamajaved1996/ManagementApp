import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import * as customStyles from "../../utils/color";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import OverTimeModal from "../../components/Modals/overTimeModal";
import SalaryModal from "../../components/Modals/salaryModal";

const Payroll = () => {
  const data = Array(10).fill({
    name: "Henry Marchel",
    overtime: "16 Hours",
    bonus: "$150.00",
    deductions: "$200.00",
    netPay: "$3200.00",
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSalaryModal, setIsSalaryModal] = useState(false);

  const openModal = () => setModalVisible(true);
  const openModalSalary = () => setIsSalaryModal(true);

  const closeModal = () => setModalVisible(false);
  const closeModalSalary = () => setIsSalaryModal(false);

  const renderRow = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableData, { width: 200 }]}>{item.name}</Text>
      <Text style={[styles.tableData, { width: 120 }]}>{item.overtime}</Text>
      <Text style={[styles.tableData, { width: 120 }]}>{item.bonus}</Text>
      <Text style={[styles.tableData, { width: 120 }]}>{item.deductions}</Text>
      <Text style={[styles.tableData, { width: 120 }]}>{item.netPay}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cards */}
      <View style={styles.cardContainer}>
        <View style={[styles.card, styles.cardBlue]}>
          <Text style={styles.cardAmount1}>$345.00</Text>
          <Text style={styles.cardLabel1}>Overtime Rate (Hourly)</Text>
          <TouchableOpacity style={styles.cardButton} onPress={openModal}>
            <Text style={styles.cardButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.card, styles.cardGreen]}>
          <Text style={styles.cardAmount2}>$45505.00</Text>
          <Text style={styles.cardLabel2}>Salary Rate</Text>
          <TouchableOpacity style={styles.cardButton} onPress={openModalSalary}>
            <Text style={styles.cardButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#888"
        />
      </View>

      {/* Table */}
      <ScrollView
        horizontal={true}
        style={styles.tableContainer}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeader, { width: 200 }]}>Full Name</Text>
            <Text style={[styles.tableHeader, { width: 120 }]}>Overtime</Text>
            <Text style={[styles.tableHeader, { width: 120 }]}>Bonus</Text>
            <Text style={[styles.tableHeader, { width: 120 }]}>Deductions</Text>
            <Text style={[styles.tableHeader, { width: 120 }]}>Net Pay</Text>
          </View>

          {/* Table Content */}
          <FlatList
            data={data}
            renderItem={renderRow}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
      <OverTimeModal visible={isModalVisible} onClose={closeModal}/>
      <SalaryModal visible={isSalaryModal} onClose={closeModalSalary}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customStyles.backgroundColors.bGColor,
    padding: 16,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cardBlue: {
    backgroundColor: "#E0E2F5",
    borderColor: "#0000FF",
  },
  cardGreen: {
    backgroundColor: "#E0F5EA",
    borderColor: "#00A000",
  },
  cardAmount1: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5734A8",
  },
  cardLabel1: {
    fontSize: 12,
    color: "#5734A8",
    marginVertical: 8,
    fontWeight: "400",

  },
  cardAmount2: {
    fontSize: 18,
    fontWeight: "600",
    color: "#285238",
  },
  cardLabel2: {
    fontSize: 12,
    color: "#285238",
    marginVertical: 8,
    fontWeight: "400",
  },
  cardButton: {
    backgroundColor: "#000066",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 5,
    width: '65%',
    height: 32
  },
  cardButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
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
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#EDEDFE",
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 16, // Increased font size for better readability
    color: "#000000",
    textAlign: "center",
    paddingHorizontal: 4, // Added padding for better spacing
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 16, // Increased padding for larger rows
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tableData: {
    fontSize: 16, // Increased font size
    color: "#000000",
    textAlign: "center",
    paddingHorizontal: 4, // Added padding for better spacing
  },


});

export default Payroll;
