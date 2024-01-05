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
        userCreateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        userCreateFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { userCreateFail, userCreateStart, userCreateSuccess } = userSlice.actions;
export default userSlice.reducer;
