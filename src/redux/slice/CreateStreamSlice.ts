import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://image-job.assemblr.ai/chat-stream/";

export const fetchChatStream = createAsyncThunk(
  "chatStream/fetch",
  async ({
    prompt,
    job_description,
    isEnglish,
  }: {
    prompt: string;
    job_description: {
      voice?: {
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
      };
      job_post?: {
        "Job Title": string;
        Introduction: string;
        Tasks: string[] | { items: string[] };
        Benefits: string[] | { items: string[] };
        Qualifications: string[] | { items: string[] };
        "Personal Address": string;
        "Introduction of the Position": string;
      };
    };
    isEnglish: boolean;
  }) => {
    // Enhanced prompt that specifically mentions translating all fields including the script
    const enhancedPrompt = `${prompt} ${
      isEnglish
        ? ". Please translate the entire JSON response including all nested fields (especially the 'voiceScript' field in voice data) to English."
        : ". Bitte übersetzen Sie die gesamte JSON-Antwort einschließlich aller verschachtelten Felder (insbesondere das 'script'-Feld in Voice-Daten) ins Deutsche."
    }`;

    // Create a complete job description object that includes metadata about required translation
    // const enhancedJobDescription = {
    //   ...job_description,
    //   _metadata: {
    //     requiresTranslation: true,
    //     targetLanguage: isEnglish ? "en" : "de",
    //     includeFields: [
    //       "voiceScript",
    //       "tone",
    //       "cta",
    //       "benefits",
    //       "Tasks",
    //       "Introduction",
    //     ],
    //   },
    // };

    try {
      const response = await axios.get(API_URL, {
        params: {
          prompt: enhancedPrompt,
          job_description: JSON.stringify(job_description),
        },
      });

      // Log the response for debugging
      console.log("API Response:", response.data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
        throw error.response?.data || "Something went wrong";
      }
      throw "Something went wrong";
    }
  }
);

interface ChatStreamState {
  chatResponse: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  prompt: string;
}

const initialState: ChatStreamState = {
  chatResponse: null,
  status: "idle",
  error: null,
  prompt: "",
};

const chatStreamSlice = createSlice({
  name: "chatStream",
  initialState,
  reducers: {
    resetChatState: (state) => {
      state.chatResponse = null;
      state.status = "idle";
      state.error = null;
      state.prompt = "";
    },
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatStream.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatStream.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chatResponse = action.payload;
      })
      .addCase(fetchChatStream.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch chat response";
      });
  },
});

export const { resetChatState, setPrompt } = chatStreamSlice.actions;

export default chatStreamSlice.reducer;
