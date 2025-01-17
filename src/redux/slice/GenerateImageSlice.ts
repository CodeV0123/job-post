import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
interface GenerateImageState {
  images: string[];
  templateFile: File | null; // Add this
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GenerateImageState = {
  images: [],
  templateFile: null, // Add this
  status: "idle",
  error: null,
};

const generateImageSlice = createSlice({
  name: "generateImage",
  initialState,
  reducers: {
    resetState: (state) => {
      state.images = [];
      state.status = "idle";
      state.error = null;
    },
    setTemplateFile: (state, action: PayloadAction<File>) => {
      state.templateFile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(generateImage.fulfilled, (state, action) => {
        const base64Object = action.payload.image_base64 || {};
        // Convert object to an array of base64 strings
        state.images = Object.values(base64Object);
        console.log("API Response", action.payload);
        state.status = "succeeded";
      })
      .addCase(generateImage.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
      });
  },
});

export const { resetState, setTemplateFile } = generateImageSlice.actions;

export default generateImageSlice.reducer;
