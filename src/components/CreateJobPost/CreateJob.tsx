// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { resetState, createJobPost } from "../../redux/slice/CreateJobSlice";
// import { RootState, store } from "../../redux/store/store";
// import bgimage from "./assets/cjp_bgimage.png";
// import NavBar from "./NavBar";
// import { ChevronRightIcon } from "@heroicons/react/24/solid";

// const CreateJob = () => {
//   const dispatch = useDispatch<typeof store.dispatch>();
//   const navigate = useNavigate();
//   const { status } = useSelector((state: RootState) => state.createJob);
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState<string | null>(null);
//   const [fileName, setFileName] = useState<string>("No file chosen");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//       setFileName(e.target.files[0].name);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) {
//       setTimeout(() => {
//         setMessage(null);
//       }, 3000);
//       setMessage("Please select a file to upload");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     dispatch(createJobPost(formData));
//   };

//   const handleReset = () => {
//     dispatch(resetState());
//     setFile(null);
//     setFileName("No file chosen");
//     console.log("button clicked");
//   };

//   return (
//     <div>
//       <NavBar />
//       <div
//         className="flex justify-center items-center h-[90vh]"
//         style={{
//           backgroundImage: `url(${bgimage})`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <div className="flex flex-col items-center">
//           <h1 className="text-[#5d5c61] uppercase bg-[#fff] font-bold tracking-[0.95px] text-center border rounded-full text-xl w-[112px] h-[35px] flex justify-center items-center">
//             STEP 1
//           </h1>
//           <h2 className="bg-[#fff] text-[#5d5c61] text-3xl capitalize font-bold mt-5 border rounded-[15px] w-[560px] h-[50px] flex justify-center items-center mx-auto shadow-md">
//             Create Job Post
//           </h2>
//           <div className="flex justify-center items-center mt-10 border rounded-[15px] w-[800px] h-[240px] bg-[#fff] p-[20px] shadow-md">
//             <form
//               onSubmit={handleSubmit}
//               className="w-full flex flex-col items-center justify-center"
//             >
//               {/* Centered label */}
//               <label
//                 htmlFor="file"
//                 className="uppercase font-bold text-[#5d5c61] text-center w-full mb-6"
//               >
//                 UPLOAD JOB POST DOCUMENT
//               </label>

//               {/* Custom file input that matches the screenshot */}
//               <div className="flex justify-center items-center gap-2 mb-8">
//                 <label
//                   htmlFor="file"
//                   className="bg-gray-200 hover:bg-gray-300 text-[#5d5c61] py-2 px-4 rounded-full cursor-pointer text-sm"
//                 >
//                   Choose File
//                 </label>
//                 <span className="text-[#777777]">{fileName}</span>
//                 <input
//                   type="file"
//                   id="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleFileChange}
//                   className="hidden" // Hide the default file input
//                 />
//               </div>

//               {/* Centered buttons */}
//               <div className="flex justify-center gap-4">
//                 <button
//                   type="submit"
//                   disabled={status === "loading"}
//                   className="px-6 py-2 bg-[#8bbee0] text-white font-medium rounded-full hover:bg-blue-700 disabled:bg-blue-300"
//                 >
//                   {status === "loading" ? "Uploading..." : "Submit"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleReset}
//                   className="px-6 py-2 bg-[#e9deef] text-[#73737f] font-medium rounded-full hover:bg-gray-100"
//                 >
//                   Reset
//                 </button>
//               </div>

//               <p className="mt-4 text-center text-sm text-red-800">{message}</p>
//             </form>
//           </div>
//         </div>
//         {/* Forward Chevron Icon */}
//         {status === "succeeded" && (
//           <button
//             onClick={() => navigate("/generate-image")}
//             className="absolute right-10 transform -translate-y-1/5 bg-[#fff] p-2 rounded-full"
//           >
//             <ChevronRightIcon
//               className="w-8 h-8"
//               strokeWidth={3}
//               stroke="#5d5c61"
//             />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateJob;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetState,
  createJobPost,
  // toggleLanguage,
} from "../../redux/slice/CreateJobSlice";
import { RootState, store } from "../../redux/store/store";
import bgimage from "./assets/cjp_bgimage.png";
import NavBar from "./NavBar";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
// import CreatedJob from "../CreatedJob/CreatedJob";

const CreateJob = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();

  // Get Redux state
  const { status } = useSelector((state: RootState) => state.createJob);

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    dispatch(createJobPost(formData));
  };

  const handleReset = () => {
    dispatch(resetState());
    setFile(null);
    setFileName("No file chosen");
  };

  return (
    <div>
      <NavBar />
      <div
        className="flex flex-col justify-center items-center h-[90vh] p-4"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Upload Section */}
        <div className="flex flex-col items-center">
          <h1 className="text-[#5d5c61] uppercase bg-[#fff] font-bold tracking-[0.95px] text-center border rounded-full text-xl w-[112px] h-[35px] flex justify-center items-center">
            STEP 1
          </h1>
          <h2 className="bg-[#fff] text-[#5d5c61] text-3xl capitalize font-bold mt-5 border rounded-[15px] w-[560px] h-[50px] flex justify-center items-center mx-auto shadow-md">
            Create Job Post
          </h2>
          <div className="flex justify-center items-center mt-10 border rounded-[15px] w-[800px] h-[240px] bg-[#fff] p-[20px] shadow-md">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center"
            >
              <label className="uppercase font-bold text-[#5d5c61] text-center w-full mb-6">
                UPLOAD JOB POST DOCUMENT
              </label>
              <div className="flex justify-center items-center gap-2 mb-8">
                <label
                  htmlFor="file"
                  className="bg-gray-200 hover:bg-gray-300 text-[#5d5c61] py-2 px-4 rounded-full cursor-pointer text-sm"
                >
                  Choose File
                </label>
                <span className="text-[#777777]">{fileName}</span>
                <input
                  type="file"
                  id="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-2 bg-[#8bbee0] text-white font-medium rounded-full hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {status === "loading" ? "Uploading..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-[#e9deef] text-[#73737f] font-medium rounded-full hover:bg-gray-100"
                >
                  Reset
                </button>
              </div>
              <p className="mt-4 text-center text-sm text-red-800">{message}</p>
            </form>
          </div>
        </div>
        {/* {status === "succeeded" && jobPost && (
          <CreatedJob jobPost={jobPost} language={language} />
        )} */}

        {/* Display Created Job
        
        {status === "succeeded" && jobPost && (
          <div className="mt-10 border rounded-lg w-[800px] bg-white p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {language === "german"
                  ? jobPost.german?.Berufsbezeichnung
                  : jobPost.english?.["Job Title"]}
              </h2>
              <button
                onClick={() => dispatch(toggleLanguage())}
                className="px-4 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
              >
                {language === "german" ? "English" : "Deutsch"}
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              {language === "german"
                ? jobPost.german?.["Einleitung zur Stelle"]
                : jobPost.english?.["Job Introduction"]}
            </p>
            <h3 className="text-lg font-semibold text-gray-800">
              Responsibilities:
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {language === "german"
                ? jobPost.german?.["Aufgaben"]
                : jobPost.english?.["Responsibilities"]}
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">
              Qualifications:
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {language === "german"
                ? jobPost.german?.["Qualifikationen"]
                : jobPost.english?.["Qualifications"]}
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">
              Benefits:
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {language === "german"
                ? jobPost.german?.["Vorteile"]
                : jobPost.english?.["Benefits"]}
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">
              Application:
            </h3>
            <p className="text-gray-700">
              {language === "german"
                ? jobPost.german?.["Handlungsaufforderung"]
                : jobPost.english?.["Call to Action"]}
            </p>
          </div>
        )} */}

        {/* Forward Button */}
        {status === "succeeded" && (
          <button
            onClick={() => navigate("/generate-image")}
            className="absolute right-10 transform -translate-y-1/5 bg-[#fff] p-2 rounded-full"
          >
            <ChevronRightIcon
              className="w-8 h-8"
              strokeWidth={3}
              stroke="#5d5c61"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateJob;
