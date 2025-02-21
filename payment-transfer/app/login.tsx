import { Image, StyleSheet, Text, View } from 'react-native';

const featureList = [
  {
    title: 'Send Money',
    description: 'Send money to friends and family',
  },
  {
    title: 'Pay Bills',
    description: 'Pay your bills with ease',
  },
  {
    title: 'Pay Later',
    description: 'Enjoy the flexibility of paying later',
  },
];

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/rytLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <div>
        <Text style={styles.title}>Transfer Money</Text>
        <Text style={styles.title}>Transfer Money</Text>
      </div>
      <Text style={styles.title}>Banking Done Right</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2314e6',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    marginTop: '20%',
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
});
