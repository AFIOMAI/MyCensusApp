import React, { useState } from "react";
import { View, TextInput, Text, Button, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const IndicativeInfo = () => {
  const navigation = useNavigation(); // Get navigation object

  // States for inputs
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [localLevelGovernment, setLocalLevelGovernment] = useState("");
  const [ward, setWard] = useState("");
  const [censusUnit, setCensusUnit] = useState("");
  const [censusUnitType, setCensusUnitType] = useState("");
  const [workloadNumber, setWorkloadNumber] = useState("");
  const [locality, setLocality] = useState("");
  const [section, setSection] = useState("");
  const [structure, setStructure] = useState("");
  const [lot, setLot] = useState("");
  const [pdNo, setPdNo] = useState("");
  const [householdNumber, setHouseholdNumber] = useState("");

  const handleSubmit = () => {
    // Check if all fields are filled
    if (
      !province ||
      !district ||
      !localLevelGovernment ||
      !ward ||
      !censusUnit ||
      !censusUnitType ||
      !workloadNumber ||
      !locality ||
      !section ||
      !structure ||
      !lot ||
      !pdNo ||
      !householdNumber
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Logic for handling the data submission can go here
    console.log("Submitted Data: ", {
      province,
      district,
      localLevelGovernment,
      ward,
      censusUnit,
      censusUnitType,
      workloadNumber,
      locality,
      section,
      structure,
      lot,
      pdNo,
      householdNumber,
    });

    // Navigate to the dashboard
    (navigation as any).navigate('dashboard'); 

    // Reset the form
    resetForm();
  };

  const resetForm = () => {
    // Clear all input fields
    setProvince("");
    setDistrict("");
    setLocalLevelGovernment("");
    setWard("");
    setCensusUnit("");
    setCensusUnitType("");
    setWorkloadNumber("");
    setLocality("");
    setSection("");
    setStructure("");
    setLot("");
    setPdNo("");
    setHouseholdNumber("");
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.censusText}>Census</Text>
      <View style={styles.container}>
        <Text style={styles.header}>Indicative Information</Text>

        {/* Text Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Enter Province"
          value={province}
          onChangeText={setProvince}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter District"
          value={district}
          onChangeText={setDistrict}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter LLG"
          value={localLevelGovernment}
          onChangeText={setLocalLevelGovernment}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Ward"
          value={ward}
          onChangeText={setWard}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Census Unit"
          value={censusUnit}
          onChangeText={setCensusUnit}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Census Unit Type"
          value={censusUnitType}
          onChangeText={setCensusUnitType}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Workload Number"
          value={workloadNumber}
          onChangeText={setWorkloadNumber}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Locality"
          value={locality}
          onChangeText={setLocality}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Section"
          value={section}
          onChangeText={setSection}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Structure"
          value={structure}
          onChangeText={setStructure}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Lot"
          value={lot}
          onChangeText={setLot}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter PD No"
          value={pdNo}
          onChangeText={setPdNo}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Household Number"
          value={householdNumber}
          onChangeText={setHouseholdNumber}
          placeholderTextColor="#888"
        />

        <Button title="Next" onPress={handleSubmit} />
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
  censusText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "yellow",
    textAlign: "center",
    marginVertical: 20,
    bottom: -20,
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
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default IndicativeInfo;
