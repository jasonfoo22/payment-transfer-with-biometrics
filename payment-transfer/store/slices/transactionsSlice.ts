import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionType, User } from '@/interface/transaction';
import { mockUserData } from '@/mockData';
import { RootState } from '@/store';
import dayjs from 'dayjs';

interface TransactionsState {
  user: User | null;
  transactions: Transaction[];
}

const sortedTransactions = mockUserData.user.transactions.sort((a, b) =>
  dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1,
);

const initialState: TransactionsState = {
  user: mockUserData.user, // get from mock user data
  transactions: sortedTransactions,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      if (state.user) {
        // Adjust the balance based on transaction type
        const newBalance =
          action.payload.type === TransactionType.SEND_MONEY
            ? state.user.balance - action.payload.amount
            : state.user.balance + action.payload.amount;

        state.user.balance = newBalance;
        // Add the new transaction and sort the list
        state.user.transactions = [...state.user.transactions, action.payload].sort((a, b) =>
          dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1,
        );
      }
    },
  },
});

export const selectUser = (state: RootState) => state.transactions.user;

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
