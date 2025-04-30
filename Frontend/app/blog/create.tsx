import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';

export default function CreateBlog() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !image) {
      Alert.alert('Error', 'Please fill all fields and add an image');
      return;
    }

    setIsLoading(true);

    try {
      const tokenData = await AsyncStorage.getItem('token');
      if (!tokenData) {
        router.replace('/Login');
        return;
      }

      const { token } = JSON.parse(tokenData);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', content);
      formData.append('img', {
        uri: image,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
      


      await axios.post(
        'http://192.168.31.65:4000/api/vi/post/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Cookie: `token=${token}`,
          },
          withCredentials: true,
        }
      );

      Alert.alert('Success', 'Blog post created successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error creating blog:', error);
      Alert.alert('Error', 'Failed to create blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create New Blog</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.titleInput}
            placeholder="Blog Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#666"
          />

          <TextInput
            style={styles.contentInput}
            placeholder="Write your blog content..."
            value={content}
            onChangeText={setContent}
            multiline
            placeholderTextColor="#666"
          />

          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>
              {image ? 'Change Image' : 'Add Cover Image'}
            </Text>
          </TouchableOpacity>

          {image && (
            <Image source={{ uri: image }} style={styles.previewImage} />
          )}

          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Creating...' : 'Create Blog'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  titleInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  contentInput: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 16,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
