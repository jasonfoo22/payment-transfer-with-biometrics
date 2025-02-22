import { combineReducers } from 'redux';
import transactionsSlice from '@/store/slices/transactionsSlice';

const rootReducer = combineReducers({
  transactions: transactionsSlice,
});

export default rootReducer;
