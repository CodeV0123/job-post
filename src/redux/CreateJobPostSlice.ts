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

interface Job {
  headline: string;
  description: string;
  introduction: string;
  introductionOfJob: string;
  tasks: string[];
  qualifications: string[];
  benefits: string[];
  callToAction: string;
  personalAddress: string;
  voiceScript: string;
  voiceTone: string;
  voiceCTA: string;
  voiceLocation: string;
  voiceBenefits: string;
  contactDetails: {
    email: string;
    phone: string;
    address: string;
    website: string;
  };
  imageKeyword: string;
  taglines: string[];
  bodyCopy: string[];
}

const createJobPostSlice = createSlice({
  name: "createJobPost",
  initialState: {
    job: null as Job | null,
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

        const jobPost = action.payload?.job_post || {};
        const voice = action.payload?.voice || {};
        const image = action.payload?.image || {};

        // Normalized State
        state.job = {
          headline: image.Headline || "No headline available",
          description: jobPost.Description || "No description available",
          introduction: jobPost.Introduction || "No introduction available",
          introductionOfJob:
            jobPost["Introduction of the job"] ||
            "No job introduction available",
          personalAddress:
            jobPost["Personal Address"] || "No personal address provided",
          tasks: (
            jobPost.Tasks?.split("\n▶").map((task: string) => task.trim()) || []
          ).filter(Boolean),
          qualifications: (
            jobPost.Qualifications?.split("\n▶").map((q: string) => q.trim()) ||
            []
          ).filter(Boolean),
          benefits: (
            jobPost.Benefits?.split("\n▶").map((b: string) => b.trim()) || []
          ).filter(Boolean),
          callToAction:
            jobPost["Call to Action"] || "No call to action provided",
          voiceScript: voice.script || "No voice script provided",
          voiceTone: voice.tone || "No tone specified",
          voiceCTA: voice.cta || "No Call to Action specified",
          voiceLocation: voice.location || "No location specified",
          voiceBenefits: voice.benefits || "No benefits specified",
          contactDetails: voice.contact_details || {
            email: "No email provided",
            phone: "No phone provided",
            address: "No address provided",
            website: "No website provided",
          },
          imageKeyword: image.image_keyword || "No image keyword provided",
          taglines: image.taglines || [],
          bodyCopy: image.body_copy || [],
        };
      })

      .addCase(createJobPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export const { resetState } = createJobPostSlice.actions;

export default createJobPostSlice.reducer;
