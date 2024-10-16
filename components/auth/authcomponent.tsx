import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Importing useNavigation

const AuthComponent = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [isSignIn, setIsSignIn] = useState(true); // State to track which form is displayed
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input

  // Dummy credentials for authentication
  const dummyEmail = "user@example.com";
  const dummyPassword = "password123";

  // Switch between Sign In and Sign Up form
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  // Handle login action
  const handleLogin = () => {
    if (email === dummyEmail && password === dummyPassword) {
      (navigation as any).navigate("IndicativeInfo1"); // Navigate to dashboard on successful login
    } else {
      alert("Invalid email or password."); // Alert for invalid credentials
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.headerText}>
        {isSignIn ? "Log into Census" : "Create a New Account"}
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
        value={email} // Controlled input for email
        onChangeText={setEmail} // Update email state
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        placeholderTextColor="#888"
        value={password} // Controlled input for password
        onChangeText={setPassword} // Update password state
      />

      {!isSignIn && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor="#888"
        />
      )}

      {/* Action Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {isSignIn ? "Log In" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      {/* Toggle between forms */}
      <TouchableOpacity onPress={toggleForm}>
        <Text style={styles.toggleText}>
          {isSignIn
            ? "Forgot your password? Create new account"
            : "Already have an account? Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Modern styling for the form
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#7fffd4", // Light background for a clean look
    borderRadius: 20,
    width: "100%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Dark text for contrast
    marginBottom: 40, // Space between header and form
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff", // White background for inputs
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Elevation for Android shadow
  },
  button: {
    backgroundColor: "#4CAF50", // Green for action button
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  toggleText: {
    color: "#2196F3", // Blue link for toggling between forms
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
});

export default AuthComponent;
