import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as customStyles from "../../utils/color";
import Profile from '../../assets/images/profile.png';
import Notification from '../../assets/images/notify.png';

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{marginTop:20}}/>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
        <Image source={Profile} style={styles.image} resizeMode="cover" />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Notification")}>
        <Image source={Notification} style={styles.image} resizeMode="cover" />
        <Text style={styles.text}>Notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customStyles.backgroundColors.bGColor,
    alignItems: "center",
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 15,
    width: '95%',
    marginVertical: 10,
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: customStyles.Colors.blueTheme,
    fontWeight: '600',
    paddingLeft: 14
  },
  image: {
    width: 23,
    height: 23,
  },
});

export default Settings;
