import {
  AnyAction,
  configureStore,
  EnhancedStore,
  Middleware,
} from '@reduxjs/toolkit';

import {
  loadFromLocalStorage,
  localStorageMiddleware,
} from '../helpers/localStorageHelper';

import userReducer from './slices/userSlice';

const persistedState: any = loadFromLocalStorage();

export const store: any = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: persistedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
