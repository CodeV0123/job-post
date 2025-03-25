import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";

const API_URL = "https://image-job.assemblr.ai/generate-image";

interface GenerateImagePayload {
  templatePath: File;
  imageSource: "stock_photo" | "ai_image";
}

export const generateImage = createAsyncThunk(
  "generateImage/generate",
  async (
    { templatePath, imageSource }: GenerateImagePayload,
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;

      // Get image keyword from CreateJobSlice (Ensure it has a value)
      const imageKeyword =
        imageSource === "ai_image"
          ? state.createJob.image_keyword
          : state.createJob.image_keyword_stockimage;

      console.log("Sending image_keyword:", imageKeyword); // Debugging Log

      // Prepare form data
      const formData = new FormData();
      formData.append("template_path", templatePath);
      formData.append("image_keyword", imageKeyword);
      formData.append("image_source", imageSource);

      // Send request
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data || "Something went wrong"
          : "Something went wrong"
      );
    }
  }
);

interface GenerateImageState {
  images: string[];
  imageSource: "stock_photo" | "ai_image";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  templateFile: File | null;
}

const initialState: GenerateImageState = {
  images: [],
  imageSource: "stock_photo",
  status: "idle",
  error: null,
  templateFile: null,
};

const generateImageSlice = createSlice({
  name: "generateImage",
  initialState,
  reducers: {
    resetState: (state) => {
      state.images = [];
      state.imageSource = "stock_photo";
      state.status = "idle";
      state.error = null;
      state.templateFile = null;
    },
    setImageSource: (
      state,
      action: PayloadAction<"stock_photo" | "ai_image">
    ) => {
      state.imageSource = action.payload;
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

export const { resetState, setImageSource } = generateImageSlice.actions;
export default generateImageSlice.reducer;
