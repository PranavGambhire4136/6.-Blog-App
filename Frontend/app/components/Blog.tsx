import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Formik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BlogProps {
  blogId: string;
}

interface BlogComment {
  id: number;
  content: string;
  user: string;
  createdAt: string;
}

interface BlogData {
  _id: string;
  title: string;
  body: string;
  image: string;
  author: string;
  comment: BlogComment[];
}

export default function Blog({ blogId }: BlogProps) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isDisliked, setIsDisliked] = React.useState(false);
  const [blog, setBlog] = React.useState<BlogData | null>(null);
  const router = useRouter();
  const [comments, setComments] = React.useState<BlogComment[]>([]);

  const getBlog = async () => {
    try {
      console.log("Fetching blog...");
      const id = blogId;
      const res = await axios.get(`http://192.168.31.65:4000/api/vi/post/getSinglePost/${id}`);
      setBlog(res.data.post);
      console.log("comments", res.data.post.comments);
    } catch (error) {
      console.error("Error fetching blog:", error);
      router.back();
    }
  }

  const addComment = async (values) => {
    try {
      const tokenData = await AsyncStorage.getItem('token');
      if (!tokenData) {
        console.warn("Token not found");
        return;
      }
  
      const { token, time } = JSON.parse(tokenData);
      const currentTime = Date.now();
  
      // Check if 5 minutes (5 * 60 * 1000 milliseconds) are over
      if (currentTime - time > 5 * 60 * 1000) {
        await AsyncStorage.removeItem('token');
        console.warn("Token expired");
        return;
      }
  
      console.log("Comment:", values.comment);
      const datatosend = {
        content: values.comment,
      };
  
      const res = await axios.post(
        `http://192.168.31.65:4000/api/vi/comment/add/${blogId}`, 
        datatosend, 
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token}`, // Attach token in Cookie
          },
          withCredentials: true, // Attach cookie properly
        }
      );
  
      console.log("Comment Added:", res.data);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  

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

  // Function to format the date into Indian date format (DD MMM YYYY, hh:mm AM/PM)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // For AM/PM format
    };
    return new Intl.DateTimeFormat('en-IN', options).format(date);  // en-IN is the locale for India
  };

  useEffect(() => {
    getBlog();
  }, [blogId]);



  if (!blog) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {/* <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity> */}
          <Text style={styles.title}>{blog.title}</Text>
          <View style={styles.userContainer}>
            <TouchableOpacity
              onPress={() => router.push(`/Profile/${blog?.author._id}`)}
            >
              <Text style={styles.authorLink}>{blog.author.username}</Text>
            </TouchableOpacity>
            <Text style={styles.date}>{formatDate(blog.createdAt)}</Text>
          </View>
          <View style={styles.interactionContainer}>
            <View style={styles.likeContainer}>
              <TouchableOpacity onPress={handleLike}>
                {!isLiked ?
                  <AntDesign name="like2" size={20} color="black" /> :
                  <AntDesign name="like1" size={20} color="black" />}
              </TouchableOpacity>
              <Text style={styles.interactionCount}>1000</Text>
            </View>
            <View style={styles.likeContainer}>
              <TouchableOpacity onPress={handleDislike}>
                {!isDisliked ?
                  <AntDesign name="dislike2" size={20} color="black" /> :
                  <AntDesign name="dislike1" size={20} color="black" />}
              </TouchableOpacity>
              <Text style={styles.interactionCount}>1000</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.divider} />
        </View>

        <View>
          <Image source={{ uri: blog.image }} style={styles.image} />
          <Text style={styles.blogContent}>{blog.body}</Text>
          <View style={styles.divider} />
          <View style={styles.divider} />
        </View>

        <View>
          <Text style={styles.sectionTitle}>Comments</Text>

          <Formik
            initialValues={{ comment: '' }}
            onSubmit={(values, { resetForm }) => {
              addComment(values);
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
                  <Ionicons name="send" size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          <View>
            {/* Reverse the comments array to show latest first */}
            {blog.comments.reverse().map((comment: BlogComment, index: number) => (
              <View key={index} style={styles.commentContainer}>
                <TouchableOpacity onPress={() => router.push(`/Profile/${comment.user._id}`)}>
                  <Text style={styles.commentUser}>{comment.user.username}</Text>
                </TouchableOpacity>
                <Text style={styles.commentDate}>
                  {formatDate(comment.createdAt)} {/* Indian Date format */}
                </Text>
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
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20
  }
});
