import { configureStore } from "@reduxjs/toolkit";
import auth from './features/userSlice'

export const store = configureStore({
    reducer:{ auth },
});

export type MainState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;