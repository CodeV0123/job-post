import { configureStore } from "@reduxjs/toolkit";
import createJobPostReducer from "../slice/CreateJobPostSlice";
import chatStreamReducer from "../slice/CreateStreamSlice";
import generateVideoReducer from "../slice/GenerateVideoSlice";
import translateToEnglishReducer from "../slice/TranslateToEnglishSlice";
import generateImageReducer from "../slice/GenerateImageSlice";

export const store = configureStore({
  reducer: {
    createJobPost: createJobPostReducer,
    chatStream: chatStreamReducer,
    generateVideo: generateVideoReducer,
    translateToEnglish: translateToEnglishReducer,
    generateImage: generateImageReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
