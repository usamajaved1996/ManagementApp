
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/authNavigator';
import AppNavigator from './src/navigation/appNavigator';
import SplashNavigator from './src/navigation/splashNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from './src/slices/authSlice';
import { StatusBar } from 'react-native'; // Import StatusBar

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const splashTimeout = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(splashTimeout);
  }, []);

  const clearUserDataFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      dispatch(clearUser());
    } catch (error) {
      console.error('Error clearing user data from AsyncStorage:', error);
    }
  };

  // Save user data
  const saveUserDataToStorage = async (userData) => {
    try {
      const jsonUserData = JSON.stringify(userData);
      await AsyncStorage.setItem('userData', jsonUserData);
    } catch (error) {
      console.error('Error saving user data to AsyncStorage:', error);
    }
  };

  // Save user data to storage when user state changes
  useEffect(() => {
    if (user) {
      saveUserDataToStorage(user);
    }
  }, [user]);

  // Load user data from AsyncStorage on app load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonUserData = await AsyncStorage.getItem('userData');
        if (jsonUserData) {
          const userData = JSON.parse(jsonUserData);
          dispatch(saveUser(userData));
        }
      } catch (error) {
        console.error('Error loading user data from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content" // Dark text for the white background
        backgroundColor="#FFFFFF" // White background
      />
      <NavigationContainer>
        {showSplash ? (
          <SplashNavigator />
        ) : user ? (
          <AppNavigator onLogout={clearUserDataFromStorage} />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </>
  );
};

export default App;