import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://image-job.assemblr.ai/chat-stream/";

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
      const response = await axios.get(API_URL, {
        params: {
          prompt,
          job_description: JSON.stringify(job_description), // Provide an empty object as a placeholder
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
