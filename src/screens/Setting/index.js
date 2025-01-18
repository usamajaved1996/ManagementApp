import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as customStyles from "../../utils/color";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../slices/authSlice';

const Settings = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteAccount = () => {
    setModalVisible(false);
    console.log("Account deleted");
  };
  const clearUserDataFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      dispatch(clearUser());
    } catch (error) {
      console.error('Error clearing user data from AsyncStorage:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="person" size={24} color={customStyles.Colors.blueTheme} />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Notification")}
      >
        <Icon name="notifications" size={24} color={customStyles.Colors.blueTheme} />
        <Text style={styles.text}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Icon name="privacy-tip" size={24} color={customStyles.Colors.blueTheme} />
        <Text style={styles.text}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Icon name="gavel" size={24} color={customStyles.Colors.blueTheme} />
        <Text style={styles.text}>Terms & Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Icon name="help" size={24} color={customStyles.Colors.blueTheme} />
        <Text style={styles.text}>FAQ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="delete" size={24} color={customStyles.Colors.blueTheme} />
        <Text style={styles.text}>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={clearUserDataFromStorage}>
        <Icon name="logout" size={24} color={customStyles.Colors.blueTheme} />
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to delete your account?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okButton}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.okText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 15,
    width: "95%",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: customStyles.Colors.blueTheme,
    fontWeight: "600",
    paddingLeft: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
  },
  okButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: customStyles.Colors.blueTheme,
    borderRadius: 5,
  },
  cancelText: {
    color: "#000",
    fontSize: 16,
  },
  okText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Settings;
