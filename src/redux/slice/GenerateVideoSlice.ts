// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { RootState } from "../store/store";

// const API_URL = "https://image-job.assemblr.ai/generate-video";

// // Function to generate a random 6-digit product_id
// const generateProductId = () =>
//   Math.floor(100000 + Math.random() * 900000).toString();

// // Utilitty function to convert base 64 to File
// const base64ToFile = (base64: string, fileName: string, mimeType: string) => {
//   const byteCharacters = atob(base64.split(",")[1]);
//   const byteArrays = [];
//   for (let i = 0; i < byteCharacters.length; i++) {
//     byteArrays.push(byteCharacters.charCodeAt(i));
//   }
//   const byteArray = new Uint8Array(byteArrays);
//   return new File([byteArray], fileName, { type: mimeType });
// };

// export const generateVideo = createAsyncThunk(
//   "generateVideo/fetch",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as RootState;

//       // Get template_path from GenerateImageSlice (first generated image)
//       const templatePathBase64 = state.generateImage.images[0]; // Assuming the first image is used
//       if (!templatePathBase64) {
//         return rejectWithValue("Template image is required.");
//       }

//       // Get selected image_file (first in dropdown by default)
//       const imageFileBase64 = state.generateImage.images[0]; // Ensure dropdown selection logic in UI
//       if (!imageFileBase64) {
//         return rejectWithValue("An image must be selected.");
//       }

//       // Get script from CreateJobSlice
//       const script = state.createJob?.voice?.english?.script;
//       if (!script) {
//         return rejectWithValue("Script is missing.");
//       }

//       // Generate random product_id
//       const productId = generateProductId();

//       const templateFile = base64ToFile(
//         templatePathBase64,
//         "template.png",
//         "image/png"
//       );
//       const imageFile = base64ToFile(imageFileBase64, "image.png", "image/png");

//       // Prepare form data
//       const formData = new FormData();
//       formData.append("template_path", templateFile);
//       formData.append("image_file", imageFile);
//       formData.append("product_id", productId);
//       formData.append("script", script);

//       // Send request
//       const response = await axios.post(API_URL, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         axios.isAxiosError(error)
//           ? error.response?.data || "Something went wrong"
//           : "Something went wrong"
//       );
//     }
//   }
// );

// interface GenerateVideoState {
//   videoPath: string | null;
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: GenerateVideoState = {
//   videoPath: null,
//   status: "idle",
//   error: null,
// };

// const generateVideoSlice = createSlice({
//   name: "generateVideo",
//   initialState,
//   reducers: {
//     resetVideoState: (state) => {
//       state.videoPath = null;
//       state.status = "idle";
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(generateVideo.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(generateVideo.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.videoPath = action.payload.video_path;
//         console.log("API Response", state.videoPath);
//       })
//       .addCase(generateVideo.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { resetVideoState } = generateVideoSlice.actions;
// export default generateVideoSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://image-job.assemblr.ai/generate-video";

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
