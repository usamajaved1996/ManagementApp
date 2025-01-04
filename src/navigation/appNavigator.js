import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, ImageBackground } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import Reports from '../screens/Report';
import Dashboard from '../screens/Dashboard';
import Inventory from '../screens/Inventory';
import Revenue from '../screens/Revenue';
import Growth from '../screens/Growth'; // Example: Add a new screen like Settings
import Settings from '../screens/Setting';
import HomeImg from '../assets/images/home.png';
import SettingImg from '../assets/images/settingImg.png';
import RevenueImg from '../assets/images/revenueImg.png';
import ReportImg from '../assets/images/reportImg.png';
import GrowthImg from '../assets/images/growthImg.png';
import InventoryImg from '../assets/images/inventoryImg.png';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const drawerItemStyles = {
  drawerLabelStyle: {
    color: 'white',
    fontSize: 15, // Adjust font size to your preference
    fontWeight: '700',
  },
  drawerActiveTintColor: 'white',
  drawerInactiveTintColor: 'white',
  drawerActiveBackgroundColor: 'transparent',
  drawerInactiveBackgroundColor: 'transparent',
  drawerItemStyle: {
    marginVertical: 5,
    marginLeft: 5
  },
};

const CustomDrawerContent = ({ props, onLogout }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  return (
    <ImageBackground source={require('../assets/images/drawerBg.png')} style={styles.drawerBackground}>
      <View style={styles.contentContainer}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <DrawerContentScrollView {...props} contentContainerStyle={{ width: '100%' }}>
          <DrawerItemList
            {...props}
            labelStyle={drawerItemStyles.drawerLabelStyle}
            activeTintColor={drawerItemStyles.drawerActiveTintColor}
            inactiveTintColor={drawerItemStyles.drawerInactiveTintColor}
            itemStyle={drawerItemStyles.drawerItemStyle}
          />
        </DrawerContentScrollView>

        <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30 }} onPress={showLogoutModal}>
          {/* <Image source={require('../assets/images/logout.png')} /> */}
          <Text style={{ color: 'white', padding: 2 }}> Log Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const AppDrawer = ({ onLogout }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent props={props} onLogout={onLogout} />}
      drawerPosition="right"
      drawerType="front"
      overlayColor="transparent"
      screenOptions={{
        drawerStyle: {
          width: '70%', // Set the width to 70% or adjust as needed
        },
        drawerLabelStyle: drawerItemStyles.drawerLabelStyle, // Apply the drawer label style globally
        drawerActiveTintColor: drawerItemStyles.drawerActiveTintColor,
        drawerInactiveTintColor: drawerItemStyles.drawerInactiveTintColor,
        drawerItemStyle: drawerItemStyles.drawerItemStyle,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Dashboard}
        options={{
          ...drawerItemStyles,
          header: () => (
            <View style={styles.headerContainer}>
              {/* <Image source={require('../assets/images/profile.png')} style={styles.profileImage} /> */}
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome Back!</Text>
                <Text style={styles.restaurantName}>Nusantara Restaurant 👋</Text>
              </View>
              {/* <Image source={require('../assets/images/notification.png')} style={styles.notificationIcon} /> */}
            </View>
          ),
          drawerLabel: ({ focused, color }) => (
            <View style={styles.drawerItemContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={HomeImg} style={{ width: 30, height: 30 }} />
                <Text style={{ marginLeft: 20, fontSize: 20, color: color, fontWeight: '500' }}>
                  Home
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Inventory"
        component={Inventory}
        options={{
          headerStyle: { backgroundColor: '#0E0E52' }, // Optional: Customize header background color
          headerTintColor: 'white', // Optional: Set header text color
          headerTitleAlign: 'center', // Align title to the center
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
                Inventory
              </Text>
            </View>
          ),
          drawerLabel: ({ focused, color }) => (
            <View style={styles.drawerItemContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={InventoryImg} style={{ width: 30, height: 30 }} />
                <Text style={{ marginLeft: 20, fontSize: 20, color: color, fontWeight: '500' }}>
                  Inventory
                </Text>
              </View>
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Revenue"
        component={Revenue}
        options={{
          ...drawerItemStyles,
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#EC5D78',
          headerTitleAlign: 'center',
          drawerLabel: ({ focused, color }) => (
            <View style={styles.drawerItemContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={RevenueImg} style={{ width: 30, height: 30 }} />
                <Text style={{ marginLeft: 20, fontSize: 20, color: color, fontWeight: '500' }}>
                  Revenue
                </Text>
              </View>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image source={RevenueImg} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="Growth"
        component={Growth}
        options={{
          ...drawerItemStyles,
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#EC5D78',
          headerTitleAlign: 'center',
          drawerLabel: ({ focused, color }) => (
            <View style={styles.drawerItemContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={GrowthImg} style={{ width: 30, height: 30 }} />
                <Text style={{ marginLeft: 20, fontSize: 20, color: color, fontWeight: '500' }}>
                  Growth
                </Text>
              </View>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image source={GrowthImg} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="Report"
        component={Reports}
        options={{
          ...drawerItemStyles,
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#EC5D78',
          headerTitleAlign: 'center',
          drawerLabel: ({ focused, color }) => (
            <View style={styles.drawerItemContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={ReportImg} style={{ width: 27, height: 27 }} />
                <Text style={{ marginLeft: 20, fontSize: 20, color: color, fontWeight: '500' }}>
                  Report
                </Text>
              </View>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image source={ReportImg} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          ...drawerItemStyles,
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#EC5D78',
          headerTitleAlign: 'center',
          drawerLabel: ({ focused, color }) => (
            <View style={styles.drawerItemContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={SettingImg} style={{ width: 30, height: 30 }} />
                <Text style={{ marginLeft: 20, fontSize: 20, color: color, fontWeight: '500' }}>
                  Settings
                </Text>
              </View>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image source={GrowthImg} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = ({ onLogout }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{ headerShown: false }}>
        {() => <AppDrawer onLogout={onLogout} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    paddingVertical: 40,
    paddingRight: 10,
    flex: 1,
  },
  closeDrawerButton: {
    margin: 30,
    backgroundColor: '#fff',
    width: 35, height: 35,
    borderWidth: 1, borderColor: 'white', borderRadius: 12,
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
});

export default AppNavigator;
