import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const getInitialToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

const token = getInitialToken();

const initialState: AuthState = {
  token,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
  },
});

export const {setToken, logout} = authSlice.actions;
export default authSlice.reducer;
