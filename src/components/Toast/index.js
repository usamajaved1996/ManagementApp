import Toast from 'react-native-toast-message';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const toastMsg = (message, type = 'success') => {
  Toast.show({
    type: 'custom', // Ensure it matches with the toastConfig name
    text1: message,
    props: { type }, // Pass the type of message (error or success)
  });
};

export const toastConfig = {
  custom: ({ text1, props }) => {
    // Set background color based on the message type
    const backgroundColor = props.type === 'error' ? 'red' : '#285238'; 
    
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor, // Dynamically set the color
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          maxWidth: '90%', // Ensure the message doesn't overflow
          marginLeft: '5%', // Center the toast
          marginBottom: 50, // Add space from bottom
        }}
      >
        <Icon
          name={props.type === 'error' ? 'alert-circle' : 'checkmark-circle'}
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          {text1}
        </Text>
      </View>
    );
  },
};
