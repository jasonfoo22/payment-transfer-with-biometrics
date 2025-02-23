import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ContentLayoutView } from '@/components/ContentLayoutView';
import { HeaderWithBackBtn } from '@/components/HeaderWithBackBtn';
import { Routes } from '@/constants/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransferDetail, setTransferAmount } from '@/store/slices/transferSlice';
import { selectUser } from '@/store/slices/transactionsSlice';

export default function SendMoneyScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const transferDetail = useSelector(selectTransferDetail);
  const user = useSelector(selectUser);

  if (!transferDetail) {
    Alert.alert(
      'Missing Recipient',
      'We need recipient details to proceed. Please go back and try again.',
      [{ text: 'OK', onPress: () => router.back() }],
    );
    return null;
  }

  // Ensure name and phone are always strings
  const receiverName = transferDetail?.recipient?.name ?? '';
  const phoneNumber = transferDetail?.recipient?.phone ?? '';

  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<{ amount?: string }>({});

  // Handle Submit Money
  const handleSendMoney = () => {
    let errors: { amount?: string } = {};
    if (!amount) errors.amount = 'Amount is required';

    setError(errors);
    if (Object.keys(errors).length > 0) return;

    // router.push({
    //   pathname: Routes.transfer.confirmation,
    //   params: { name: receiverName, phone: phoneNumber, amount, notes },
    // });

    // Store amount and notes in Redux
    dispatch(setTransferAmount({ amount, notes }));

    // Navigate to confirmation screen
    router.push(Routes.transfer.confirmation);
  };

  const handleAmountChange = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
    setAmount((numericValue / 100).toFixed(2));
  };

  return (
    <ContentLayoutView>
      <HeaderWithBackBtn
        customTitle={
          <View style={styles.receiverContainer}>
            <Image
              source={require('@/assets/images/duitnowlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.receiverInfoWrapper}>
              <Text style={styles.receiverName}>{receiverName}</Text>
              <Text style={styles.phoneNumber}>{phoneNumber}</Text>
            </View>
          </View>
        }
      />
      <View style={styles.formContainer}>
        <View>
          <View style={styles.transactionDetailsContainer}>
            <View>
              <View style={styles.amountInputWrapper}>
                <Text style={styles.amountCurrencyText}>RM</Text>
                <TextInput
                  style={[styles.amountInput, error.amount && styles.inputError]}
                  placeholder="0.00"
                  keyboardType="numeric"
                  inputMode="decimal"
                  value={amount}
                  onChangeText={handleAmountChange}
                  maxLength={10}
                  returnKeyType="done"
                  autoFocus
                />
              </View>
              {error.amount && <Text style={styles.errorText}>{error.amount}</Text>}
              <View style={styles.balanceAmountWrapper}>
                <Text style={styles.balanceAmount}>Balance: RM{user?.balance.toFixed(2)}</Text>
              </View>
            </View>

            <View>
              <TextInput
                style={styles.notesInput}
                placeholder="Optional notes"
                value={notes}
                onChangeText={setNotes}
                multiline
                maxLength={100}
                numberOfLines={3}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={handleSendMoney}>
          <Text style={styles.sendButtonText}>Send Money</Text>
        </TouchableOpacity>
      </View>
    </ContentLayoutView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10,
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
  transactionDetailsContainer: {
    marginBottom: 20,
    gap: 16,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amountCurrencyText: {
    fontSize: 32,
  },
  amountInput: {
    paddingVertical: 10,
    fontSize: 32,
    fontWeight: 'bold',
    elevation: 2,
    outline: 'none',
  },
  balanceAmountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceAmount: {
    fontSize: 14,
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 2,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
  },
  sendButton: {
    backgroundColor: '#5E72E4',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
});
