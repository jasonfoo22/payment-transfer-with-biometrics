import { View, Image, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Routes } from '@/constants/Routes';

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      // Simulate authentication check (login or tabs)

      router.replace(Routes.tabs); // Redirect to main tabs if logged in
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/rytLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Banking Done Right</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2314e6', // Blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
});
