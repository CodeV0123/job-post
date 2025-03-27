import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import bgimage from "./assets/bgimage.png";
import navlogo from "./assets/navlogo.png";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import { useNavigate } from "react-router-dom";
import GeneratedVideo from "../GenerateVideo/GeneratedVideo";
import { GeneratedImage } from "../GenerateImage/GeneratedImage";
import CreateJob from "../../components/SideBarComponents/CreateJob";
import GenerateImage from "../../components/SideBarComponents/GenerateImage";
import GenerateVideo from "../../components/SideBarComponents/GenerateVideo";
import ChatStream from "../../components/SideBarComponents/ChatStream";

interface CreatedJobProps {
  jobPost: {
    german?: {
      Berufsbezeichnung?: string;
      ["Einleitung zur Stelle"]?: string;
      ["Aufgaben"]?: string;
      ["Qualifikationen"]?: string;
      ["Vorteile"]?: string;
      ["Handlungsaufforderung"]?: string;
      ["location"]?: string;
      ["kontakt"]: {
        email?: string;
        telefon?: string;
        ansprechpartner?: string;
        bewerbungsfrist?: string;
      };
    };
    english?: {
      ["Job Title"]?: string;
      ["Job Introduction"]?: string;
      ["Responsibilities"]?: string;
      ["Qualifications"]?: string;
      ["Benefits"]?: string;
      ["location"]?: string;
      ["Call to Action"]?: string;
      ["contact"]: {
        email?: string;
        phone?: string;
        contact_person?: string;
        closing_date?: string;
      };
    };
  };
  voice: {
    german?: {
      kontakt: {
        email?: string;
        telefon?: string;
        ansprechpartner?: string;
        bewerbungsfrist?: string;
      };
    };
    english?: {
      contact: {
        email?: string;
        phone?: string;
        contact_person?: string;
        closing_date?: string;
        location?: string;
      };
    };
  };
  language: string;
}

const CreatedJob: React.FC<CreatedJobProps> = ({ jobPost, language }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { contact_person, phone, email, location } = useSelector(
    (state: RootState) => state.createJob
  );

  const formatAsList = (text?: string) => {
    return text
      ? text
          .split(/(?:\\n▶|\n▶|▶)|->| →|➜/)
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
    <div className="flex min-h-screen text-sm">
      {/* Blue Sidebar */}

      <div className="bg-[#0C2D48] w-[29rem] pt-8 space-y-4">
        <div className="flex items-center justify-between px-2">
          <img
            onClick={() => navigate("/")}
            src={navlogo}
            alt="Logo"
            className="cursor-pointer w-[110px] h-[110] px-2 "
          />
          <span>
            <ToggleLanguage
              colorScheme={language === "english" ? "pink" : "green"}
              textColor={language === "english" ? "text-white" : "text-white"}
            />
          </span>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="h-7 bg-[#59f7f2] rounded-full w-[70px] flex items-center justify-center">
            <span className="text-[#000] font-semibold text-sm uppercase">
              step 1
            </span>
          </div>
          <CreateJob />
          <span className="w-[70%] h-1.5 bg-[#4f6f90] rounded-full my-4"></span>
          <div className="h-7 bg-[#59f7f2] rounded-full w-[70px] flex items-center justify-center">
            <span className="text-[#000] font-semibold text-sm uppercase">
              step 2
            </span>
          </div>
          <GenerateImage />
          <span className="w-[70%] h-1.5 bg-[#4f6f90] rounded-full"></span>
          <div className="h-7 bg-[#59f7f2] rounded-full w-[70px] flex items-center justify-center">
            <span className="text-[#000] font-semibold text-sm uppercase">
              step 3
            </span>
          </div>
          <GenerateVideo />
          <span className="w-[70%] h-1.5 bg-[#4f6f90] rounded-full"></span>
          <div className="h-7 bg-[#59f7f2] rounded-full w-[85px] flex items-center justify-center">
            <span className="text-[#000] font-semibold text-sm uppercase">
              final step
            </span>
          </div>
          <ChatStream />
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
          <h3 className="text-[#5d5c61] uppercase bg-[#fff] font-medium  text-center border rounded-full text-base w-[90px] h-[30px] flex justify-center items-center">
            STEP 1
          </h3>
          <div className="bg-white rounded-lg  shadow-lg p-8 max-w-xl w-full mx-4 relative overflow-hidden">
            {/* Job Title */}
            <h2 className="text-sm font-semibold text-[#000] mb-4">
              {language === "german"
                ? jobPost.german?.Berufsbezeichnung
                : jobPost.english?.["Job Title"]}
            </h2>

            {/* Job Introduction */}
            <p className="text-[#666666] mb-6 ">
              {language === "german"
                ? jobPost.german?.["Einleitung zur Stelle"]
                : jobPost.english?.["Job Introduction"]}
            </p>

            {/* Sections with consistent styling */}
            <div className="space-y-6">
              {/* Responsibilities */}
              <div>
                <h3 className=" mb-3">Responsibilities:</h3>
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
                <h3 className=" mb-3">Qualifications:</h3>
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
                <h3 className="  mb-3">Benefits:</h3>
                <ul className="list-disc list-inside">
                  {formatAsList(
                    language === "german"
                      ? jobPost.german?.["Vorteile"]
                      : jobPost.english?.["Benefits"]
                  )}
                </ul>
              </div>

              {/* Application */}
              <div className="flex flex-col flex-grow mb-2">
                <h3 className="text-sm mb-1">
                  Interested? <br /> Then apply now!
                </h3>
                <p className="text-[#666666]">
                  {language === "german"
                    ? jobPost.german?.["Handlungsaufforderung"]
                    : jobPost.english?.["Call to Action"]}
                </p>
                <p>{location || "Not available"}</p>
              </div>

              {/* Contact Details Section */}
              <div className="mt-2">
                <h3 className=" text-sm">Contact Person:</h3>
                <p className="text-sm">{contact_person || ""}</p>
                <p className="text-sm">Phone : {phone || "Not available"}</p>
                <p className="text-sm">Email : {email || "Not available"}</p>
              </div>
              <GeneratedVideo />
            </div>
          </div>
          <h2 className=" text-[#5d5c61] uppercase bg-[#fff] font-medium  text-center border rounded-full text-base w-[90px] h-[30px] flex justify-center items-center">
            step 2
          </h2>
          <GeneratedImage />
          <h2 className=" text-[#5d5c61] uppercase bg-[#fff] font-medium  text-center border rounded-full text-base w-[90px] h-[30px] flex justify-center items-center">
            step 3
          </h2>
          <GeneratedVideo />
        </div>
      </div>
    </div>
  );
};

export default CreatedJob;
