import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { username: '', token: '', },
  hydrate: {dayDate: '', objQuantity: '', quantity: '',},
  notification: {recuperation: false, feedback: false ,hydratation: false,}
  
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.username = action.payload.username;
      state.value.token = action.payload.token;
    },
    hydrate: (state, action) => {
      state.hydrate.dayDate = action.payload.dayDate;
      state.hydrate.objQuantity = action.payload.objQuantity;
      state.hydrate.quantity = action.payload.quantity;
    },
    setNotifRecuperation: (state, action) => {
      state.notification.recuperation = action.payload;
    },
    setNotifFeedback: (state, action) => {
      state.notification.feedback = action.payload;
    },
    setNotifHydratation: (state, action) => {
      state.notification.hydratation = action.payload;
    },
    logout: (state)=>{
      state.value.token = null;
      state.value.username = null;
    },
  },
});

export const { login, hydrate, setNotifRecuperation, setNotifFeedback, setNotifHydratation, logout} = userSlice.actions;
export default userSlice.reducer;
