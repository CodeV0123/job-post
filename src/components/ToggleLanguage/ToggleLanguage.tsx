import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "../../redux/slice/CreateJobSlice";

const ToggleLanguage = ({
  colorScheme,
  textColor,
}: {
  colorScheme: "green" | "pink";
  textColor: "text-white" | "text-gray-700";
}) => {
  const dispatch = useDispatch();
  const language = useSelector(
    (state: { createJob: { language: string } }) => state.createJob.language
  );

  const activeColor = colorScheme === "green" ? "bg-[#324c3d]" : "bg-[#daa0b5]";
  return (
    <div className="flex flex-col items-center">
      <span className={`font-semibold text-center text-sm mb-2 ${textColor}`}>
        TOGGLE <br /> LANGUAGE
      </span>
      <div
        className={`relative w-24 h-8 flex items-center rounded-full cursor-pointer transition-all duration-300 ${
          language === "english" ? activeColor : "bg-gray-400"
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
