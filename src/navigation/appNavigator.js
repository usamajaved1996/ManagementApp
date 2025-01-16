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
import PayRollImg from '../assets/images/payrollImg.png';
import PayRoll from '../screens/PayRoll';
import { DrawerActions } from '@react-navigation/native';
import ProfileScreen from '../screens/Profile';
import Notifications from '../screens/Notification';


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
  const navigation = useNavigation();

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
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerBackground: () => (
            <LinearGradient
              colors={['#2F5E41', '#2B2B95']} // Gradient colors
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          // headerBackground: () => (
          //   <Image 
          //     source={HeaderImg} 
          //     style={styles.headerImgStyle} 
          //     resizeMode="cover" 
          //   />
          // ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 16 }}>
              <Image source={require('../assets/images/menu.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Notification clicked')} style={{ marginRight: 16 }}>
              <Image source={require('../assets/images/notification.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
                Home
              </Text>
            </View>
          ),
          drawerLabel: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/images/home.png')} style={{ width: 20, height: 20 }} />
              <Text style={{ marginLeft: 20, fontSize: 16, color: color, fontWeight: '400' }}>{'Home'}</Text>
            </View>
          ),
        })}
      />

      <Drawer.Screen
        name="Inventory"
        component={Inventory}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerBackground: () => (
            <LinearGradient
              colors={['#2F5E41', '#2B2B95']} // Gradient colors
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 16 }}>
              <Image source={require('../assets/images/menu.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Notification clicked')} style={{ marginRight: 16 }}>
              <Image source={require('../assets/images/notification.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
                Inventory
              </Text>
            </View>
          ),
          drawerLabel: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={InventoryImg} style={{ width: 20, height: 20 }} />
              <Text style={{ marginLeft: 20, fontSize: 16, color: color, fontWeight: '400' }}>{'Inventory'}</Text>
            </View>
          ),
        })}
      />

      <Drawer.Screen
        name="Revenue"
        component={Revenue}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerBackground: () => (
            <LinearGradient
              colors={['#2F5E41', '#2B2B95']} // Gradient colors
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 16 }}>
              <Image source={require('../assets/images/menu.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Notification clicked')} style={{ marginRight: 16 }}>
              <Image source={require('../assets/images/notification.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
              Revenue
              </Text>
            </View>
          ),
          drawerLabel: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={RevenueImg} style={{ width: 20, height: 20 }} />
              <Text style={{ marginLeft: 20, fontSize: 16, color: color, fontWeight: '400' }}>{'Revenue'}</Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Growth"
        component={Growth}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerBackground: () => (
            <LinearGradient
              colors={['#2F5E41', '#2B2B95']} // Gradient colors
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 16 }}>
              <Image source={require('../assets/images/menu.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Notification clicked')} style={{ marginRight: 16 }}>
              <Image source={require('../assets/images/notification.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
              Growth
              </Text>
            </View>
          ),
          drawerLabel: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={GrowthImg} style={{ width: 20, height: 20 }} />
              <Text style={{ marginLeft: 20, fontSize: 16, color: color, fontWeight: '400' }}>{'Growth'}</Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Report"
        component={Reports}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerBackground: () => (
            <LinearGradient
              colors={['#2F5E41', '#2B2B95']} // Gradient colors
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 16 }}>
              <Image source={require('../assets/images/menu.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Notification clicked')} style={{ marginRight: 16 }}>
              <Image source={require('../assets/images/notification.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
              Report
              </Text>
            </View>
          ),
          drawerLabel: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={ReportImg} style={{ width: 20, height: 20 }} />
              <Text style={{ marginLeft: 20, fontSize: 16, color: color, fontWeight: '400' }}>{'Report'}</Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Payroll"
        component={PayRoll}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerBackground: () => (
            <LinearGradient
              colors={['#2F5E41', '#2B2B95']} // Gradient colors
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 16 }}>
              <Image source={require('../assets/images/menu.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Notification clicked')} style={{ marginRight: 16 }}>
              <Image source={require('../assets/images/notification.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
              PayRoll
              </Text>
            </View>
          ),
          drawerLabel: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={PayRollImg} style={{ width: 20, height: 20 }} />
              <Text style={{ marginLeft: 20, fontSize: 16, color: color, fontWeight: '400' }}>{'PayRoll'}</Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerBackground: () => (
            <LinearGradient
              colors={['#2F5E41', '#2B2B95']} // Gradient colors
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 16 }}>
              <Image source={require('../assets/images/menu.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Notification clicked')} style={{ marginRight: 16 }}>
              <Image source={require('../assets/images/notification.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
              Settings
              </Text>
            </View>
          ),
          drawerLabel: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={SettingImg} style={{ width: 20, height: 20 }} />
              <Text style={{ marginLeft: 20, fontSize: 16, color: color, fontWeight: '400' }}>{'Settings'}</Text>
            </View>
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = ({ onLogout }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" options={{ headerShown: false }}>
        {() => <AppDrawer onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Notification' component={Notifications} options={{ headerShown: false }} />
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
    flex: 1,
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
