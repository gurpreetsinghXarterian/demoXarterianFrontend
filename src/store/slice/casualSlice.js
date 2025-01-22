import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'casual',
  initialState: {
    showNavbar: true,
  },
  reducers: {
    setNavbar: (state, action) => {
      state.showNavbar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
  },
});

export const { setNavbar } = userSlice.actions;
export default userSlice.reducer;
