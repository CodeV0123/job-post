import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatStream,
  resetChatState,
} from "../../redux/slice/CreateStreamSlice";
import { RootState, AppDispatch } from "../../redux/store/store";

const ChatStream = () => {
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

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

  const handleReset = () => {
    setPrompt("");
    dispatch(resetChatState());
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h2 className="bg-[#fff] text-[#000] text-xl px-10 capitalize border rounded-full flex justify-center items-center mx-auto shadow-md">
          Chat Stream
        </h2>
        <div className="flex justify-center flex-col items-center mt-10 border rounded-[15px] w-[25rem] h-[14rem]  bg-[#fff] p-6 shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center space-y-4"
          >
            <label htmlFor="prompt" className="text-[#5d5c61] flex flex-col">
              <span className="text-[#000] font-semibold">PROMPT:</span> (Please
              prompt for additional details that you would like to amend!)
            </label>
            <input
              id="prompt"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your request"
              className="w-full px-4 py-2 text-center border rounded-full text-[#5d5c61]"
            />
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-[#3a7384] text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting..." : "SUBMIT"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-[#f2a078] text-[#fff] px-6 py-2 rounded-full hover:bg-gray-400 transition-colors"
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
      </div>
    </>
  );
};

export default ChatStream;
