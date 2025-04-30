import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Blog from '../components/Blog';
import { Stack } from 'expo-router';

export default function BlogDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Blog blogId={id as string} />
    </View>
  );
}