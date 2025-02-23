import { createApi } from '@reduxjs/toolkit/query/react';
import { Transaction } from '@/interface/transaction';
import { mockFetchTransactionDetailsById, mockTransferApi } from '@/mock/mockAPI';
import { TransferState } from '@/interface/transfer';

export enum TransactionTagTypes {
  transaction = 'Transaction',
}

export interface TransactionsRequestPayload {
  transactionId: string;
  transactions: Transaction[];
}

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: async () => ({ data: {} }),
  tagTypes: Object.values(TransactionTagTypes),
  endpoints: builder => ({
    // Mocking use 'query' for fetching transaction details by ID, pass in transactions just mocking use
    fetchTransactionDetails: builder.query<Transaction | null, TransactionsRequestPayload>({
      queryFn: async ({ transactionId, transactions }: TransactionsRequestPayload) => {
        try {
          // Find the transaction from the mock data based on transactionId
          const transaction = await mockFetchTransactionDetailsById(transactionId, transactions);
          return { data: transaction }; // Return the found transaction data
        } catch (error: unknown) {
          if (error instanceof Error) {
            return { error: error.message }; // If the error is an instance of Error, return its message
          }
          return { error: 'An unknown error occurred.' };
        }
      },
      providesTags: [TransactionTagTypes.transaction],
    }),
    // Create a new transaction (mutation)
    createTransaction: builder.mutation<Transaction, TransferState>({
      queryFn: async ({ recipient, amount, notes }: TransferState) => {
        try {
          // Call the mock transfer API to simulate the transaction
          const transaction = await mockTransferApi({ recipient, amount, notes });

          // Assuming the transaction creation is successful, return the transaction data
          return { data: transaction };
        } catch (error) {
          if (error instanceof Error) {
            return { error: error.message };
          }
          return { error: 'An unknown error occurred.' };
        }
      },
      invalidatesTags: [TransactionTagTypes.transaction],
    }),
  }),
});

export const { useFetchTransactionDetailsQuery, useCreateTransactionMutation } = transactionApi;
