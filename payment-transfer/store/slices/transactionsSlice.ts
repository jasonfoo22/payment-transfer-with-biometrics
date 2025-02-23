import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionType, User } from '@/interface/transaction';
import { mockUserData } from '@/mock/mockData';
import { RootState } from '@/store';
import dayjs from 'dayjs';

interface TransactionsState {
  user: User;
  transactions: Transaction[];
}

const sortTransactions = (transactions: Transaction[]) => {
  return transactions.sort((a, b) => (dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1));
};

const initialState: TransactionsState = {
  user: mockUserData.user, // get from mock user data
  transactions: sortTransactions(mockUserData.user.transactions),
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      if (state.user) {
        let newBalance = state.user.balance;

        // Adjust the balance based on transaction type using the TransactionType enum values
        switch (action.payload.type) {
          case TransactionType.SEND_MONEY:
            newBalance = Number((state.user.balance - action.payload.amount).toFixed(2)); // Subtract for SEND_MONEY
            break;
          case TransactionType.RECEIVE_MONEY:
          case TransactionType.TOP_UP:
            newBalance = Number((state.user.balance + action.payload.amount).toFixed(2)); // Add for RECEIVE_MONEY and TOP_UP
            break;
          case TransactionType.PAY_BILLS:
            newBalance = Number((state.user.balance - action.payload.amount).toFixed(2)); // Subtract for PAY_BILLS (or handle differently if needed)
            break;
          default:
            break;
        }

        // Update the user's balance
        state.user.balance = newBalance;

        // Add the new transaction and update the transaction list in the correct order
        const updatedTransactions = [...state.user.transactions, action.payload];
        state.user.transactions = sortTransactions(updatedTransactions);
      }
    },
  },
});

export const selectUser = (state: RootState) => state.transactions.user;

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
