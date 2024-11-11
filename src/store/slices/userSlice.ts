// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

interface Filter {
  selectedProgram?: number | undefined;
  selectedYear?: number | undefined;
  selectedQuarter?: number | undefined;
}

interface UserState {
  isAuthenticated: boolean;
  userId: string | null;
  scopes: string[];
  isAdmin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  exp: number
  filter: any
  userDetails: object
}

// Initial state
const initialState: UserState = {
  isAuthenticated: false,
  userId: null,
  scopes: [],
  isAdmin: false,
  accessToken: null,
  refreshToken: null,
  exp: 0,
  userDetails: {},
  filter: {
    selectedProgram: undefined,
    selectedYear: undefined,
    selectedQuarter: undefined,
  }
};



const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.scopes = action.payload.scopes;
      state.isAdmin = action.payload.isAdmin;
      state.exp = action.payload.exp
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.userDetails = action.payload.user;
    },


    clearUser: (state) => {
      state.userId = null;
      state.scopes = [];
      state.isAdmin = false;
      state.exp = 0;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.userDetails = {};
    },

    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { setUser, clearUser, setFilter } = userSlice.actions;

// Configuration for redux-persist
const userPersistConfig = {
  key: "user",
  storage,
  // Persist required field
  whitelist: [
    "userId", "scopes", "isAdmin", "accessToken", 
    "refreshToken", "exp", "isAuthenticated", 
    "filter","user"
  ],
};

const persistedUserReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
);

export default persistedUserReducer;
