import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://image-job.assemblr.ai/generate-video/";

export const generateVideo = createAsyncThunk(
  "generateVideo/fetch",
  async (payload: {
    template_path: File;
    product_id: string;
    image_file: File;
    script: string;
    // language: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append("template_path", payload.template_path);
      formData.append("product_id", payload.product_id);
      formData.append("image_file", payload.image_file);
      formData.append("script", payload.script);
      // formData.append("language", payload.language);

      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Something went wrong";
      }
      throw "Something went wrong";
    }
  }
);

interface GenerateVideoState {
  videoResponse: { video_path: string } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GenerateVideoState = {
  videoResponse: null,
  status: "idle",
  error: null,
};

const generateVideoSlice = createSlice({
  name: "generateVideo",
  initialState,
  reducers: {
    resetVideoState: (state) => {
      state.videoResponse = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(generateVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videoResponse = action.payload;
        console.log("API Response", action.payload);
      })
      .addCase(generateVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to generate video";
      });
  },
});

export const { resetVideoState } = generateVideoSlice.actions;
export default generateVideoSlice.reducer;
