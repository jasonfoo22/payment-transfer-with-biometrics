import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { ContentLayoutView } from '@/components/ContentLayoutView';
import { HeaderWithBackBtn } from '@/components/HeaderWithBackBtn';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '@/store/slices/transactionsSlice';
import { Routes } from '@/constants/Routes';
import { selectTransferDetail } from '@/store/slices/transferSlice';
import { Colors } from '@/constants/Colors';
import { convertCurrencyValue } from '@/utils/currencyFormatter';
import { useCreateTransactionMutation } from '@/store/api/transactionApi';
import * as Network from 'expo-network';
import { selectUser, updateUserBalance } from '@/store/slices/userSlice';
import { Transaction, TransactionType } from '@/interface/transaction';
import { PaymentTypeDetails } from '@/components/PaymentTypeDetails';
import { Button } from '@/components/Button';

const calculateNewBalance = (transaction: Transaction, currentBalance: number) => {
  let newBalance = currentBalance;

  switch (transaction.type) {
    case TransactionType.SEND_MONEY:
      newBalance -= transaction.amount;
      break;
    case TransactionType.RECEIVE_MONEY:
    case TransactionType.TOP_UP:
      newBalance += transaction.amount;
      break;
    case TransactionType.PAY_BILLS:
      newBalance -= transaction.amount;
      break;
    default:
      break;
  }

  return newBalance.toFixed(2);
};

export default function Confirmation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { recipient, amount, notes } = useSelector(selectTransferDetail);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  useEffect(() => {
    if (transactionComplete) {
      return;
    }
    if (timeLeft <= 0) {
      router.back();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, transactionComplete]);

  const handleApprove = async () => {
    const networkState = await Network.getNetworkStateAsync();

    if (!networkState.isConnected || !networkState.isInternetReachable) {
      Alert.alert('No Internet', 'Please check your network connection and try again.');
      return;
    }

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

  const completeTransaction = async () => {
    setTransactionComplete(true);

    try {
      const transaction = await createTransaction({
        recipient,
        amount,
        notes,
      }).unwrap();

      dispatch(addTransaction(transaction)); // should happen on backend and frontend just retrieve update
      const newBalance = calculateNewBalance(transaction, user.balance);
      dispatch(updateUserBalance(parseFloat(newBalance))); // should happen on backend and frontend just retrieve update
      router.replace({
        pathname: Routes.transfer.success,
        params: { transactionId: transaction._id },
      });
    } catch (error: any) {
      const errorMessage = error || 'Something went wrong.';
      setTimeLeft(0);
      setTransactionComplete(false);
      router.replace({
        pathname: Routes.transfer.fails,
        params: { error: errorMessage },
      });
    }
  };

  return (
    <ContentLayoutView>
      <HeaderWithBackBtn title="Confirm Transaction" />
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Review your transfer</Text>
          <PaymentTypeDetails name={recipient?.name} phone={recipient?.phone} />
          <View>
            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.amount}>RM {convertCurrencyValue(amount)}</Text>
          </View>
          {notes && (
            <View>
              <Text style={styles.label}>Notes:</Text>
              <Text style={styles.value}>{notes}</Text>
            </View>
          )}
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Button
            title={`Approve (${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')})`}
            onPress={handleApprove}
            disabled={timeLeft === 0}
          />
        )}
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
});
