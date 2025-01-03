import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import * as customStyles from "../../utils/color";

const Button = ({ text, onPress, loading }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading} style={{ width: '100%' }}>
      <LinearGradient
        colors={['#2F5E41', '#2B2B95']} // Gradient colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Loader when loading is true
        ) : (
          <Text style={styles.buttonText}>{text}</Text> // Button text
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    height:56,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#fff', // Text color remains white
  },
});

export default Button;
