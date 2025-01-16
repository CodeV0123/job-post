// redux/slice/LanguageSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface LanguageState {
  isEnglish: boolean;
}

const initialState: LanguageState = {
  isEnglish: false, // Default to German
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.isEnglish = !state.isEnglish;
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
