import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  password: string;
}

interface AuthState {
  isLoggedIn: boolean;
  userEmail: string | null;
  users: User[]; // list of registered users
}

const initialState: AuthState = {
  isLoggedIn: false,
  userEmail: null,
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup(state, action: PayloadAction<{ email: string; password: string }>) {
      const exists = state.users.find(u => u.email === action.payload.email);
      if (!exists) {
        state.users.push({ email: action.payload.email, password: action.payload.password });
        state.isLoggedIn = true;
        state.userEmail = action.payload.email;
      }
    },
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const user = state.users.find(
        u => u.email === action.payload.email && u.password === action.payload.password
      );
      if (user) {
        state.isLoggedIn = true;
        state.userEmail = user.email;
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userEmail = null;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
