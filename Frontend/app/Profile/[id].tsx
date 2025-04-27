import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Picker } from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Profile Picture */}
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
        style={styles.profileImage}
      />

      {/* Name and Date */}
      <Text style={styles.name}>Frances Swann</Text>
      <Text style={styles.date}>Member since March 2019</Text>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="frances.swann@example.com"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Frances Swann"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#aaa"
          secureTextEntry
        />

        {/* Date of Birth Section */}
        <View style={styles.dobContainer}>
          <TextInput
            style={styles.dobInput}
            placeholder="31"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.dobInput}
            placeholder="October"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.dobInput}
            placeholder="1996"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 24,
    color: '#333',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  dobContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  dobInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  saveButton: {
    height: 55,
    backgroundColor: '#0066FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
