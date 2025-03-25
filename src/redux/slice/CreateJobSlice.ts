import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
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

export const selectTaglines = createSelector(
  (state: RootState) => state.createJob.image?.taglines,
  (taglines) =>
    taglines && taglines.length > 0 ? taglines : ["No taglines available"]
);

interface JobPost {
  german?: Record<string, string>;
  english?: Record<string, string>;
}

interface Voice {
  german?: { script?: string };
  english?: { script?: string };
}

interface Image {
  image_keyword: string;
  image_keyword_stockimage: string;
  Headline: string;
  taglines: string[];
}

interface CreateJobState {
  jobPost: JobPost | null;
  voice: Voice | null;
  image: Image | null;
  language: string;
  status: string;
  error: unknown;
  image_keyword: string; // Add this
  image_keyword_stockimage: string;
  script: string; // Add this
}

const initialState: CreateJobState = {
  jobPost: null,
  voice: null,
  image: null,
  language: "german", // default language
  status: "idle",
  error: null as unknown | null,
  image_keyword: "", // Add this
  image_keyword_stockimage: "",
  script: "",
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
        state.jobPost = action.payload?.job_post || null;
        state.voice = action.payload?.voice || null;
        state.image = action.payload?.image || null;

        // Extracting image taglines
        state.image_keyword = action.payload?.image?.image_keyword || "";
        state.image_keyword_stockimage =
          action.payload?.image?.image_keyword_stockimage || "";
        state.script = action.payload?.voice?.english?.script || "";

        console.log("Extracted image taglines:", state.image?.taglines);
      })
      .addCase(createJobPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetState, toggleLanguage } = createJobSlice.actions;
export default createJobSlice.reducer;
