import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ContentLayoutView } from '@/components/ContentLayoutView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from '@/constants/Routes';
import { clearTransfer } from '@/store/slices/transferSlice';
import { convertCurrencyValue } from '@/utils/currencyFormatter';
import React, { useCallback, useEffect } from 'react';
import { selectUser } from '@/store/slices/transactionsSlice';
import dayjs from 'dayjs';
import { useFetchTransactionDetailsQuery } from '@/store/api/transactionApi';

export default function SuccessScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { transactionId } = useLocalSearchParams();
  // Handle case where transactionId might be an array
  const id = Array.isArray(transactionId) ? transactionId[0] : transactionId;

  const {
    data: transaction,
    isLoading,
    error,
  } = useFetchTransactionDetailsQuery(
    {
      transactionId: id,
      transactions: user.transactions,
    },
    { skip: !id },
  );

  // Handle error state
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        Alert.alert(
          'Error',
          'There was an issue fetching transaction details. You will be redirected to the home screen.',
          [
            {
              text: 'OK',
              onPress: () => router.push(Routes.tabs),
            },
          ],
        );
      }

      // Handle case when transaction is not found
      if (!transaction) {
        Alert.alert(
          'Transaction Not Found',
          'The transaction you are looking for does not exist.',
          [
            {
              text: 'OK',
              onPress: () => router.push(Routes.tabs),
            },
          ],
        );
      }
    }
  }, [error, transaction, router, isLoading]);

  const backToHome = useCallback(() => {
    dispatch(clearTransfer()); // Clear transfer details
    router.push({
      pathname: Routes.tabs,
    });
  }, [dispatch, router]);

  if (isLoading) {
    return (
      <ContentLayoutView>
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" />
        </View>
      </ContentLayoutView>
    );
  }

  return (
    <ContentLayoutView>
      <View style={styles.container}>
        <View style={styles.successWrapper}>
          <View style={styles.checkMarkIconWrapper}>
            <IconSymbol name="checkmark" size={40} weight="medium" color={Colors.success} />
          </View>
        </View>
        <View>
          <View style={styles.transactionAmountWrapper}>
            <Text style={styles.successText}>Transfer Successful</Text>
            <Text style={styles.successTextAmount}>
              RM {convertCurrencyValue(transaction?.amount ? transaction?.amount.toFixed(2) : '0')}
            </Text>
          </View>
          <View style={styles.transactionDetailsWrapper}>
            <Text style={styles.transactionRef}>Ref: {transaction?._id}</Text>
            <View style={styles.horizontalDivider} />
            <Text style={styles.transactionTime}>
              {dayjs(transaction?.createdAt).format('DD MMM YYYY, hh:mm A')}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.transferDetailsWrapper}>
          <View style={styles.receiverContainer}>
            <Image
              source={require('@/assets/images/duitnowlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.receiverInfoWrapper}>
              {transaction?.receiverName && (
                <Text style={styles.receiverName}>{transaction.receiverName}</Text>
              )}
              {transaction?.receiverPhone && (
                <Text style={styles.phoneNumber}>{transaction.receiverPhone}</Text>
              )}
            </View>
          </View>
          {transaction?.notes && (
            <View>
              <Text style={styles.label}>Notes:</Text>
              <Text style={styles.value}>{transaction?.notes}</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.homeBtn} onPress={backToHome} disabled={isLoading}>
        <Text style={styles.homeText}>Back to Home</Text>
      </TouchableOpacity>
    </ContentLayoutView>
  );
}

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  successWrapper: {
    marginBottom: 20,
  },
  successImage: {
    width: 200,
    height: 100,
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  successTextAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5E72E4',
  },
  transactionAmountWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionDetailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 12,
  },
  transactionRef: {
    fontSize: 12,
  },
  horizontalDivider: {
    width: 1,
    height: 10,
    backgroundColor: '#ccc',
    marginHorizontal: 2,
  },
  transactionTime: {
    fontSize: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  transferDetailsWrapper: {
    gap: 16,
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
  checkMarkIconWrapper: {
    color: Colors.success,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: Colors.success,
    padding: 16,
    elevation: 5,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
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
  homeBtn: {
    backgroundColor: '#5E72E4',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
  },
  homeText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#fff',
    textTransform: 'uppercase',
  },
});
