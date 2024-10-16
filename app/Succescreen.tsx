import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SuccessScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Form successfully saved!</Text>
      <Text style={styles.message}>Thank you for your Participation!</Text>

      {/* Button to navigate back to the dashboard or any other screen */}
      <Button title="Back to Dashboard" onPress={() => (navigation as any).navigate("index")} />

      {/* Image below the button */}
      <Image 
        source={require('../assets/images/logo2.jpg')} // Adjust the path based on your project structure
        style={styles.logo} 
      />
    </View>
  );
};

// Styling for the success screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7fffd4",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "yellow",
    textAlign: "center",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 40,
  },
  logo: {
    width: 360, // Adjust width as needed
    height: 100, // Adjust height as needed
    marginTop: 20, // Space above the image
    bottom: -200
  },
});

export default SuccessScreen;
