import { configureStore } from '@reduxjs/toolkit';
import iconsReducer from './iconsSlice';

export const store = configureStore({
    reducer: {
        icons: iconsReducer,
    },
});

// store の型を定義
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./iconsSlice";