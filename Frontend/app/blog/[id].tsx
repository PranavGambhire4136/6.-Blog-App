import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Blog from '../components/Blog';

export default function BlogDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Blog blogId={id as string} />
    </View>
  );
}