import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/interface/transaction';
import { mockUserData } from '@/mock/mockData';
import { RootState } from '@/store';

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: mockUserData,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserBalance: (state, action: PayloadAction<number>) => {
      state.user.balance = action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.user.user;

export const { updateUserBalance } = userSlice.actions;
export default userSlice.reducer;
