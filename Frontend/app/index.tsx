import { Text, View, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function Index() {
  const router = useRouter();
  const navigation = useNavigation();

  const LogOut = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      console.log('No token found');
      return;
    }
    console.log("token",token);
    
    const res = await axios.get("http://192.168.31.65:4000/api/vi/user/logout",
      {
        headers: {
          Cookie: `token=${token}` // The critical part
        },
        withCredentials: true // Ensures cookies are properly attached
      }
    )

    await AsyncStorage.removeItem('token');

    console.log("logOut success",res.data);
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>|| Shree Ganeshya Namah ||</Text>
      <Button title="Go to Signup" onPress={() => router.push("/Signup")} />
      <Button title="Go to Login" onPress={() => router.push("/Login")} />
      <Button title = "Logout" onPress={LogOut}/>
    </View>
  );
}
  