import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';

interface LoginValues {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  message: string;
}

export default function Login() {
  const router = useRouter();
  const API_BASE = "http://192.168.31.65:4000";

  const login = async (values: LoginValues) => {
    try {
      const res = await axios.post<LoginResponse>(`${API_BASE}/api/vi/user/login`, values, { withCredentials: true });

      console.log("res.data:", res.data);

      if (res.data.success) {
        const token = res.data.token;
        console.log(token);
        
        // Store token with expiry time
        const data = JSON.stringify({
          token,
          expiresAt: Date.now() + 3600000 // Current time + 1 hour
        });
        // console.log("login data",data);
        await AsyncStorage.setItem("token", data);
        
        console.log("Login successful!");
        router.replace("/"); // Navigate back to home
      } else {
        Alert.alert("Error", "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      Alert.alert("Error", "Login failed. Please try again.");
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.heading}>Login</Text>
      <View style={styles.form}>
        <Formik<LoginValues>
          initialValues={{ email: '', password: '' }}
          onSubmit={login}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <View>
                <Text style={styles.label}>Email: </Text>
                <TextInput
                  placeholder="Email or UserName"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.field}
                />
              </View>

              <View>
                <Text style={styles.label}>Password: </Text>
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.field}
                />
              </View>

              <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%"
  },
  form: {
    padding: 15,
    height: 250,
    width: 300,
    borderRadius: 10
  },
  heading: {
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20
  },
  field: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#b0edf6',
    paddingHorizontal: 10
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});