import React from "react";
import { View, SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as customStyles from "../../utils/color";
import Employee from "../PayRollSection/employee";
import Deduction from "../PayRollSection/deduction";
import Payroll from "../PayRollSection/payroll";

// Create Tab navigator
const Tab = createMaterialTopTabNavigator();

function PayRollTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: customStyles.Colors.blueTheme, // Active tab color
        tabBarInactiveTintColor: '#8D8D8D', // Inactive tab color
        tabBarStyle: {
          backgroundColor: 'white', // Background color of the tab bar
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
        },
        tabBarIndicatorStyle: {
          backgroundColor: customStyles.Colors.blueTheme, // Change indicator color here
        },
      }}
    >
      <Tab.Screen name="Employee Sections" component={Employee} />
      <Tab.Screen name="Manage Deductions" component={Deduction} />
      <Tab.Screen name="Payroll Sections" component={Payroll} />
    </Tab.Navigator>
  );
}

export default function TabViewExample() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: customStyles.backgroundColors.bGColor }}>
      {/* Just use the TabNavigator directly here */}
      <PayRollTabs />
    </SafeAreaView>
  );
}
