import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "../../redux/slice/CreateJobSlice";

const ToggleLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector(
    (state: { createJob: { language: string } }) => state.createJob.language
  );
  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-700 font-semibold text-center text-sm mb-2">
        TOGGLE <br /> LANGUAGE
      </span>
      <div
        className={`relative w-24 h-8 flex items-center rounded-full cursor-pointer transition-all duration-300 ${
          language === "english" ? "bg-pink-300" : "bg-gray-400"
        }`}
        onClick={() => dispatch(toggleLanguage())}
      >
        <div
          className={`absolute left-1 top-1 h-6 w-6 bg-white rounded-full shadow-md transition-all duration-300 ${
            language === "english" ? "translate-x-16" : "translate-x-0"
          }`}
        ></div>
        <span
          className={`absolute left-3 right-3 text-xs font-medium text-white transition-all duration-300 ${
            language === "english" ? "translate-x-0" : "translate-x-6"
          }`}
        >
          {language === "german" ? "German" : "English"}
        </span>
      </div>
    </div>
  );
};

export default ToggleLanguage;
