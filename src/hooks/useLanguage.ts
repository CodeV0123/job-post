import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store"; // Adjust the import path as necessary
import { toggleLanguage } from "../redux/slice/LanguageSlice";

export const useLanguage = () => {
  const { isEnglish } = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch();

  const translate = useCallback(
    (en: string, de: string) => {
      return isEnglish ? en : de;
    },
    [isEnglish]
  );

  return {
    isEnglish,
    toggleLanguage: () => dispatch(toggleLanguage()),
    translate,
  };
};
