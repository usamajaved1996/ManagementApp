import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Scanner = () => {
  // Make sure that the onRead handler is defined correctly
  const handleQRCodeScanned = ({ data }) => {
    console.log(data); // Handling the scanned data
  };

  return (
    <View style={styles.container}>
      {/* <QRCodeScanner
        onRead={handleQRCodeScanned} // Make sure the handler is passed correctly
        showMarker={true}
        reactivate={true}
      /> */}
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Scanner;
