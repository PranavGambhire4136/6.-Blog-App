import { Button, ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import { StatusBar } from 'react-native';
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import SideBar from "./components/SideBar";
import axios from "axios";

export default function Index() {
  const [isSideBar, setIsSideBar] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  // const blogs = [
  //   {
  //     id: 1,
  //     title: "Blog 1",
  //     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  //     author: "John Doe"
  //   },
  //   {
  //     id: 2,
  //     title: "Blog 2",
  //     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  //     author: "John Doe"
  //   },
  //   {
  //     id: 3,
  //     title: "Blog 3",
  //     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  //     author: "John Doe"
  //   }
  // ]

  const [blogs, setBlogs] = useState([]);

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
    getBlog();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />

      <SideBar />

      {/* <Text style={styles.title}>Home</Text> */}
      <ScrollView style={styles.scrollView}>
        {blogs.map((blog) => <BlogList key={blog._id} blog={blog} />)}
      </ScrollView>

        {/* <Blog /> */}

      <TouchableOpacity 
        style={styles.signupButton}
        onPress={() => router.push("/Signup")}
      >
        <Text style={styles.buttonText}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16
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