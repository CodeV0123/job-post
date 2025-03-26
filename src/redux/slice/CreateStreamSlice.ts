import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface JobField {
  header?: string;
  items: string[];
}

// First, let's define the nested interfaces
interface VoiceDetails {
  script: string;
  tone: string;
  cta: string;
  location: string;
  benefits: string;
  contact_details: {
    email: string;
    phone: string;
    address: string;
    website: string;
    contact_person: string;
  };
}

interface JobPostDetails {
  Description?: string;
  "Job Title"?: string;
  Berufsbezeichnung?: string;
  Stellenbezeichnung?: string;
  Jobbezeichnung?: string;
  Jobtitel?: string;
  "Job Titel"?: string;
  Job_Title?: string;
  Introduction?: string;
  Einführung?: string;
  Einleitung?: string;
  Tasks?: JobField | string[];
  Qualifications?: JobField | string[];
  Benefits?: JobField | string[];
  "Call to Action"?: string;
  // Add other job post specific fields as needed
}

interface JobPost {
  english: {
    job_post: {
      jobTitle: string;
      headline: string;
      description: string;
      introduction: string;
      introductionOfJob: string;
      tasks: JobField | string[];
      qualifications: JobField | string[];
      benefits: JobField | string[];
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
        contact_person: string;
      };
      imageKeyword: string;
      taglines: string[];
      bodyCopy: string[];
      website: string;
      closingDate: string;

      // Add these new properties for the nested objects
      voice?: VoiceDetails;
      job_post?: JobPostDetails;
    };
  };
  german: {
    job_post: {
      jobTitle: string;
      headline: string;
      description: string;
      introduction: string;
      introductionOfJob: string;
      tasks: JobField | string[];
      qualifications: JobField | string[];
      benefits: JobField | string[];
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
        contact_person: string;
      };
      imageKeyword: string;
      taglines: string[];
      bodyCopy: string[];
      website: string;
      closingDate: string;

      // Add these new properties for the nested objects
      voice?: VoiceDetails;
      job_post?: JobPostDetails;
    };
  };
}

interface ChatStreamState {
  chatResponse: JobPost | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const API_URL = "https://image-job.assemblr.ai/chat-stream";

export const fetchChatStream = createAsyncThunk(
  "chatStream/fetch",
  async ({
    prompt,
    job_description,
  }: {
    prompt: string;
    job_description: object;
  }) => {
    try {
      // Encode job_description as a query string
      const jobDescriptionQuery = encodeURIComponent(
        JSON.stringify(job_description)
      );
      const promptQuery = encodeURIComponent(prompt);

      // Construct the full GET request URL with query parameters
      const requestUrl = `${API_URL}?job_description=${jobDescriptionQuery}&prompt=${promptQuery}`;

      // Make the GET request
      const response = await axios.get(requestUrl);

      return response.data as JobPost;
    } catch (error) {
      console.error("Error fetching chat stream:", error);
      throw error;
    }
  }
);

const initialState: ChatStreamState = {
  chatResponse: null,
  status: "idle",
  error: null,
};

const chatStreamSlice = createSlice({
  name: "chatStream",
  initialState,
  reducers: {
    resetChatState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatStream.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatStream.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chatResponse = action.payload;
        console.log("Chat stream fulfilled payload:", state.chatResponse);
      })
      .addCase(fetchChatStream.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch chat response";
      });
  },
});

export const { resetChatState } = chatStreamSlice.actions;
export default chatStreamSlice.reducer;
