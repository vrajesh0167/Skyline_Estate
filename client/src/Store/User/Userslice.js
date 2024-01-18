import { createSlice } from "@reduxjs/toolkit";

const initializaState = {
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initializaState,
    reducers: {
        userCreateStart: (state) => {
            state.loading = true;
        },
        googleSigninStart: (state) => {
            state.loading = true;
        },
        userCreateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        userCreateFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        userUpdateStart: (state) => {
            state.loading = true;
        },
        userUpdateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        userUpdateFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        UserOutStart: (state) => {
            state.loading = false;
        },
        userOutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        userOutFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    userCreateFail,
    userCreateStart,
    googleSigninStart,
    userCreateSuccess,
    userUpdateFail,
    userUpdateStart,
    userUpdateSuccess,
    UserOutStart,
    userOutSuccess,
    userOutFail
} = userSlice.actions;
export default userSlice.reducer;
