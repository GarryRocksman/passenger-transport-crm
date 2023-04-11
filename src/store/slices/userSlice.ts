import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  email?: string | null;
  phone?: string | null;
  token: string | null;
  id: string | null;
}

const initialState: UserState = {
  email: null,
  phone: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.phone = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
