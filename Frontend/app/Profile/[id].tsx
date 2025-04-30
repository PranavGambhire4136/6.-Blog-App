import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BlogList from '../components/BlogList';
import {jwtDecode} from 'jwt-decode';
import { Stack } from 'expo-router';

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  followers: string[];
  following: string[];
}

export default function Profile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);


  const fetchProfile = async () => {
    try {
      const tokenData = await AsyncStorage.getItem('token');
      if (!tokenData) {
        router.replace('/Login');
        return;
      }

      const { token } = JSON.parse(tokenData);
      const res = await axios.get(`http://192.168.31.65:4000/api/vi/user/profile/${id}`, {
        headers: {
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      });

      setProfile(res.data.user);
      setUserPosts(res.data.user.posts);

      const decoded = jwtDecode(token);

      if (decoded.userId == id) {
        setIsOwnProfile(true);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };


  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
          }}
          style={styles.profileImage}
        />

        <Text style={styles.username}>{profile.username}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userPosts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </View>

        {isOwnProfile && <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity
            style={[styles.followButton, { backgroundColor: '#34C759', marginRight: 10 }]}
            onPress={() => router.push('/blog/create')}
          >
            <Text style={styles.followButtonText}>Create New Blog</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.followButton, { backgroundColor: '#FF3B30' }]}
            onPress={async () => {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('userId');
              router.replace('/');
            }}
          >
            <Text style={styles.followButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>}

      </View>

      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Posts</Text>
        {/* <BlogList blogs={userPosts} /> */}
        {userPosts.map((post) => (
          <BlogList key={post._id} blog={post} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
