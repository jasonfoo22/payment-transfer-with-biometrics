import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';
import { ContentLayoutView } from '@/components/ContentLayoutView';
import { TransactionType } from '@/interface/transaction';
import { Colors } from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/transactionsSlice';
import { Routes } from '@/constants/Routes';

export default function HomeScreen() {
  const user = useSelector(selectUser);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  return (
    <ContentLayoutView>
      <View style={styles.headerContainer}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={styles.balance}>
              {isBalanceHidden ? '*****' : `RM${user?.balance.toFixed(2)}`}
            </Text>
            <TouchableOpacity onPress={() => setIsBalanceHidden(prev => !prev)}>
              <IconSymbol
                name={isBalanceHidden ? 'eye.slash' : 'eye'}
                size={24}
                color={Colors.light.icon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.desc}>Total Balance</Text>
        </View>
      </View>

      <View style={styles.ctaContainer}>
        <View style={styles.ctaBox}>
          <View style={styles.ctaItem}>
            <IconSymbol name="plus" size={24} color="black" />
            <Text style={styles.ctaText}>Add Money</Text>
          </View>
          <Link href={Routes.transfer.selectContact}>
            <View style={styles.ctaItem}>
              <IconSymbol name="paperplane.fill" size={24} color="black" />
              <Text style={styles.ctaText}>Send Money</Text>
            </View>
          </Link>
        </View>
      </View>

      <View style={styles.transactionContainer}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
        <FlatList
          data={user?.transactions}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionType}>{item.type}</Text>
                <Text style={styles.transactionReceiver}>{item.receiverName}</Text>
                <Text style={styles.transactionDate}>
                  {dayjs(item.createdAt).format('DD MMM YYYY, hh:mm A')}
                </Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  {
                    color: [TransactionType.RECEIVE_MONEY, TransactionType.TOP_UP].includes(
                      item.type,
                    )
                      ? 'green'
                      : 'red',
                  },
                ]}
              >
                {[TransactionType.RECEIVE_MONEY, TransactionType.TOP_UP].includes(item.type)
                  ? '+'
                  : '-'}{' '}
                RM
                {item.amount.toFixed(2)}
              </Text>
            </View>
          )}
        />
      </View>
    </ContentLayoutView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 16,
    marginTop: 4,
    color: 'gray',
  },
  ctaContainer: {
    marginBottom: 20,
  },
  ctaBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  ctaItem: {
    alignItems: 'center',
  },
  ctaText: {
    marginTop: 5,
    fontSize: 14,
  },
  transactionContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  transactionReceiver: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: 'gray',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
