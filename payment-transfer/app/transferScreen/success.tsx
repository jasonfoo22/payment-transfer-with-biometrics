import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ContentLayoutView } from '@/components/ContentLayoutView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';

export default function SuccessScreen() {
  const router = useRouter();
  const { name, phone, amount } = useLocalSearchParams<{
    name: string;
    phone: string;
    amount: string;
  }>();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.replace('/'); // Navigate back to home or another relevant screen
  //   }, 3000);
  //
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <ContentLayoutView>
      <View style={styles.container}>
        <View style={styles.container}>
          <IconSymbol name="checkmark" size={18} weight="medium" />

          {/*<Image source={require('@/assets/images/rytBlueLogo.png')} style={styles.successImage} />*/}
        </View>
        <Text style={styles.successText}>Transaction Successful!</Text>
        <Text style={styles.amount}>RM 28.80</Text>
        <Text style={styles.details}>Jason Foo (01116558920)</Text>
        <Text style={styles.info}>Redirecting to home...</Text>
      </View>
    </ContentLayoutView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  successImage: {
    width: 200,
    height: 100,
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  amount: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 18,
    color: '#666',
  },
  info: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 10,
  },
});
