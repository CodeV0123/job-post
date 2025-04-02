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
// import { ChevronRightIcon } from "@heroicons/react/24/solid";

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

// const CreatedJob: React.FC<CreatedJobProps> = ({ jobPost, language }) => {
//   // const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { contact_person, phone, email, location, website } = useSelector(
//     (state: RootState) => state.createJob
//   );

//   const formatAsList = (text?: string) => {
//     return text
//       ? text
//           .split(/(?:\\n▶|\n▶|▶)|->| →|➜/)
//           .map((item) => item.trim()) // Trim whitespace
//           .filter((item) => item !== "") // Remove empty items
//           .map((item, index) => (
//             <li key={index} className="text-[#666666]">
//               {item}
//             </li>
//           ))
//       : null;
//   };

//   return (
//     <div className="flex min-h-screen text-sm">
//       {/* Blue Sidebar */}

//       <div className="bg-[#0C2D48] w-[29rem] pt-8 space-y-4">
//         <div className="flex items-center justify-between px-2">
//           <img
//             onClick={() => navigate("/")}
//             src={navlogo}
//             alt="Logo"
//             className="cursor-pointer w-[110px] h-[110] px-2 "
//           />
//           <span>
//             <ToggleLanguage
//               colorScheme={language === "english" ? "pink" : "green"}
//               textColor={language === "english" ? "text-white" : "text-white"}
//             />
//           </span>
//         </div>
//         <div className="flex flex-col items-center space-y-4">
//           <div className="h-7 bg-[#59f7f2] rounded-full w-[70px] flex items-center justify-center">
//             <span className="text-[#000] font-semibold text-sm uppercase">
//               step 1
//             </span>
//           </div>
//           <CreateJob />
//           <span className="w-[70%] h-1.5 bg-[#4f6f90] rounded-full my-4"></span>
//           <div className="h-7 bg-[#59f7f2] rounded-full w-[70px] flex items-center justify-center">
//             <span className="text-[#000] font-semibold text-sm uppercase">
//               step 2
//             </span>
//           </div>
//           <GenerateImage />
//           <span className="w-[70%] h-1.5 bg-[#4f6f90] rounded-full"></span>
//           <div className="h-7 bg-[#59f7f2] rounded-full w-[70px] flex items-center justify-center">
//             <span className="text-[#000] font-semibold text-sm uppercase">
//               step 3
//             </span>
//           </div>
//           <GenerateVideo />
//           <span className="w-[70%] h-1.5 bg-[#4f6f90] rounded-full"></span>
//           <div className="h-7 bg-[#59f7f2] rounded-full w-[85px] flex items-center justify-center">
//             <span className="text-[#000] font-semibold text-sm uppercase">
//               final step
//             </span>
//           </div>
//           <ChatStream />
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div
//         style={{
//           backgroundImage: `url(${bgimage})`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//         className="flex-1 flex items-center justify-center"
//       >
//         <div className="flex flex-col items-center space-y-8 mt-11">
//           <h3 className="text-[#5d5c61] uppercase bg-[#fff] font-medium  text-center border rounded-full text-base w-[90px] h-[30px] flex justify-center items-center">
//             STEP 1
//           </h3>
//           <div className="bg-white rounded-lg  shadow-lg p-8 max-w-xl w-full mx-4 relative overflow-hidden">
//             {/* Job Title */}
//             <h2 className="text-sm font-semibold text-[#000] mb-4">
//               {language === "german"
//                 ? jobPost.german?.Berufsbezeichnung
//                 : jobPost.english?.["Job Title"]}
//             </h2>

//             {/* Job Introduction */}
//             <p className="text-[#666666] mb-6 ">
//               {language === "german"
//                 ? jobPost.german?.["Einleitung zur Stelle"]
//                 : jobPost.english?.["Job Introduction"]}
//             </p>

//             {/* Sections with consistent styling */}
//             <div className="space-y-6">
//               {/* Responsibilities */}
//               <div>
//                 <h3 className=" mb-3">Responsibilities:</h3>
//                 <ul className="list-disc list-inside">
//                   {formatAsList(
//                     language === "german"
//                       ? jobPost.german?.["Aufgaben"]
//                       : jobPost.english?.["Responsibilities"]
//                   )}
//                 </ul>
//               </div>

//               {/* Qualifications */}
//               <div>
//                 <h3 className=" mb-3">Qualifications:</h3>
//                 <ul className="list-disc list-inside">
//                   {formatAsList(
//                     language === "german"
//                       ? jobPost.german?.["Qualifikationen"]
//                       : jobPost.english?.["Qualifications"]
//                   )}
//                 </ul>
//               </div>

//               {/* Benefits */}
//               <div>
//                 <h3 className="  mb-3">Benefits:</h3>
//                 <ul className="list-disc list-inside">
//                   {formatAsList(
//                     language === "german"
//                       ? jobPost.german?.["Vorteile"]
//                       : jobPost.english?.["Benefits"]
//                   )}
//                 </ul>
//               </div>

//               {/* Application */}
//               <div className="flex flex-col flex-grow mb-2">
//                 <h3 className="text-sm mb-1">
//                   Interested? <br /> Then apply now!
//                 </h3>
//                 <p className="text-[#666666]">
//                   {language === "german"
//                     ? jobPost.german?.["Handlungsaufforderung"]
//                     : jobPost.english?.["Call to Action"]}
//                 </p>
//                 <p>{website || ""}</p>
//                 <p>{location || "Not available"}</p>
//               </div>

//               {/* Contact Details Section */}
//               <div className="mt-2">
//                 <h3 className=" text-sm">Contact Person:</h3>
//                 <p className="text-sm">{contact_person || ""}</p>
//                 <p className="text-sm">Phone : {phone || "Not available"}</p>
//                 <p className="text-sm">Email : {email || "Not available"}</p>
//               </div>
//               <GeneratedVideo />
//             </div>
//           </div>
//           <h2 className=" text-[#5d5c61] uppercase bg-[#fff] font-medium  text-center border rounded-full text-base w-[90px] h-[30px] flex justify-center items-center">
//             step 2
//           </h2>
//           <GeneratedImage />
//           <h2 className=" text-[#5d5c61] uppercase bg-[#fff] font-medium  text-center border rounded-full text-base w-[90px] h-[30px] flex justify-center items-center">
//             step 3
//           </h2>
//           <GeneratedVideo />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatedJob;

const CreatedJob: React.FC<CreatedJobProps> = ({ jobPost, language }) => {
  const navigate = useNavigate();

  const { contact_person, phone, email, location, website } = useSelector(
    (state: RootState) => state.createJob
  );

  const formatAsList = (text?: string) => {
    return text
      ? text
          .split(/(?:\\n▶|\n▶|▶)|->| →|➜/)
          .map((item) => item.trim())
          .filter((item) => item !== "")
          .map((item, index) => (
            <li key={index} className="text-[#666666] mb-1">
              {item}
            </li>
          ))
      : null;
  };

  return (
    <div className="flex min-h-screen text-sm">
      {/* Sidebar - Hidden on smaller screens */}
      <div className="hidden lg:block bg-[#0C2D48] w-[29rem] pt-8 space-y-4">
        <div className="flex items-center justify-between px-2">
          <img
            onClick={() => navigate("/")}
            src={navlogo}
            alt="Logo"
            className="cursor-pointer w-[110px] h-[110] px-2"
          />
          <span>
            <ToggleLanguage
              colorScheme={language === "english" ? "pink" : "green"}
              textColor={language === "english" ? "text-white" : "text-white"}
            />
          </span>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="h-7 bg-[#59f7f2] rounded-full w-[90px] flex items-center justify-center">
            <span className="text-[#000] font-semibold text-sm uppercase">
              {language === "english" ? "step 1" : "Schritt 1"}
            </span>
          </div>
          <CreateJob />
          <span className="w-[70%] h-1.5 bg-[#4f6f90] rounded-full my-4"></span>
          <div className="h-7 bg-[#59f7f2] rounded-full w-[90px] flex items-center justify-center">
            <span className="text-[#000] font-semibold text-sm uppercase">
              {language === "english" ? "step 2" : "Schritt 2"}
            </span>
          </div>
          <GenerateImage />
          <span className="w-[70%] h-1.5 bg-[#4f6f90] rounded-full"></span>
          <div className="h-7 bg-[#59f7f2] rounded-full w-[90px] flex items-center justify-center">
            <span className="text-[#000] font-semibold text-sm uppercase">
              {language === "english" ? "step 3" : "Schritt 3"}
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

      {/* Main Content Area - Fully Responsive */}
      <div
        style={{
          backgroundImage: `url(${bgimage})`,
        }}
        className="flex-1 flex items-center justify-center p-4 bg-cover bg-no-repeat"
      >
        <div className="w-full max-w-xl space-y-8">
          {/* Mobile Top Navigation */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <img
              onClick={() => navigate("/")}
              src={navlogo}
              alt="Logo"
              className="cursor-pointer w-20 h-20"
            />
            <ToggleLanguage
              colorScheme={language === "english" ? "pink" : "green"}
              textColor={language === "english" ? "text-white" : "text-white"}
            />
          </div>

          {/* Step 1 Indicator */}
          <h3 className="text-[#5d5c61] uppercase bg-[#fff] font-medium text-center border rounded-full text-base w-[90px] h-[30px] flex justify-center items-center mx-auto">
            {language === "english" ? "STEP 1" : "SCHRITT 1"}
          </h3>

          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 w-full mx-auto relative overflow-hidden">
            {/* Job Title */}
            <h2 className="text-base md:text-base font-semibold text-[#000] mb-4">
              {language === "german"
                ? jobPost.german?.Berufsbezeichnung
                : jobPost.english?.["Job Title"]}
            </h2>

            {/* Job Introduction */}
            <p className="text-[#666666] mb-6 text-sm md:text-sm">
              {language === "german"
                ? jobPost.german?.["Einleitung zur Stelle"]
                : jobPost.english?.["Job Introduction"]}
            </p>

            {/* Sections with responsive typography */}
            <div className="space-y-4 md:space-y-6">
              {/* Responsibilities */}
              <div>
                <h3 className="text-sm md:text-sm mb-3">
                  {language === "english" ? "Responsibilities:" : "Aufgaben:"}
                </h3>
                <ul className="list-disc list-inside text-xs md:text-sm">
                  {formatAsList(
                    language === "german"
                      ? jobPost.german?.["Aufgaben"]
                      : jobPost.english?.["Responsibilities"]
                  )}
                </ul>
              </div>

              {/* Qualifications */}
              <div>
                <h3 className="text-sm md:text-sm mb-3">
                  {language === "english"
                    ? "Qualifications:"
                    : "Qualifikationen:"}
                </h3>
                <ul className="list-disc list-inside text-xs md:text-sm">
                  {formatAsList(
                    language === "german"
                      ? jobPost.german?.["Qualifikationen"]
                      : jobPost.english?.["Qualifications"]
                  )}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-sm md:text-sm mb-3">
                  {language === "english" ? "Benefits:" : "Vorteile:"}
                </h3>
                <ul className="list-disc list-inside text-xs md:text-sm">
                  {formatAsList(
                    language === "german"
                      ? jobPost.german?.["Vorteile"]
                      : jobPost.english?.["Benefits"]
                  )}
                </ul>
              </div>

              {/* Application */}
              <div className="flex flex-col mb-2 text-xs md:text-sm">
                <h3 className="text-sm md:text-sm mb-1">
                  {language === "english" ? "Interested?" : "Interessiert?"}{" "}
                  <br />{" "}
                  {language === "english"
                    ? "Then apply now!"
                    : "Dann bewerben Sie sich jetzt!"}
                </h3>
                <p className="text-[#666666]">
                  {language === "german"
                    ? jobPost.german?.["Handlungsaufforderung"]
                    : jobPost.english?.["Call to Action"]}
                </p>
                <p>{website || ""}</p>
                <p>{location || "Not available"}</p>
              </div>

              {/* Contact Details Section */}
              <div className="mt-2 text-xs md:text-sm">
                <h3 className="text-sm md:text-sm">
                  {language === "english"
                    ? "Contact Person:"
                    : "Ansprechpartner:"}
                </h3>
                <p>{contact_person || ""}</p>
                <p>Phone: {phone || "Not available"}</p>
                <p>Email: {email || "Not available"}</p>
              </div>

              <GeneratedVideo />
            </div>
          </div>
          {/* Forward Chevron Icon */}

          {/* <button
            onClick={() => navigate("/chat-stream")}
            className="fixed right-[40%] bottom-4 sm:right-10 sm:top-[100px] sm:bottom-auto 
               bg-gradient-to-r from-[#8bbee0] to-[#5d5c61] text-white 
               p-3 sm:p-4 rounded-full shadow-xl transition-transform duration-300 
               ease-in-out hover:scale-110 hover:shadow-2xl animate-bounce"
          >
            <ChevronRightIcon
              className="w-7 h-7 sm:w-9 sm:h-9"
              strokeWidth={3}
              stroke="white"
            />
          </button> */}

          {/* Responsive Steps for Generated Content */}
          <div className="space-y-8">
            <h2 className="text-[#5d5c61] uppercase bg-[#fff] font-medium text-center border rounded-full text-base w-[90px] h-[30px] flex justify-center items-center mx-auto">
              {language === "english" ? "STEP 2" : "SCHRITT 2"}
            </h2>
            <GeneratedImage />

            <h2 className="text-[#5d5c61] uppercase bg-[#fff] font-medium text-center border rounded-full text-base w-[90px] h-[30px] flex justify-center items-center mx-auto">
              {language === "english" ? "STEP 3" : "SCHRITT 3"}
            </h2>
            <GeneratedVideo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedJob;
