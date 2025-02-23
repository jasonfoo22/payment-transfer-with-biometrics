import { configureStore } from '@reduxjs/toolkit';
import { transactionApi } from '@/store/api/transactionApi';
import rootReducer from '@/store/reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(transactionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
