import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    id: number | null;
    role: string | null;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: {
    id: null,
    role: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; id: number; role: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user.id = action.payload.id;
      state.user.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = { id: null, role: null };
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
