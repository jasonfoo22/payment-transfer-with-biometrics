import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { Recipient, TransferState } from '@/interface/transfer';

const initialState: TransferState = {
  recipient: null,
  amount: '',
  notes: '',
};

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setRecipient(state, action: PayloadAction<Recipient | null>) {
      state.recipient = action.payload;
    },
    setTransferAmount(state, action: PayloadAction<{ amount: string; notes: string }>) {
      state.amount = action.payload.amount;
      state.notes = action.payload.notes;
    },
    clearTransfer(state) {
      state.recipient = null;
      state.amount = '';
      state.notes = '';
    },
  },
});

export const selectTransferDetail = (state: RootState) => state.transfer;

export const { setRecipient, setTransferAmount, clearTransfer } = transferSlice.actions;
export default transferSlice.reducer;
