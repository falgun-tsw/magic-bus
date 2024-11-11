import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedUserReducer from "./slices/userSlice";
import { configurationApis } from "./apis/configurationApis";

// Import the API slice
import { userApi, } from "./apis/userApi";
import { headerApi } from "./apis/headerApi";
import { centerApis } from "./apis/centerApis";

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [userApi.reducerPath]: userApi.reducer,
    [headerApi.reducerPath]: headerApi.reducer,
    [centerApis.reducerPath]: centerApis.reducer,
    [configurationApis.reducerPath]: configurationApis.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(userApi.middleware, headerApi.middleware, centerApis.middleware, configurationApis.middleware), // Add the API middleware
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
