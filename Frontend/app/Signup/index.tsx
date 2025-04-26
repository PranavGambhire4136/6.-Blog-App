import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import axios from 'axios';
import { Formik } from 'formik';
import { useNavigation } from 'expo-router';

export default function Signup() {


  const navigation = useNavigation();

  const [otpSend, setOtpSend] = React.useState(false);
  const [useButton, setUseButton] = React.useState(true);


  const verifyEmail = async (values) => {
    try {
      console.log(values);
      setUseButton(false);
      const res = await axios.post("http://192.168.31.65:4000/api/vi/user/singUpInit", values);

      setUseButton(true);
      console.log(res.data);

      if (res.data.success) {
        setOtpSend(true);
      }
    } catch (error) {
      setUseButton(true);
      console.error("Verify Email Error:", error.response?.data || error.message);
    }
  }

  return (

    <View style={styles.container}>
      <Text style={styles.heading}>SignUp</Text>
      <View style={styles.form}>
        <Formik
          initialValues={{ email: 'pranavgambhire9890@gmail.com', username: 'Pranav1', otp: "", password: 'Pranav@9890', confirmPassword: 'Pranav@9890' }}
          onSubmit={async (values) => {
            // console.log("askgh");
            try {
              console.log(values);
              setUseButton(false);
              const res = await axios.post("http://192.168.31.65:4000/api/vi/user/verifyOtp", values);


              setUseButton(true);

              console.log(res.data);

              if (res.data.success) {
                console.log('user signUp Successfully');
                navigation.navigate('index');
              }
            } catch (error) {
              setUseButton(true);
              console.error("Error occurred during login:", error.response?.data || error.response?.data?.message);
            }


          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>

              <View>
                <Text style={styles.label}>UserName: </Text>
                <TextInput
                  placeholder="UserName"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('password')}
                  value={values.username}
                  style={styles.field}
                />
              </View>

              <View>
                <Text style={styles.label}>Email: </Text>
                <TextInput
                  placeholder="Email"
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
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.field}
                  secureTextEntry
                />
              </View>

              <View>
                <Text style={styles.label}>Confirm Password: </Text>
                <TextInput
                  placeholder="Confirm Password"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  style={styles.field}
                  secureTextEntry
                />

                <View>
                  {!otpSend &&

                    <View>
                      <TouchableOpacity
                        onPress={() => verifyEmail(values)}
                        disabled={!useButton} 
                        style={[
                          styles.button,
                          { backgroundColor: !useButton ? "#566c71" : "#007AFF" }
                        ]}
                      >
                        <Text style={styles.buttonText}>Get OTP</Text>
                      </TouchableOpacity>
                    </View>

                  }
                </View>
              </View>

              <View style={[{ marginTop: 30 }]}>
                {otpSend &&

                  <View>

                    <View>
                      <Text style={styles.label}>OTP: </Text>
                      <TextInput
                        placeholder="OTP"
                        onChangeText={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        value={values.otp}
                        style={styles.field}
                        keyboardType="numeric"
                        inputMode="numeric"
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      style={[
                        styles.button,
                        { backgroundColor: !useButton ? "#566c71" : "#007AFF" }
                      ]}
                      disabled={!useButton}
                    >
                      <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>

                }
              </View>

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
    // backgroundColor: "#889fa5",
    padding: 15,
    height: 'auto',
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
    // backgroundColor: '#7b92a1'
    backgroundColor: '#b0edf6'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})