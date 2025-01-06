import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const LoginStall = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>Preview Fence</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Change to your desired background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, // Adjust based on your logo size
    height: 150, // Adjust based on your logo size
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', // Adjust to your preferred text color
  },
});

export default LoginStall;
