import { Middleware } from '@reduxjs/toolkit';
import { RootState } from 'store/intex';

export function saveToLocalStorage(state: RootState): void {
  try {
    const serializedState: string = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (error) {
    console.error('Error saving state to local storage:', error);
  }
}

export function loadFromLocalStorage(): RootState | undefined {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from local storage:', error);
    return undefined;
  }
}

export const localStorageMiddleware: Middleware<object, RootState> =
  store => next => action => {
    next(action);
    saveToLocalStorage(store.getState());
  };
