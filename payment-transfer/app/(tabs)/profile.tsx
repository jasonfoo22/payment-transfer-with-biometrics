import { StyleSheet, Image } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Profile() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.profileImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Jason Foo</ThemedText>
      </ThemedView>
      <ThemedText type="subtitle">Software Engineer | Coffee Enthusiast</ThemedText>
      <ThemedText style={styles.bio}>
        Passionate about React, TypeScript, and building great user experiences. When I'm not
        coding, you can find me enjoying a good cup of coffee or exploring new tech trends.
      </ThemedText>

      <ThemedText type="subtitle">Contact</ThemedText>
      <ThemedText>Email: foophiawsheng22@gmail.com</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    alignSelf: 'center',
  },
  titleContainer: {
    marginBottom: 8,
  },
  bio: {
    marginBottom: 20,
  },
});
