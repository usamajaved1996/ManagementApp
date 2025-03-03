import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, clearUser } from './src/slices/authSlice';
import { StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/Toast/index';
import { navigationRef } from './src/navigation/navigationService';
import MainNavigator from './src/navigation/MainNavigator';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Clear user data from AsyncStorage
  const clearUserDataFromStorage = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('userData');
      dispatch(clearUser());
    } catch (error) {
      console.error('Error clearing user data from AsyncStorage:', error);
    }
  }, [dispatch]);

  // Save user data to AsyncStorage
  const saveUserDataToStorage = useCallback(async (userData) => {
    try {
      const jsonUserData = JSON.stringify(userData);
      await AsyncStorage.setItem('userData', jsonUserData);
    } catch (error) {
      console.error('Error saving user data to AsyncStorage:', error);
    }
  }, []);

  // Save user data whenever it changes
  useEffect(() => {
    if (user) {
      saveUserDataToStorage(user);
    }
  }, [user, saveUserDataToStorage]);

  // Load user data on app startup
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonUserData = await AsyncStorage.getItem('userData');
        if (jsonUserData) {
          try {
            const userData = JSON.parse(jsonUserData);
            dispatch(saveUser(userData));
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            await AsyncStorage.removeItem('userData'); // Remove corrupt data
          }
        }
      } catch (error) {
        console.error('Error loading user data from AsyncStorage:', error);
      } finally {
        setShowSplash(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <NavigationContainer ref={navigationRef}>
        <MainNavigator showSplash={showSplash} />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </View>
  );
};

export default App;
