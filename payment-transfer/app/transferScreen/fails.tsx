import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ContentLayoutView } from '@/components/ContentLayoutView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useDispatch } from 'react-redux';
import { Routes } from '@/constants/Routes';
import { clearTransfer } from '@/store/slices/transferSlice';
import React, { useCallback } from 'react';

export default function Fails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error } = useLocalSearchParams();
  const errorMessage = Array.isArray(error) ? error[0] : error;

  const backToHome = useCallback(() => {
    dispatch(clearTransfer());
    router.push({
      pathname: Routes.tabs,
    });
  }, [dispatch, router]);

  return (
    <ContentLayoutView>
      <View style={styles.container}>
        <View style={styles.failureWrapper}>
          <View style={styles.errorIconWrapper}>
            <IconSymbol name="xmark" size={40} weight="medium" color={Colors.warning} />
          </View>
        </View>
        <View>
          <View style={styles.transactionAmountWrapper}>
            <Text style={styles.failureText}>Transfer Failed</Text>
          </View>
          <View style={styles.transactionDetailsWrapper}>
            <Text style={styles.transactionRef}>{errorMessage}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.homeBtn} onPress={backToHome}>
          <Text style={styles.homeText}>Back to Home</Text>
        </TouchableOpacity>
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
  failureWrapper: {
    marginBottom: 20,
  },
  errorIconWrapper: {
    color: Colors.warning,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: Colors.warning,
    padding: 16,
    elevation: 5,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  },
  failureText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.warning,
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
    fontSize: 14,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  homeBtn: {
    backgroundColor: Colors.warning,
    padding: 16,
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
