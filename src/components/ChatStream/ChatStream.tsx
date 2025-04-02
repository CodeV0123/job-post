import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatStream,
  resetChatState,
} from "../../redux/slice/CreateStreamSlice";
import { RootState, AppDispatch } from "../../redux/store/store";
import NavBar from "../GenerateImage/NavBar";
import bgimage from "../GenerateImage/assets/bgimage.png";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";

const ChatStream = () => {
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();

  const { status, error, chatResponse } = useSelector(
    (state: RootState) => state.chatStream
  );

  const jobDescription = useSelector(
    (state: RootState) => state.createJob.jobPost
  );

  const { language } = useSelector((state: RootState) => state.createJob);

  // useEffect(() => {
  //   if (status === "succeeded") {
  //     setTimeout(() => navigate("/created-job"), 3000); // Redirect after showing response
  //   }
  // }, [status, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setMessage("Please enter a prompt!");
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    dispatch(
      fetchChatStream({ prompt, job_description: jobDescription || {} })
    );
  };

  const handleReset = () => {
    setPrompt("");
    dispatch(resetChatState());
  };

  return (
    <>
      <NavBar>
        {/* Add ToggleLanguage to NavBar for small screens */}
        <div className="block sm:hidden">
          <ToggleLanguage colorScheme="green" textColor="text-gray-700" />
        </div>
      </NavBar>
      <div
        className="flex justify-center items-center h-[90vh]"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <h1
            className={`text-[#5d5c61] uppercase bg-[#fff] font-bold text-center border rounded-full 
              flex justify-center items-center tracking-wide 
              ${language === "english" ? "w-[140px]" : "w-[160px]"} h-[35px]`}
          >
            {language === "english" ? "Final Step" : "Letzter Schritt"}
          </h1>
          <h2 className="bg-[#fff] text-[#5d5c61] capitalize text-3xl font-bold mt-5 border rounded-[15px] w-[560px] h-[50px] flex justify-center items-center mx-auto shadow-md">
            {language === "english" ? "Chat Stream" : "Chat Stream"}
          </h2>
          <div className="flex justify-center items-center mt-10 border rounded-[15px] w-[800px] bg-[#fff] p-6 shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center space-y-4"
            >
              <label htmlFor="prompt" className="text-[#5d5c61] text-lg">
                <span className="text-[#324c3d] font-semibold">
                  {" "}
                  {language === "english" ? "PROMPT:" : "PROMPT:"}
                </span>{" "}
                {language === "english"
                  ? "(Please prompt for additional details that you would like to amend!)"
                  : "(Bitte geben Sie zusätzliche Angaben an, die Sie ändern möchten!)"}
              </label>
              <input
                id="prompt"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  language === "english"
                    ? "Enter your request"
                    : "Geben Sie Ihre Anfrage ein"
                }
                className="w-[70%] px-4 py-2 text-center border rounded-full text-[#5d5c61]"
              />
              <div className="flex justify-end space-x-8">
                <button
                  type="submit"
                  className="bg-[#324c3d] text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors"
                  disabled={status === "loading"}
                >
                  {status === "loading"
                    ? language === "english"
                      ? "Submitting..."
                      : "Einreichen..."
                    : status === "succeeded"
                    ? language === "english"
                      ? "Submitted"
                      : "Eingereicht"
                    : language === "english"
                    ? "Submit"
                    : "Einreichen"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-[#a9b7aa] text-[#fff] px-6 py-2 rounded-full hover:bg-gray-400 transition-colors"
                >
                  {language === "english" ? "Reset" : "Zurücksetzen"}
                </button>
              </div>
              {status === "failed" && (
                <p className="text-red-500 mt-4">{error}</p>
              )}
              {message && <p className="text-red-500 mt-4">{message}</p>}
            </form>
          </div>

          {/* Display Chat Response */}
          {status === "loading" && (
            <p className="mt-6 text-blue-500">Fetching response...</p>
          )}

          {status === "succeeded" && chatResponse && (
            <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg w-[800px] shadow-md">
              <h2 className="text-lg font-bold text-blue-700">Chat Response</h2>
              <pre className="mt-2 p-2 bg-gray-200 rounded-lg text-sm">
                {JSON.stringify(chatResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Toggle Language Button */}
        <div className="absolute bottom-5 right-5">
          <ToggleLanguage colorScheme="green" textColor="text-white" />
        </div>
      </div>
    </>
  );
};

export default ChatStream;
