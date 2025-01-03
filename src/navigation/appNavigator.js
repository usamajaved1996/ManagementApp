import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import {  useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import Reports from '../screens/Report';
import Dashboard from '../screens/Dashboard';
// import Setting from '../screens/Setting'; // Example: Add a new screen like Settings
// import UserProfileImage from '../assets/images/userProfile.png'

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
    <LinearGradient
      colors={['#0E0E52', '#34A853']} // Gradient colors
      style={styles.drawerBackground} // Apply the gradient background
    >
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
    </LinearGradient>
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
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Reports" component={Reports} />
      {/* <Drawer.Screen name="Settings" component={Setting} /> */}
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
  userContainer: {
    flexDirection: 'row',
    padding: 16,
    width: '100%'
  },
  userImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 37
  },
  userName: {
    color: 'white',
    fontSize: 18,
  },
  userNumber: {
    color: 'white',
    fontSize: 14,
  },
});

export default AppNavigator;
