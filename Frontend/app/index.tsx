import { Button, ScrollView, Text, View } from "react-native";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import { StatusBar } from 'react-native';
import { useState } from "react";
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';

export default function Index() {

  const [isSideBar, setIsSideBar] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  const blogs = [
    {
        id: 1,
        title: "Blog 1",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        author: "John Doe"
    },
    {
        id: 2,
        title: "Blog 2",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        author: "John Doe"
    },
    {
        id: 3,
        title: "Blog 3",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        author: "John Doe"
    }
]

  return (
    <View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />

      {!isSideBar && (
        <View style={{position: "relative", top: 0, left: 0, zIndex: 1}}>
          <Octicons name="three-bars" size={24} color="black" onPress={() => setIsSideBar(true)} />
        </View>
      )}

      {isSideBar && (
        <View style={{position: "relative", top: 0, left: 0, zIndex: 1, width: "70%", height: "100%", backgroundColor: "#9adab9"}}>
          
        </View>
      )}

      <Text>Home</Text>
      {/* <Blog /> */}
      {/* <ScrollView>
        {blogs.map((blog) => <BlogList key={blog.id} blog={blog} />)} 
      </ScrollView> */}

        
      <Button title="Go to Signup" onPress={() => router.push("/Signup")} />
    </View>
  );
}
  