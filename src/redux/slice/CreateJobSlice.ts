import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://image-job.assemblr.ai/create-job-post";

/*
! Async thunk to send POST request
*/

export const createJobPost = createAsyncThunk(
  "createJob/createJobPost",
  async (formData: FormData) => {
    // Accept FormData
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      }
      return "Something went wrong";
    }
  }
);

interface CreateJobState {
  jobPost: null;
  language: string;
  status: string;
  error: unknown;
  image_keyword: string; // Add this
  image_keyword_stockimage: string; // Add this
}

const initialState: CreateJobState = {
  jobPost: null,
  language: "german", // default language
  status: "idle",
  error: null as unknown | null,
  image_keyword: "", // Add this
  image_keyword_stockimage: "", // Add this
};

const createJobSlice = createSlice({
  name: "createJob",
  initialState,
  reducers: {
    resetState: (state) => {
      state.jobPost = null;
      state.status = "idle";
      state.error = null;
    },
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
        state.jobPost = action.payload?.job_post;

        // Ensure image keywords are stored
        state.image_keyword = action.payload?.image?.image_keyword || "";
        state.image_keyword_stockimage =
          action.payload?.image?.image_keyword_stockimage || "";

        console.log("Extracted image_keyword:", state.image_keyword);
        console.log(
          "Extracted image_keyword_stock:",
          state.image_keyword_stockimage
        );

        console.log(state.jobPost);
        console.log(action.payload.job_post);
      })
      .addCase(createJobPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetState, toggleLanguage } = createJobSlice.actions;
export default createJobSlice.reducer;
