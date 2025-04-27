import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import Blog from './Blog';

interface BlogListProps {
  blog: {
    _id: string;
    title: string;
    body: string;
    image: string;
  };
}

const BlogList: React.FC<BlogListProps> = ({ blog }) => {
    const router = useRouter();
    const [data, setData] = React.useState({
        title: blog.title,
        body: blog.body.slice(0, 200) + "..."
    });

    const handlePress = () => {
      console.log("pressed");
      router.push({
        pathname: "/blog/[id]",
        params: { id: blog._id }
      });
    }

    return (
        <TouchableOpacity 
          style={styles.container}
          onPress={() => handlePress()}
        >
            <Image
              source={{ uri: blog.image }}
              style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{blog.title}</Text>
                <Text style={styles.body} numberOfLines={2}>
                  {data.body}
                </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    margin: 20,
    borderLeftColor: '#4b4a54',
    borderLeftWidth: 2,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 10
  },
  content: {
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 0
  },
  body: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
    fontWeight: "300"
  }
});

export default BlogList;