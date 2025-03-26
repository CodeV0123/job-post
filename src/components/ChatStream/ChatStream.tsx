import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatStream,
  resetChatState,
} from "../../redux/slice/CreateStreamSlice";
import { RootState, AppDispatch } from "../../redux/store/store";
import NavBar from "../GenerateImage/NavBar";
import bgimage from "../GenerateImage/assets/bgimage.png";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
// import { ChevronRightIcon } from "@heroicons/react/24/solid";

const ChatStream = () => {
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { status, error } = useSelector((state: RootState) => state.chatStream);

  const chatResponse = useSelector(
    (state: RootState) => state.chatStream.chatResponse
  );
  console.log("ChatStream Component chatResponse:", chatResponse);

  const jobDescription = useSelector(
    (state: RootState) => state.createJob.jobPost
  );
  console.log("Job Description before dispatch:", jobDescription);

  console.log(chatResponse);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setMessage("Please enter a prompt!");
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    // const job_description = {};
    dispatch(
      fetchChatStream({ prompt, job_description: jobDescription || {} })
    );
  };

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/created-job");
    }
  }, [status, navigate]);

  const handleReset = () => {
    setPrompt("");
    dispatch(resetChatState());
  };

  return (
    <>
      <NavBar />
      <div
        className="flex justify-center items-center h-[90vh]"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#5d5c61] uppercase bg-[#fff] font-bold tracking-[0.95px] text-center border rounded-full text-xl w-[140px] h-[35px] flex justify-center items-center">
            Final Step
          </h1>
          <h2 className="bg-[#fff] text-[#5d5c61] capitalize text-3xl font-bold mt-5 border rounded-[15px] w-[560px] h-[50px] flex justify-center items-center mx-auto shadow-md">
            Chat Stream
          </h2>
          <div className="flex justify-center items-center mt-10 border rounded-[15px] w-[800px] h-[270px] bg-[#fff] p-6 shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center space-y-4"
            >
              <label htmlFor="prompt" className="text-[#5d5c61] text-lg">
                <span className="text-[#324c3d] font-semibold">PROMPT:</span>{" "}
                (Please prompt for additional details that you would like to
                amend!)
              </label>
              <input
                id="prompt"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your request"
                className="w-[70%] px-4 py-2 text-center border rounded-full text-[#5d5c61]"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-[#324c3d] text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Submitting..." : "SUBMIT"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-[#a9b7aa] text-[#fff] px-6 py-2 rounded-full hover:bg-gray-400 transition-colors"
                >
                  RESET
                </button>
              </div>
              {status === "failed" && (
                <p className="text-red-500 mt-4">{error}</p>
              )}
              <p className="text-red-500 mt-4">{message}</p>
            </form>
          </div>
          {/* {status === "succeeded" && chatResponse && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded overflow-x-auto">
              <h2 className="text-lg font-medium text-blue-700">
                Chat Response
              </h2> */}
          {/* <p className="mt-2 text-sm text-green-800">{successMessage}</p> */}
          {/* </div> */}
          {/* )} */}
        </div>

        {/* Toggle Language Button - Positioned at Bottom Right */}
        <div className="absolute bottom-5 right-5">
          <ToggleLanguage colorScheme="green" textColor="text-white" />
        </div>
      </div>
    </>
  );
};

export default ChatStream;
