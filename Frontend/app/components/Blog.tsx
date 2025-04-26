import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Formik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Blog() {

    const [isLiked, setIsLiked] = React.useState(false);
    const [isDisliked, setIsDisliked] = React.useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (isDisliked) {
            setIsDisliked(false);
        }
    }

    const handleDislike = () => {
        setIsDisliked(!isDisliked);
        if (isLiked) {
            setIsLiked(false);
        }
    }

    const blog = {
        id: 1,
        title: "Blog 1",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        author: "John Doe",
        comment: [
            {
                id: 1,
                content: "Hello World",
                user: "Pranav Gambhire", 
                createdAt: "2021-01-01"
            },
            {
                id: 2,
                content: "Hello World 2",
                user: "Pranav Gambhire 2", 
                createdAt: "2021-01-01"
            }
        ]
    }

    return (
        <View style={{ padding: 20, paddingBottom: 100 }}>

            <ScrollView >

                {/* header */}
                <View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>{blog.title}</Text>
                    <View style={styles.usercont}>
                        <TouchableOpacity >
                            <Text style={{ color: 'blue' }}>{blog.author}</Text>
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>date</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20, marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', marginRight: 20 }}>
                            <TouchableOpacity onPress={() => handleLike()}>
                                {!isLiked ? <AntDesign name="like2" size={20} color="black"/> : <AntDesign name="like1" size={20} color="black"/>}
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 5, fontSize: 16 }}>1000</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => handleDislike()}>
                                {!isDisliked ? <AntDesign name="dislike2" size={20} color="black" /> : <AntDesign name="dislike1" size={20} color="black" />}
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 5, fontSize: 16 }}>1000</Text>
                        </View>
                    </View>
                    <View style={{ borderColor: 'black', borderWidth: 0.5 }}></View>
                    <View style={{ borderColor: 'black', borderWidth: 0.5, marginTop: 2 }}></View>
                </View>

                {/* Blog */}
                <View>
                    <Image source={{ uri: blog.image }} style={styles.img} />
                    <Text style={{ fontSize: 16, fontWeight: '300', marginBottom: 20 }}>{blog.body}</Text>
                    <View style={{ borderColor: 'black', borderWidth: 0.5 }}></View>
                    <View style={{ borderColor: 'black', borderWidth: 0.5, marginTop: 2 }}></View>
                </View>

                {/* comments */}
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 0 }}>Comments</Text>

                    <Formik
                        initialValues={{ comment: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            values.comment = '';
                        }}

                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View style={{ flexDirection: 'row',}}>
                                <TextInput
                                    placeholder="Add a comment"
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%' }}
                                    onChangeText={handleChange('comment')}
                                    onBlur={handleBlur('comment')}
                                    value={values.comment}
                                />
                                <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 50, marginLeft: 5, height: 40 }}>
                                    <Ionicons name="send" size={20} color="white"/>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                    {/* <Text style={{ fontSize: 14, marginBottom: 5 }}>John: Great article</Text>
                    <Text style={{ fontSize: 14, marginBottom: 5 }}>Jane: Very informative. Thanks for sharing.</Text> */}

                    <View>
                        

                        {blog.comment.map((comment,index) => (
                            <View key={index} style = {{marginBottom: 20,
                                borderLeftWidth: 2, borderLeftColor: '#4b4a54', paddingLeft: 10

                            }}>
                                {/* <Text>Hello</Text> */}
                                <TouchableOpacity><Text style={{ color: 'blue'}}>{comment.user}</Text></TouchableOpacity>
                                <Text style={{ fontWeight: '300', fontSize: 12}}>{comment.createdAt}</Text>
                                <View style={{ marginLeft: 20, marginTop: 5, flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 14, marginBottom: 3 }}>{comment.content}</Text>
                                </View>
                            </View>
                        ))}

                    </View>
                    <View style={{ borderColor: 'black', borderWidth: 0.5 }}></View>
                    <View style={{ borderColor: 'black', borderWidth: 0.5, marginTop: 2 }}></View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>

                        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 20, color: 'blue'}}>Thank You for reading the article</Text>
                    </View>
                </View>


            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    usercont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 10
    },
    img: {
        marginBottom: 20,
        borderRadius: 20,
        width: "100%",
        height: 200,
        marginTop: 20,
    }
})