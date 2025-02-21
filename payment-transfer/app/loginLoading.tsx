import { View, Image, StyleSheet, Text } from 'react-native';

export default function LoadingScreen() {
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
