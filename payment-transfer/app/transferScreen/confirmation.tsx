import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ContentLayoutView } from '@/components/ContentLayoutView';
import { HeaderWithBackBtn } from '@/components/HeaderWithBackBtn';

export default function Confirmation() {
  const router = useRouter();
  const { name, phone, amount, notes } = useLocalSearchParams<{
    name: string;
    phone: string;
    amount: string;
    notes?: string;
  }>();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

  useEffect(() => {
    if (timeLeft <= 0) {
      router.back();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleApprove = async () => {
    const hasBiometrics = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasBiometrics || !isEnrolled) {
      return fallbackAuthentication();
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to confirm transfer',
      fallbackLabel: 'Use PIN',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false, // Allow fallback to passcode if biometrics fails
    });

    if (result.success) {
      completeTransaction();
    } else {
      Alert.alert('Authentication Failed', 'Transaction was not approved.');
    }
  };

  const fallbackAuthentication = () => {
    Alert.alert(
      'Biometric Unavailable',
      'Your device does not support biometric authentication. Please enter your PIN.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Enter PIN', onPress: () => completeTransaction() },
      ],
    );
  };

  const completeTransaction = () => {
    router.push({
      pathname: '/transferScreen/success',
      params: { name, phone, amount },
    });
  };

  return (
    <ContentLayoutView>
      <HeaderWithBackBtn title="Confirm Transaction" />
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Review your transfer</Text>
          <View style={styles.receiverContainer}>
            <Image
              source={require('@/assets/images/duitnowlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.receiverInfoWrapper}>
              <Text style={styles.receiverName}>{name}</Text>
              <Text style={styles.phoneNumber}>{phone}</Text>
            </View>
          </View>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.amount}>RM {amount}</Text>

          {notes && (
            <View>
              <Text style={styles.label}>Notes:</Text>
              <Text style={styles.value}>{notes}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, timeLeft === 0 && styles.disabledButton]}
          onPress={handleApprove}
          disabled={timeLeft === 0}
        >
          <Text style={styles.buttonText}>
            Approve ({Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')})
          </Text>
        </TouchableOpacity>
      </View>
    </ContentLayoutView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
    gap: 20,
  },
  detailsContainer: {
    gap: 20,
  },
  receiverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiverInfoWrapper: {
    marginLeft: 10,
    gap: 4,
  },
  logo: {
    width: 45,
    height: 45,
  },
  receiverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  phoneNumber: {
    fontSize: 16,
    color: 'gray',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5E72E4',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5E72E4',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
});
