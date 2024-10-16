import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handlelogin = () => {
    (navigation as any).navigate("auth");
  };

  return (
    <View style={styles.container}>
      {/* Logo Image at the top */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Centered Welcome Text */}
      <Text style={styles.headerText}>Welcome</Text>
      <Text style={styles.subText}>Papua New Guinea Census App</Text>

      {/* Button at the bottom */}
      <TouchableOpacity style={styles.button} onPress={handlelogin}>
        <Text style={styles.buttonText}>Lets Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styling for a modern, attractive layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#7fffd4", // Light background for contrast
  },
  logoContainer: {
    position: "absolute",
    top: 0,  // Position logo at the top of the screen
    alignItems: "center",
    width: "100%", // Make the container full width
  },
  logo: {
    width: "100%",  // Make the image take full width of the screen
    height: 300, // Adjust the height to make it taller
  },
  headerText: {
    fontSize: 48, // Enlarge the "Welcome" text
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 320, // Move the text below the logo
    marginBottom: 10,
    bottom: 120
  },
  subText: {
    fontSize: 24, // Make the "Papua New Guinea Census App" text larger but smaller than "Welcome"
    color: "yellow", // Change text color to yellow
    textAlign: "center",
    marginBottom: 40, // Space between text and button
    bottom: 120
  },
  button: {
    backgroundColor: "#4CAF50", // Modern green color
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
    bottom: 120
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
