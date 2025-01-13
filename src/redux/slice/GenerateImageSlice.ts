import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://image-job.assemblr.ai/generate-image/";

export const generateImage = createAsyncThunk(
  "generateImage,generate",
  async (
    {
      templatePath,
      imageKeyword,
    }: { templatePath: File; imageKeyword: string },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append("template_path", templatePath);
    formData.append("image_keyword", imageKeyword);
    try {
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
const generateImageSlice = createSlice({
  name: "generateImage",
  initialState: {
    images: [] as string[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  },
  reducers: {
    resetState: (state) => {
      state.images = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(generateImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload.image_base64;
      })
      .addCase(generateImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = generateImageSlice.actions;

export default generateImageSlice.reducer;
