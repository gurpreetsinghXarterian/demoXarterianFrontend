import { getCookie, setCookie } from '@/helpers/helperFunctions';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllPosts = createAsyncThunk(
  'post/fetchAllPosts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/post/allPosts`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllPostsVideos = createAsyncThunk(
  'post/fetchAllPostsVideos',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/post/allPostsVideos`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const allUserPosts = createAsyncThunk(
  'post/allUserPosts',
  async (_, thunkAPI) => {
    try {
      const token= await getCookie("token");
      const response = await axios.get(
        `http://localhost:8000/post/allUserPosts`,
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

export const allAnonymousUserPosts = createAsyncThunk(
  'post/allAnonymousUserPosts',
  async (email, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/post/allAnonymousUserPosts?email=${email}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const UploadPostData = createAsyncThunk(
  'post/UploadPostData',
  async (formdata, thunkAPI) => {
    try {
      const token= await getCookie("token");
      const response = await axios.post(
        `http://localhost:8000/post/createPost`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(fetchAllPosts());
      thunkAPI.dispatch(allUserPosts());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    userPosts:[],
    allVideoPosts:[],
    loading: false,
    error: null,
  },
  reducers: {
    setPostsLoader: (state, action) => {
        state.showNavbar = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllPostsVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPostsVideos.fulfilled, (state, action) => {
        state.allVideoPosts = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPostsVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UploadPostData.pending, (state) => {
        state.loading = true;
      })
      .addCase(UploadPostData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(UploadPostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(allUserPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(allUserPosts.fulfilled, (state,action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(allUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(allAnonymousUserPosts.pending, (state) => {
      })
      .addCase(allAnonymousUserPosts.fulfilled, (state,action) => {
      })
      .addCase(allAnonymousUserPosts.rejected, (state, action) => {
      })
  },
});
export const { setPostsLoader } = userSlice.actions;

export default userSlice.reducer;
