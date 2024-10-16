import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SpecifyScreen: React.FC = () => {
  const navigation = useNavigation();

  // States for the questions with explicit types
  const [question1, setQuestion1] = useState<string>("");
  const [question2, setQuestion2] = useState<string>("");
  const [comments, setComments] = useState<string>("");

  const handleSave = () => {
    // Here you can handle the saving logic if needed
    Alert.alert("Save", "Your responses have been saved!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Census</Text>

      {/* Question 1 */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          1A. Just to make sure that you have completed listing, are there any
          other persons such small children or infants that you have not
          listed?
        </Text>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity onPress={() => setQuestion1("Yes")}>
            <Text style={question1 === "Yes" ? styles.radioButtonSelected : styles.radioButton}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setQuestion1("No")}>
            <Text style={question1 === "No" ? styles.radioButtonSelected : styles.radioButton}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Question 2 */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          1B. Are there any other persons who may not be members of your
          family, such as domestic servants, lodgers or friends who slept
          here on 16th June 2024 who have not been listed?
        </Text>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity onPress={() => setQuestion2("Yes")}>
            <Text style={question2 === "Yes" ? styles.radioButtonSelected : styles.radioButton}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setQuestion2("No")}>
            <Text style={question2 === "No" ? styles.radioButtonSelected : styles.radioButton}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsText}>Comments/Remarks:</Text>
        <TextInput
          style={styles.commentsInput}
          placeholder="Note in the space below any comments/questions if you have."
          value={comments}
          onChangeText={setComments}
          multiline
          numberOfLines={4}
          placeholderTextColor="#888"
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button title="Add Person" onPress={() => (navigation as any).navigate("dashboard")} />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

// Styling for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:  "#7fffd4",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "yellow",
    textAlign: "center",
    marginVertical: 20,
    bottom: -20,
  },
  questionContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff", // White background for question sections
    borderRadius: 12,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333", // Darker text color for the question
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioButton: {
    fontSize: 16,
    color: "#333",
  },
  radioButtonSelected: {
    fontSize: 16,
    color: "blue", // Change color for selected option
    fontWeight: "bold",
  },
  commentsContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff", // White background for comments section
    borderRadius: 12,
  },
  commentsText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333", // Darker text color for comments label
  },
  commentsInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12, // Rounded corners for a modern feel
    paddingHorizontal: 15,
    backgroundColor: "#fff", // White background for input fields
    shadowColor: "#000", // Shadow for subtle elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevation on Android
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default SpecifyScreen;

