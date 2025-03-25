import React from "react";
// import { useDispatch } from "react-redux";
// import { toggleLanguage } from "../../redux/slice/CreateJobSlice";
import bgimage from "./assets/bgimage.png";
import navlogo from "./assets/navlogo.png";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import { useNavigate } from "react-router-dom";
import GeneratedVideo from "../GenerateVideo/GeneratedVideo";

interface CreatedJobProps {
  jobPost: {
    german?: {
      Berufsbezeichnung?: string;
      ["Einleitung zur Stelle"]?: string;
      ["Aufgaben"]?: string;
      ["Qualifikationen"]?: string;
      ["Vorteile"]?: string;
      ["Handlungsaufforderung"]?: string;
    };
    english?: {
      ["Job Title"]?: string;
      ["Job Introduction"]?: string;
      ["Responsibilities"]?: string;
      ["Qualifications"]?: string;
      ["Benefits"]?: string;
      ["Call to Action"]?: string;
    };
  };
  language: string;
}

const CreatedJob: React.FC<CreatedJobProps> = ({ jobPost, language }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatAsList = (text?: string) => {
    return text
      ? text
          .split(/(?:\\n▶|\n▶|▶)| ->/)
          .map((item) => item.trim()) // Trim whitespace
          .filter((item) => item !== "") // Remove empty items
          .map((item, index) => (
            <li key={index} className="text-[#666666]">
              {item}
            </li>
          ))
      : null;
  };

  return (
    <div className="flex min-h-screen">
      {/* Blue Sidebar */}

      <div className="bg-[#0C2D48] w-[19rem] pt-8 space-y-4">
        <div className="flex items-center justify-between px-2">
          <img
            onClick={() => navigate("/")}
            src={navlogo}
            alt="Logo"
            className="mb-4 cursor-pointer w-15 h-10 px-2 "
          />
          <span className="text-sm">
            <ToggleLanguage
              colorScheme={language === "english" ? "pink" : "green"}
              textColor={language === "english" ? "text-white" : "text-white"}
            />
          </span>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            {/* <span className="text-white text-sm">1</span> */}
          </div>
          <div className="w-0.5 h-12 bg-white/30"></div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            {/* <span className="text-white/50 text-sm">2</span> */}
          </div>
          <div className="w-0.5 h-12 bg-white/30"></div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            {/* <span className="text-white/50 text-sm">3</span> */}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="flex-1 flex items-center justify-center"
      >
        <div className="flex flex-col items-center space-y-8 mt-11">
          <h3 className="text-[#5d5c61] uppercase bg-[#fff] font-bold tracking-[0.95px] text-center border rounded-full text-lg w-[112px] h-[35px] flex justify-center items-center">
            STEP 1
          </h3>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full mx-4 relative overflow-hidden">
            {/* Language Toggle Button */}
            {/* <div className="absolute top-4 right-4">
            <button
              onClick={() => dispatch(toggleLanguage())}
              className="px-4 py-2 bg-[#00B0F0] text-white rounded-full hover:bg-[#0091c7] transition-colors duration-300 text-sm"
            >
              {language === "german" ? "English" : "Deutsch"}
            </button>
          </div> */}

            {/* Job Title */}
            <h2 className="text-lg font-semibold text-[#000] mb-4">
              {language === "german"
                ? jobPost.german?.Berufsbezeichnung
                : jobPost.english?.["Job Title"]}
            </h2>

            {/* Job Introduction */}
            <p className="text-[#666666] mb-6 text-base">
              {language === "german"
                ? jobPost.german?.["Einleitung zur Stelle"]
                : jobPost.english?.["Job Introduction"]}
            </p>

            {/* Sections with consistent styling */}
            <div className="space-y-6">
              {/* Responsibilities */}
              <div>
                <h3 className="font-semibold text-[#000] mb-3">
                  Responsibilities:
                </h3>
                <ul className="list-disc list-inside">
                  {formatAsList(
                    language === "german"
                      ? jobPost.german?.["Aufgaben"]
                      : jobPost.english?.["Responsibilities"]
                  )}
                </ul>
              </div>

              {/* Qualifications */}
              <div>
                <h3 className="font-semibold text-[#000] mb-3">
                  Qualifications:
                </h3>
                <ul className="list-disc list-inside">
                  {formatAsList(
                    language === "german"
                      ? jobPost.german?.["Qualifikationen"]
                      : jobPost.english?.["Qualifications"]
                  )}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-semibold text-[#000] mb-3">Benefits:</h3>
                <ul className="list-disc list-inside">
                  {formatAsList(
                    language === "german"
                      ? jobPost.german?.["Vorteile"]
                      : jobPost.english?.["Benefits"]
                  )}
                </ul>
              </div>

              {/* Application */}
              <div>
                <h3 className="font-semibold text-[#000] mb-3">Application:</h3>
                <p className="text-[#666666]">
                  {language === "german"
                    ? jobPost.german?.["Handlungsaufforderung"]
                    : jobPost.english?.["Call to Action"]}
                </p>
              </div>
            </div>
          </div>
          <h2 className=" text-[#5d5c61] uppercase bg-[#fff] font-bold tracking-[0.95px] text-center border rounded-full text-lg w-[130px] h-[35px] flex justify-center items-center">
            final step
          </h2>
          <GeneratedVideo />
        </div>
      </div>
    </div>
  );
};

export default CreatedJob;
