import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Platform,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addPerson, initializeDB, getPersons, deletePerson } from "./database";

interface Person {
  id: number; // Change to the appropriate type based on your database
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string
}

const Dashboard = () => {
    // States for inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Select Gender"); // Default dropdown value
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false); // Handle visibility of Date Picker
    const [peopleCount, setPeopleCount] = useState(""); // State for people count input
    const [citizenship, setCitizenship] = useState("PNG-Citizen"); // Default citizenship value
    const [nonCitizenship, setNonCitizenship] = useState(""); // State for non-citizen country input
    const [persons, setPersons] = useState<Person[]>([]); // State to hold the list of persons
  
    const onChangeDate = (event: { nativeEvent: { timestamp: number } }, selectedDate?: Date) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === "ios");
      setDate(currentDate);
    };
  
    useEffect(() => {
      const setupDatabase = async () => {
        await initializeDB();
        await fetchPersons(); // Fetch persons after initializing database
      };
  
      setupDatabase();
    }, []);
  
    const fetchPersons = async () => {
      const personsList: Person[] = await getPersons(); // Ensure getPersons returns Person[]
      setPersons(personsList);
    };
  
    const handleDelete = async (id: number) => { // Specify the type for id
      try {
        await deletePerson(id); // Delete person from the database
        fetchPersons(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting person:", error);
      }
    };
  
    const handleSubmit = async () => {
        if (
          !firstName ||
          !lastName ||
          !phone ||
          !email ||
          gender === "Select Gender" ||
          !peopleCount ||
          (citizenship === "Non-PNG Citizen" && !nonCitizenship)
        ) {
          Alert.alert("Error", "Please fill in all fields correctly.");
          return;
        }
      
        try {
          const id = await addPerson(
            firstName,
            lastName,
            phone,
            email,
            date.toISOString(), // Date of birth
            gender,
            peopleCount,
            citizenship,
            nonCitizenship // Pass all required parameters
          );
      
          console.log("Person created successfully with ID:", id);
          resetForm();
          fetchPersons();
        } catch (error) {
          console.error("Error submitting person:", error);
        }
      };
      
  
    const resetForm = () => {
      // Clear the form after submission
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setGender("Select Gender");
      setDate(new Date());
      setPeopleCount(""); // Reset people count
      setCitizenship("PNG-Citizen"); // Reset citizenship
      setNonCitizenship(""); // Reset non-citizen country
    };
  
    return (
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Census</Text>
        <View style={styles.container}>
  
          <View style={styles.peopleCountContainer}>
            <Text style={styles.questionText}>
              How many people (including visitors), slept here in your household on the night of Sunday, 16th June 2024?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number of people"
              value={peopleCount}
              onChangeText={setPeopleCount}
              keyboardType="numeric"
              placeholderTextColor="#888"
            />
          </View>
  
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#888"
            />
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue: React.SetStateAction<string>) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={"Select Gender"} />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
            <View>
              <Button title="Select Date of Birth" onPress={() => setShowDatePicker(true)} />
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
              <Text style={styles.dateText}>
                Date of Birth: {date.toDateString()}
              </Text>
            </View>
  
            {/* Citizenship Section */}
            <View style={styles.citizenshipContainer}>
              <Text style={styles.citizenshipText}>Citizenship:</Text>
              <View style={styles.radioButtonContainer}>
                <TouchableOpacity onPress={() => setCitizenship("PNG-Citizen")}>
                  <Text style={citizenship === "PNG-Citizen" ? styles.radioButtonSelected : styles.radioButton}>
                    PNG-Citizen
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCitizenship("Non-PNG Citizen")}>
                  <Text style={citizenship === "Non-PNG Citizen" ? styles.radioButtonSelected : styles.radioButton}>
                    Non-PNG Citizen
                  </Text>
                </TouchableOpacity>
              </View>
              {citizenship === "Non-PNG Citizen" && (
                <TextInput
                  style={styles.input}
                  placeholder="Specify country"
                  value={nonCitizenship}
                  onChangeText={setNonCitizenship}
                  placeholderTextColor="#888"
                />
              )}
            </View>
  
            <Button title="Submit" onPress={handleSubmit} />
          </View>
  
          {/* Table to display persons */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>First Name</Text>
              <Text style={styles.tableHeaderText}>Last Name</Text>
              <Text style={styles.tableHeaderText}>Phone</Text>
              <Text style={styles.tableHeaderText}>Email</Text>
              <Text style={styles.tableHeaderText}>Gender</Text>
              <Text style={styles.tableHeaderText}>Actions</Text>
            </View>
            {persons.map((person) => (
              <View key={person.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{person.firstName}</Text>
                <Text style={styles.tableCell}>{person.lastName}</Text>
                <Text style={styles.tableCell}>{person.phone}</Text>
                <Text style={styles.tableCell}>{person.email}</Text>
                <Text style={styles.tableCell}>{person.gender}</Text>
                <TouchableOpacity onPress={() => handleDelete(person.id)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };
// Styling for a modern look
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#7fffd4", // Light gray background for the whole screen
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF", // Light green background for the container
    borderRadius: 12,
    margin: 20,
    elevation: 5, // Adds a shadow effect for elevation
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "yellow", // Yellow color for the heading
    textAlign: "center",
    marginBottom: 30,
    bottom: -40
  },
  peopleCountContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f2f2f2", // Background color for people count section
    borderRadius: 12,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333", // Darker text color for the question
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12, // Rounded corners for a modern feel
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff", // White background for input fields
    shadowColor: "#000", // Shadow for subtle elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevation on Android
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  dateText: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    fontSize: 16,
    color: "#666", // Subtle gray for date display
  },
  citizenshipContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f2f2f2", // Background color for citizenship section
    borderRadius: 12,
  },
  citizenshipText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333", // Darker text color for citizenship label
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
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
  tableContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  deleteButton: {
    color: "red",
    textAlign: "center",
  },
});

export default Dashboard;

