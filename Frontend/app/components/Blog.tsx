import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Formik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

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

  const getBlog = async () => {
    try {
      const res = await axios.get("http://192.168.31.65:4000/api/vi/post/getAllPost");

      console.log(res.data);
    } catch (error) {
      
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
    <View style={styles.container}>
      <ScrollView>
        {/* header */}
        <View>
          <Text style={styles.title}>{blog.title}</Text>
          <View style={styles.userContainer}>
            <TouchableOpacity>
              <Text style={styles.authorLink}>{blog.author}</Text>
            </TouchableOpacity>
            <Text style={styles.date}>date</Text>
          </View>
          <View style={styles.interactionContainer}>
            <View style={styles.likeContainer}>
              <TouchableOpacity onPress={handleLike}>
                {!isLiked ? 
                  <AntDesign name="like2" size={20} color="black"/> : 
                  <AntDesign name="like1" size={20} color="black"/>
                }
              </TouchableOpacity>
              <Text style={styles.interactionCount}>1000</Text>
            </View>
            <View style={styles.likeContainer}>
              <TouchableOpacity onPress={handleDislike}>
                {!isDisliked ? 
                  <AntDesign name="dislike2" size={20} color="black" /> : 
                  <AntDesign name="dislike1" size={20} color="black" />
                }
              </TouchableOpacity>
              <Text style={styles.interactionCount}>1000</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.divider} />
        </View>

        {/* Blog */}
        <View>
          <Image source={{ uri: blog.image }} style={styles.image} />
          <Text style={styles.blogContent}>{blog.body}</Text>
          <View style={styles.divider} />
          <View style={styles.divider} />
        </View>

        {/* comments */}
        <View>
          <Text style={styles.sectionTitle}>Comments</Text>

          <Formik
            initialValues={{ comment: '' }}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              resetForm();
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.commentInputContainer}>
                <TextInput
                  placeholder="Add a comment"
                  style={styles.commentInput}
                  onChangeText={handleChange('comment')}
                  onBlur={handleBlur('comment')}
                  value={values.comment}
                />
                <TouchableOpacity 
                  onPress={() => handleSubmit()}
                  style={styles.sendButton}
                >
                  <Ionicons name="send" size={20} color="white"/>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          <View>
            {blog.comment.map((comment, index) => (
              <View key={index} style={styles.commentContainer}>
                <TouchableOpacity>
                  <Text style={styles.commentUser}>{comment.user}</Text>
                </TouchableOpacity>
                <Text style={styles.commentDate}>{comment.createdAt}</Text>
                <View style={styles.commentContent}>
                  <Text style={styles.commentText}>{comment.content}</Text>
                </View>
              </View>
            ))}
          </View>
          
          <View style={styles.divider} />
          <View style={styles.divider} />
          
          <View style={styles.thankYouContainer}>
            <Text style={styles.thankYouText}>Thank You for reading the article</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10
  },
  authorLink: {
    color: 'blue'
  },
  date: {
    marginLeft: 10
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
    marginBottom: 20
  },
  likeContainer: {
    flexDirection: 'row',
    marginRight: 20
  },
  interactionCount: {
    marginLeft: 5,
    fontSize: 16
  },
  divider: {
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 2
  },
  image: {
    marginBottom: 20,
    borderRadius: 20,
    width: "100%",
    height: 200,
    marginTop: 20
  },
  blogContent: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0
  },
  commentInputContainer: {
    flexDirection: 'row'
  },
  commentInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10
  },
  sendButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 50,
    marginLeft: 5,
    height: 40,
    justifyContent: 'center'
  },
  commentContainer: {
    marginBottom: 20,
    borderLeftWidth: 2,
    borderLeftColor: '#4b4a54',
    paddingLeft: 10
  },
  commentUser: {
    color: 'blue'
  },
  commentDate: {
    fontWeight: '300',
    fontSize: 12
  },
  commentContent: {
    marginLeft: 20,
    marginTop: 5,
    flexDirection: 'column'
  },
  commentText: {
    fontSize: 14,
    marginBottom: 3
  },
  thankYouContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  thankYouText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20,
    color: 'blue'
  }
});