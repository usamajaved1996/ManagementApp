import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import { Svg, Path } from "react-native-svg";
import LinearGradient from 'react-native-linear-gradient';
import * as customStyles from "../../utils/color";
import Dollar from '../../assets/images/dollar.png';
import Profit from '../../assets/images/profit.png';
import Last from '../../assets/images/lastInventory.png';
import Clock from '../../assets/images/clock.png';
import Layer from '../../assets/images/clockLayer.png';
import Upload from '../../assets/images/upload.png';
import Sparkle from '../../assets/images/sparkles.png';

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <Image source={Sparkle} style={styles.image} resizeMode="cover" />
        <Text style={styles.headerText}>Quick summary</Text>
      </View>
      {/* <LinearGradient
        colors={['#2F5E41', '#2B2B95']} // Gradient colors
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.button}
      > */}
      <ImageBackground source={require('../../assets/images/chart.png')} style={styles.drawerBackground}>
        <View style={styles.cardPrimary}>
          <Text style={styles.cardTitle}>Total Sales</Text>
          <Text style={styles.salesAmount}>$23,3456.00</Text>
          <View style={{ flexDirection: 'row', marginTop: 3 }}>
            <Text style={styles.badge}>+30%</Text>
            <Text style={styles.percentageChange}>   From the previous month</Text>
          </View>

          <Svg height="100" width="100%" viewBox="0 0 100 30">
            <Path
              d="M0,30 Q20,5 40,20 T80,10 T100,25"
              fill="none"
              stroke={customStyles.Colors.green}
              strokeWidth="0.2"
            />
          </Svg>
        </View>
      </ImageBackground>

      <View style={styles.rowContainer}>
        <View style={styles.cardSecondary}>
          <Image source={Dollar} style={styles.image} resizeMode="cover" />
          <Text style={styles.cardSecondaryValue}>$24,500</Text>
          <Text style={styles.cardSecondaryTitle}>Total Revenue</Text>
        </View>

        <View style={styles.cardSecondary}>
          <Image source={Last} style={styles.image} resizeMode="cover" />
          <Text style={styles.cardSecondaryValue}>12</Text>
          <Text style={styles.cardSecondaryTitle}>Last Inventory</Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.cardSecondary}>
          <Image source={Profit} style={styles.image} resizeMode="cover" />
          <Text style={styles.cardSecondaryValue}>07</Text>
          <Text style={styles.cardSecondaryTitle}>Daily Profit</Text>
        </View>

        <View style={styles.cardSecondary}>
          <ImageBackground
            source={Layer}
            style={styles.roundImageContainer}
            imageStyle={styles.roundImage}
          >
            <Image source={Clock} style={styles.clockImage} resizeMode="contain" />
          </ImageBackground>
          <Text style={styles.cardSecondaryTitle}>Last Upload: Fri, 8 Dec 2024, 2:00am</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadLink}>Upload Inventory</Text>
            <Image source={Upload} style={styles.uploadImage} resizeMode="contain" />
          </TouchableOpacity>

        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customStyles.backgroundColors.bGColor,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 22,
    flexDirection:'row'
  },
  headerText: {
    fontSize: 21,
    fontWeight: "600",
    color: customStyles.Colors.blueTheme,
    marginTop:6,
    marginLeft:16
  },
  drawerBackground: {
    marginLeft: 2,
    marginRight: 2
  },
  image: {
    width: 43,
    height: 43,
  },
  roundImageContainer: {
    width: 43, // Adjust the size as needed
    height: 43, // Same as width to make it a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Space between the image and text
  },
  roundImage: {
    borderRadius: 50, // Half of width/height to make it round
  },
  clockImage: {
    width: 16, // Size of the Clock image
    height: 16,
  },
  cardPrimary: {
    padding: 28,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 10,
    fontWeight: '800'
  },
  salesAmount: {
    fontSize: 26,
    fontWeight: "600",
    color: "#ffffff",
  },
  badge: {
    backgroundColor: 'white',
    color: customStyles.Colors.green,
    borderRadius: 12,
    fontSize: 11,
    fontWeight: '600',
    paddingTop: 3,
    height: 21,
    padding: 6,
    marginTop: 3
  },
  percentageChange: {
    fontSize: 12,
    color: "#fff",
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  cardSecondary: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSecondaryTitle: {
    fontSize: 14,
    color: customStyles.Colors.inventoryText,
    marginBottom: 10,
    paddingTop: 4
  },
  cardSecondaryValue: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1f2a42",
    paddingTop: 16
  },
  lastUploadText: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 5,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center', // Ensures text and image are aligned vertically
  },
  uploadLink: {
    fontSize: 13,
    color: customStyles.Colors.blueTheme,
    fontWeight: "600",
    marginRight: 6, // Slight space between text and image, adjust or remove as needed
  },
  uploadImage: {
    width: 17, // Adjust size as needed
    height: 17,
  },
});

export default Dashboard;
