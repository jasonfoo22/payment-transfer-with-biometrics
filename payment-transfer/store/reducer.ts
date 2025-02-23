import { combineReducers } from 'redux';
import transactionsSlice from '@/store/slices/transactionsSlice';
import { transactionApi } from '@/store/api/transactionApi';
import transferSlice from '@/store/slices/transferSlice';

const rootReducer = combineReducers({
  transactions: transactionsSlice,
  transfer: transferSlice,
  [transactionApi.reducerPath]: transactionApi.reducer,
});

export default rootReducer;
