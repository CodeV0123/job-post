import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import {
  fetchChatStream,
  resetChatState,
} from "../redux/slice/CreateStreamSlice";

const ChatStream: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chatResponse, status, error } = useSelector(
    (state: RootState) => state.chatStream
  );
  const [jobDescription, setJobDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const parsedJobDescription = JSON.parse(jobDescription);
      if (!parsedJobDescription || !prompt.trim()) {
        setTimeout(() => setMessage(""), 3000);
        setMessage("Job Description and Prompt are required.");
        return;
      }
      dispatch(
        fetchChatStream({ job_description: parsedJobDescription, prompt })
      );
    } catch (error) {
      console.log("Invalid JSON format:", error);
      setTimeout(() => setMessage(""), 3000);
      setMessage("Invalid JSON format in Job Description!");
    }
  };

  const handleReset = () => {
    dispatch(resetChatState());
    setJobDescription("");
    setPrompt("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Chat Stream</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="jobDescription"
            className="block text-gray-700 font-medium mb-2"
          >
            Job Description:
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter any property from CreateJob"
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <div>
          <label
            htmlFor="prompt"
            className="block text-gray-700 font-medium mb-2"
          >
            Prompt:
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your change request"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {status === "loading" ? "Processing..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 bg-gray-600 text-white font-medium rounded hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
        <p className="mt-2 text-sm text-red-800">{message}</p>
      </form>

      {status === "succeeded" && chatResponse && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded overflow-x-auto">
          <h2 className="text-lg font-medium text-blue-700">Chat Response</h2>
          <pre className="mt-2 text-gray-700">{chatResponse}</pre>
        </div>
      )}

      {status === "failed" && error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-lg font-medium text-red-700">Error</h2>
          <p className="mt-2 text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ChatStream;
