import { configureStore } from "@reduxjs/toolkit";
import createJobPostReducer from "../slice/CreateJobPostSlice";

export const store = configureStore({
  reducer: {
    createJobPost: createJobPostReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
