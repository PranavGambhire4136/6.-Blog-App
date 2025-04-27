import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {

  const API_BASE = "http://192.168.31.65:4000";

  const login = async (values) => {
    try {
      const res = await axios.post(`${API_BASE}/api/vi/user/login`, values, { withCredentials: true });

      console.log("res.data:", res.data);

      if (res.data.success) {
        console.log(res.data.token);
        const data = JSON.stringify({token: res.data.token, time: Date.now()});
        await AsyncStorage.setItem("token", data);
        console.log("Cookie stored successfully!");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style = {styles.heading}>Login</Text>
      <View style={styles.form}>
        <Formik
          initialValues={{ email: 'pranavgambhire7v@gmail.com', password: 'Pranav@9890' }}
          onSubmit={(values) => {
            console.log(values);
            login(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <View>
                <Text style = {styles.label}>Email: </Text>
                <TextInput
                  placeholder="Email or UserName"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style = {styles.field}
                />
              </View>

              <View>
                <Text style = {styles.label}>Password: </Text>
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style = {styles.field}
                />
              </View>

              <Button title="Login" onPress={handleSubmit} />
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

  }
})