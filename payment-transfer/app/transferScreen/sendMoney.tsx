import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ContentLayoutView } from '@/components/ContentLayoutView';
import { HeaderWithBackBtn } from '@/components/HeaderWithBackBtn';
import { Routes } from '@/constants/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransferDetail, setTransferAmount } from '@/store/slices/transferSlice';
import { Colors } from '@/constants/Colors';
import { convertCurrencyValue } from '@/utils/currencyFormatter';
import { selectUser } from '@/store/slices/userSlice';
import { PaymentTypeDetails } from '@/components/PaymentTypeDetails';
import { Button } from '@/components/Button';

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

  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<{ amount?: string }>({});

  // Handle Submit Money
  const handleSendMoney = () => {
    let errors: { amount?: string } = {};
    if (!amount) errors.amount = 'Amount is required';

    setError(errors);
    if (Object.keys(errors).length > 0) return;
    dispatch(setTransferAmount({ amount, notes }));
    // Navigate to confirmation screen
    router.push(Routes.transfer.confirmation);
  };

  const handleAmountChange = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
    const amountInCurrencyFormat = (numericValue / 100).toFixed(2);
    const amountAsNumber = parseFloat(amountInCurrencyFormat);

    if (amountAsNumber > user?.balance) {
      setError(prev => ({ ...prev, amount: 'Amount exceeds available balance' }));
    } else {
      setError(prev => ({ ...prev, amount: undefined }));
    }
    setAmount(amountInCurrencyFormat);
  };

  return (
    <ContentLayoutView>
      <HeaderWithBackBtn
        customTitle={
          <PaymentTypeDetails
            name={transferDetail?.recipient?.name}
            phone={transferDetail?.recipient?.phone}
          />
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
                  value={convertCurrencyValue(amount)}
                  onChangeText={handleAmountChange}
                  maxLength={14}
                  returnKeyType="done"
                  autoFocus
                />
              </View>
              {error.amount && <Text style={styles.errorText}>{error.amount}</Text>}
              <View style={styles.balanceAmountWrapper}>
                <Text style={styles.balanceAmount}>
                  Balance: RM{convertCurrencyValue(user?.balance.toFixed(2))}
                </Text>
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
        <Button
          title="Send Money"
          onPress={handleSendMoney}
          disabled={!amount || parseFloat(amount) === 0 || !!error.amount}
          textStyle={styles.sendButtonText}
        />
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
    fontSize: 32,
    fontWeight: 'bold',
    elevation: 2,
    borderColor: 'transparent',
    width: '100%',
  },
  balanceAmountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  balanceAmount: {
    fontSize: 14,
    color: '#333',
  },
  inputError: {
    borderColor: Colors.warning,
  },
  errorText: {
    color: Colors.warning,
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
  sendButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
