import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// Types
type GoldenMenuItem = {
  itemName: string;
  description: string;
  course: string;
  price: number;
};

type RootStackParamList = {
  HomeScreen: undefined;
  AddMenuItemScreen: { items: GoldenMenuItem[]; setItems: (items: GoldenMenuItem[]) => void };
  FilterScreen: { items: GoldenMenuItem[] };
};

type AddMenuItemScreenProps = NativeStackScreenProps<RootStackParamList, "AddMenuItemScreen">;

// This component manages the "Add Menu Item" screen of the app.
// It allows the user to input details for a new cafe menu item and add it to the main list.
export default function AddMenuItemScreen({ navigation, route }: AddMenuItemScreenProps) {

  // State variables to store user input for a new menu item
  const [itemName, setItemName] = useState('');           // Stores the name of the cafe item
  const [description, setDescription] = useState('');     // Stores the description of the cafe item
  const [course, setCourse] = useState<string>('');       // Stores the category of the menu item
  const [price, setPrice] = useState('');                 // Stores the price of the cafe item as a string

  // Function to validate input, create a new item, and add it to the main list
  const handleSubmit = () => {
    // Check that all required fields contain values before continuing
    if (itemName && description && course && price) {
      const priceValue = parseFloat(price); // Convert price from string to number

      // Ensure that the entered price is a positive number
      if (priceValue > 0) {
        // Creates a new menu item object using the entered data
        const newItem: GoldenMenuItem = {
          itemName,
          description,
          course,
          price: priceValue,
        };

        // Updates the main menu list by adding the new item
        // Uses the setItems function passed from HomeScreen via navigation parameters
        route.params.setItems([...route.params.items, newItem]);

        // Returns the user to the previous screen after successfully adding items
        navigation.goBack();
      } else {
        // Displays an alert if the price is invalid (not a positive number)
        Alert.alert('Invalid Price', 'Please enter a valid positive number for the price.');
      }
    } else {
      // Displays an alert if any required fields are missing
      Alert.alert('Missing Information', 'Please fill in all required fields.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.formHeader}>Add a new menu item</Text>

          <TextInput
            style={styles.input}
            placeholder="Dish name"
            placeholderTextColor="#9ca69f"
            value={itemName}
            onChangeText={setItemName}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Dish description"
            placeholderTextColor="#9ca69f"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Course</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={course}
                onValueChange={(value) => setCourse(value)}
                mode="dropdown"
                dropdownIconColor="#2b4b35"
                style={styles.pickerStyle}
              >
                <Picker.Item label="Select a course" value="" color="#999" />
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main" value="Main" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price (R)"
            placeholderTextColor="#9ca69f"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save Dish</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Back</Text>
          </TouchableOpacity>

          {/* Extra padding at bottom to prevent keyboard overlap */}
          <View style={{ height: 50 }} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#f2f0df',
    padding: 20,
    flexGrow: 1,
  },
  formHeader: {
    fontSize: 24,
    color: '#2b4b35ff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2d534bff',
    paddingHorizontal: 14,
    height: 50,
    marginVertical: 8,
    fontSize: 16,
    color: '#2e2d2dff',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    marginVertical: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3d3c3bff',
    marginBottom: 8,
    marginLeft: 3,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#2c481fff',
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },

  pickerStyle: {
    color: '#2e2d2dff',
    height: Platform.OS === 'ios' ? 180 : 55,
    marginTop: Platform.OS === 'ios' ? -60 : 0,
  },
  
  saveButton: {
    backgroundColor: '#2b4b35ff',
    padding: 17,
    borderRadius: 15,
    marginTop: 17,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#9ca69f',
    padding: 12,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#2b4b35ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
