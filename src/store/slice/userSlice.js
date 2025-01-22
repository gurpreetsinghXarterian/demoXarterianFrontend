import { getCookie, setCookie } from '@/helpers/helperFunctions';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie } from '../../helpers/helperFunctions';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const token = await getCookie("token");
      const response = await axios.get(
        `http://localhost:8000/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAnonymousUser = createAsyncThunk(
  'user/fetchAnonymousUser',
  async (email, thunkAPI) => {
    try {
      const token = await getCookie("token");
      const response = await axios.get(
        `http://localhost:8000/user/anonymousprofile?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async ({ email, newPassword }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8000/user/forgot/Password/${email}`, { newPassword })
      return response.data;

    } catch (error) {
      console.error("error ", error.message || error)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginCredentials, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8000/user/loginuser", { ...loginCredentials })
      const userToken = response.data.token;
      if (userToken) {
        setCookie("token", userToken);
      }
      return response.data;

    } catch (error) {
      console.error("error ", error.message || error)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendOtpUserMail = createAsyncThunk(
  'user/sendOtpUserMail',
  async (mail, thunkAPI) => {
    try {

      const response = await axios.post("http://localhost:8000/otp/sendOtp", { email: mail })

      return response.data;

    } catch (error) {
      console.error("errorMessage : ", error, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const VerifyOtp = createAsyncThunk(
  'user/VerifyOtp',
  async (verificationData, thunkAPI) => {
    try {

      const response = await axios.post("http://localhost:8000/otp/verifyOtp", { ...verificationData })

      return response.data;

    } catch (error) {
      console.error("errorMessage : ", error, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (sinupCredentials, thunkAPI) => {
    try {

      const response = await axios.post("http://localhost:8000/user/signupuser", { ...sinupCredentials })

      return response.data;

    } catch (error) {
      console.error("errorMessage : ", error, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const upgradeUserDetails = createAsyncThunk(
  'user/upgradeUserDetails',
  async (formdata, thunkAPI) => {
    try {
      const token = await getCookie("token");
      const response = await axios.put("http://localhost:8000/user/Details",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      thunkAPI.dispatch(fetchUser());
      return response.data;

    } catch (error) {
      console.error("errorMessage : ", error, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const SearchUser = createAsyncThunk(
  'user/SearchUser',
  async (searchKeyword, thunkAPI) => {
    try {
      const token = await getCookie("token");
      const response = await axios.get(`http://localhost:8000/user/search?keyword=${searchKeyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data;

    } catch (error) {
      console.error("errorMessage : ", error, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async (followUserId, thunkAPI) => {
    try {
      const token = await getCookie("token");
      const response = await axios.put(`http://localhost:8000/user/toggleFollow`,
        {followUserId:followUserId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data;

    } catch (error) {
      console.error("errorMessage : ", error, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      deleteCookie("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendOtpUserMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtpUserMail.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendOtpUserMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(VerifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(VerifyOtp.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(VerifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(upgradeUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(upgradeUserDetails.fulfilled, (state) => {
      })
      .addCase(upgradeUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(SearchUser.pending, (state) => {
      })
      .addCase(SearchUser.fulfilled, (state) => {
      })
      .addCase(SearchUser.rejected, (state, action) => {
      })
      .addCase(fetchAnonymousUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnonymousUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAnonymousUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(followUser.pending, (state) => {
      })
      .addCase(followUser.fulfilled, (state) => {
      })
      .addCase(followUser.rejected, (state, action) => {
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
