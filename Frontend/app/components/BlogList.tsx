import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function BlogList({blog}) {

    // id: 1,
    //     title: "Blog 1",
    //     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",

    // console.log(blog);

    const [data, setData] = React.useState({
        title: blog.title,
        body: blog.body.slice(0, 200) + "..."
    });

    const filterData = () => {
        
    }
    return (
        <View style={{padding: 10, margin: 20, borderLeftColor: '#4b4a54', borderLeftWidth: 2, marginBottom: 30}}>
            <View>
                <Text style={{marginBottom: 5, fontWeight: "600"}}>{blog.title}</Text>
                <Image source={{uri: blog.image}} style={{width: "100%", height: 200, borderRadius: 20, marginBottom: 10}} />
                <Text style={{marginBottom: 10, fontWeight: "300", fontSize: 15}}>{data.body}</Text>

                {/* <View style={{height: 1, backgroundColor: "black", marginBottom: 3}}></View>
                <View style={{height: 1, backgroundColor: "black"}}></View> */}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({})