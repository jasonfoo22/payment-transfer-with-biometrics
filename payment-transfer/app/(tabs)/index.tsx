import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native';
import dayjs from 'dayjs';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';
import { ContentLayoutView } from '@/components/ContentLayoutView';
import { Transaction, TransactionType } from '@/interface/transaction';
import { Colors } from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/transactionsSlice';
import { Routes } from '@/constants/Routes';
import { convertCurrencyValue } from '@/utils/currencyFormatter';

interface TransactionSection {
  month: string;
  data: Transaction[];
}

const groupTransactionsByMonth = (transactions?: Transaction[]): TransactionSection[] => {
  if (!transactions) return [];
  const grouped: Record<string, Transaction[]> = {};

  transactions.forEach(transaction => {
    const month = dayjs(transaction.createdAt).format('MMM YYYY');

    if (!grouped[month]) {
      grouped[month] = []; // Ensure the key exists before pushing
    }

    grouped[month].push(transaction);
  });

  return Object.keys(grouped).map(month => ({
    month: month,
    data: grouped[month],
  }));
};

const calculateMonthWidth = (month: string) => {
  const fontSize = 14;
  const characterWidth = fontSize * 0.6;
  return Math.max(month.length * characterWidth + 32, 100);
};

export default function HomeScreen() {
  const user = useSelector(selectUser);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  const transactionsByMonth = useMemo(
    () => groupTransactionsByMonth(user?.transactions),
    [user?.transactions],
  );

  return (
    <ContentLayoutView>
      <View style={styles.headerContainer}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={styles.balance}>
              {isBalanceHidden ? '*****' : `RM${convertCurrencyValue(user?.balance.toFixed(2))}`}
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
        <SectionList
          sections={transactionsByMonth}
          keyExtractor={item => item._id}
          renderSectionHeader={({ section: { month } }) => (
            <View
              style={[
                styles.monthHeaderWrapper,
                {
                  width: calculateMonthWidth(month),
                },
              ]}
            >
              <Text style={styles.monthHeader}>{month}</Text>
            </View>
          )}
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
                      ? Colors.success
                      : Colors.warning,
                  },
                ]}
              >
                {[TransactionType.RECEIVE_MONEY, TransactionType.TOP_UP].includes(item.type)
                  ? '+'
                  : '-'}{' '}
                RM
                {convertCurrencyValue(item.amount.toFixed(2))}
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
  monthHeaderWrapper: {
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 4,
    backgroundColor: Colors.background,
    minWidth: 100,
    maxWidth: 240,
    boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  monthHeader: {
    fontSize: 14,
    fontWeight: 'bold',
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
