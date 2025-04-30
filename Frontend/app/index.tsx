import { Button, ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import { StatusBar } from 'react-native';
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SideBar from "./components/SideBar";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { jwtDecode } from 'jwt-decode';
import { Stack } from 'expo-router';

export default function Index() {
  const [isSideBar, setIsSideBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  const [blogs, setBlogs] = useState([]);

  const checkAuthStatus = async () => {
    try {
      const tokenData = await AsyncStorage.getItem('token');
      if (!tokenData) {
        setIsLoggedIn(false);
        return;
      }

      const { token, expiresAt } = JSON.parse(tokenData);

      // Check if token has expired
      if (Date.now() > expiresAt) {
        await AsyncStorage.removeItem('token');
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);
    } catch (error) {
      console.error("Auth check error:", error);
      setIsLoggedIn(false);
      await AsyncStorage.removeItem('token');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const Profile = async () => {
    try {
      const tokenData = await AsyncStorage.getItem('token');
      if (!tokenData) {
        router.replace('/Login');
        return;
      }

      const parsedTokenData = JSON.parse(tokenData);
      const token = parsedTokenData.token;
      // console.log("token", token);

      // Decode the token
      const decoded = jwtDecode(token);
      // console.log(decoded.userId);
      router.push(`/Profile/${decoded.userId}`);
    } catch (error) {
      console.error("Profile error:", error);
    }
  }

  const getBlog = async () => {
    try {
      console.log("starting fetching")
      const res = await axios.post("http://192.168.31.65:4000/api/vi/post/getAllPost");
      console.log(res.data.posts);
      setBlogs(res.data.posts);
    } catch (error) {
      console.error("Get Blog Error:", error);
    }
  }

  useEffect(() => {
    checkAuthStatus();
    getBlog();
  }, []);

  // Add listener for when the component comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkAuthStatus();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.title}>Blog App</Text>
        {isLoggedIn && (
          // <View style={styles.headerButtons}>
          //   <TouchableOpacity 
          //     style={styles.iconButton}
          //     onPress={() => router.push('/blog/create')}
          //   >
          //     <MaterialIcons name="post-add" size={24} color="#34C759" />
          //   </TouchableOpacity>
          //   <TouchableOpacity 
          //     style={styles.iconButton}
          //     onPress={handleLogout}
          //   >
          //     <MaterialIcons name="logout" size={24} color="#FF3B30" />
          //   </TouchableOpacity>
          // </View>

          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => Profile()}
            >
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        {blogs.reverse().map((blog) => <BlogList key={blog._id} blog={blog} />)}
      </ScrollView>

      {!isLoggedIn && (
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => router.push("/Login")}
        >
          <Text style={styles.buttonText}>Login to Create Blog</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1
  },
  signupButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});