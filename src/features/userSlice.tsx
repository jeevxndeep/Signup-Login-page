import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../services/Userservice";

type AuthState = {
    user: User | null;
    token: string | null;
};

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuth(state, action:PayloadAction<{ user: User; token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        clearAuth(state) {
            state.user = null;
            state.token =null;
            localStorage.removeItem("token");
        },
    },
});

export const {setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;