import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import transferSlice from '@/store/slices/transferSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    transfer: transferSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
