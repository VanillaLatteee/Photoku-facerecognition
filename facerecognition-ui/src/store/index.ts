// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";
import { api } from "@/lib/ws";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    [api.reducerPath]: api.reducer
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
