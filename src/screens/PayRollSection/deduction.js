import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as customStyles from "../../utils/color";

const Deduction = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableRow1}>
          <Text style={styles.tableHeader}>Health Insurance</Text>
          <Text style={styles.tableHeader}>Garnishments</Text>
        </View>
        <View style={styles.tableRow2}>
          <Text style={styles.tableData}>$2100.00</Text>
          <Text style={styles.tableData}>$1100.00</Text>
        </View>
      </View>

      {/* Net Pay Section */}
      <View style={styles.bottom}>
        <View style={styles.netPayContainer}>
          <Text style={styles.netPayLabel}>Net Pay:</Text>
          <Text style={styles.netPayValue}>$3456.00</Text>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PayrollDeduction')}>
          <Text style={styles.buttonText}>Update Deduction Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customStyles.backgroundColors.bGColor,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  table: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    marginBottom: 16,
    position: 'absolute',
    top: 30
  },
  tableRow1: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F5F5FE",
    borderRadius: 5

  },
  tableRow2: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    borderRadius: 5
  },
  tableHeader: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000000",
  },
  tableData: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "400",

  },
  bottom: {
    position: 'absolute',
    bottom: 10
  },
  netPayContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E0E2F5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  netPayLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  netPayValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  button: {
    width: "100%",
    backgroundColor: customStyles.Colors.blueTheme,
    borderRadius: 5,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Deduction;
