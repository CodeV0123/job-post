import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://image-job.assemblr.ai/create-job-post/";

/*
! Async thunk to send POST request
*/

export const createJobPost = createAsyncThunk(
  "createJob/createJobPost",
  async (file: Blob, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  jobPost: null,
  language: "german", // default language
  status: "idle",
  error: null as unknown | null,
};

const createJobSlice = createSlice({
  name: "createJob",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === "german" ? "english" : "german";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createJobPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobPost = action.payload.job_post;
      })
      .addCase(createJobPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { toggleLanguage } = createJobSlice.actions;
export default createJobSlice.reducer;
