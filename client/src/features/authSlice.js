import { createSlice,} from "@reduxjs/toolkit";
const token = JSON.stringify(localStorage.getItem('token'));
let initialState = {
    token:token?token:null,
    loading:false,
}
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        addToken:(state,action) => {
            state.token = JSON.stringify(localStorage.getItem('token'));
        },
        reset: (state) => {
            state.token = null;
            state.loading = false;
        },
    }
});
export const {reset,addToken} = authSlice.actions;
export default authSlice.reducer;