import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BlogList from '../components/BlogList';

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
  const [refreshing, setRefreshing] = useState(false);

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
      
      // Check if this is the user's own profile
      const currentUser = await AsyncStorage.getItem('userId');
      setIsOwnProfile(currentUser === id);

      // Fetch user's posts
      const postsRes = await axios.post(`http://192.168.31.65:4000/api/vi/post/getUserPost/${id}`);
      setUserPosts(postsRes.data.posts);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleFollow = async () => {
    try {
      const tokenData = await AsyncStorage.getItem('token');
      if (!tokenData) {
        router.replace('/Login');
        return;
      }

      const { token } = JSON.parse(tokenData);
      await axios.post(
        `http://192.168.31.65:4000/api/vi/follow/${id}`,
        {},
        {
          headers: {
            Cookie: `token=${token}`,
          },
          withCredentials: true,
        }
      );

      // Refresh profile data
      fetchProfile();
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchProfile().finally(() => setRefreshing(false));
  }, []);

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
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{profile.username}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userPosts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.followers.length}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.following.length}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {!isOwnProfile && (
          <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
            <Text style={styles.followButtonText}>
              {profile.followers.includes(id) ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Posts</Text>
        <BlogList blogs={userPosts} />
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
