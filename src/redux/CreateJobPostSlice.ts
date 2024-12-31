import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://image-job.assemblr.ai/create-job-post/";

export const createJobPost = createAsyncThunk(
  "createJobPost/create",
  async (formData: FormData) => {
    // Accept FormData
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      }
      return "Something went wrong";
    }
  }
);

const createJobPostSlice = createSlice({
  name: "createJobPost",
  initialState: {
    job: null,
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  },
  reducers: {
    resetState: (state) => {
      state.job = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createJobPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.job = action.payload;
      })
      .addCase(createJobPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export const { resetState } = createJobPostSlice.actions;

export default createJobPostSlice.reducer;
