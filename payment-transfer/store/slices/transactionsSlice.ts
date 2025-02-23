import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '@/interface/transaction';
import { mockTransactionData } from '@/mock/mockData';
import { RootState } from '@/store';
import dayjs from 'dayjs';

interface TransactionsState {
  transactions: Transaction[];
}

const sortTransactions = (transactions: Transaction[]) => {
  return transactions.sort((a, b) => (dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1));
};

const initialState: TransactionsState = {
  transactions: sortTransactions(mockTransactionData),
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions = sortTransactions([...state.transactions, action.payload]);
    },
  },
});

export const selectTransactions = (state: RootState) => state.transactions.transactions;

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
