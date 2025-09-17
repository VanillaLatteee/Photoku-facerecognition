import { configureStore } from '@reduxjs/toolkit';
import { api } from './ws';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // middleware API untuk caching, polling
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;