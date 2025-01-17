import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import {
  fetchChatStream,
  resetChatState,
} from "../redux/slice/CreateStreamSlice";
import { updateJobFields } from "../redux/slice/CreateJobPostSlice";

const ChatStream: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chatResponse, status, error } = useSelector(
    (state: RootState) => state.chatStream
  );
  const { job } = useSelector((state: RootState) => state.createJobPost);

  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) {
      setMessage(
        isEnglish
          ? "Please create a job post first!"
          : "Bitte erstellen Sie zuerst einen Job-Post!"
      );
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    dispatch(fetchChatStream({ prompt, job_description: job, isEnglish }))
      .unwrap()
      .then((response) => {
        console.log("Response from fetchChatStream:", response);
        // Dispatch the updated fields to CreateJob
        if (typeof response === "object") {
          dispatch(updateJobFields(response));
          setSuccessMessage(
            isEnglish
              ? "Job post updated successfully!"
              : "Job-Post erfolgreich aktualisiert!"
          );
          setTimeout(() => setSuccessMessage(""), 3000);
        } else {
          console.error("Invalid response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching chat stream:", error);
      });
  };

  const handleReset = () => {
    dispatch(resetChatState());
    setPrompt("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md sm:p-8 lg:max-w-5xl">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center sm:text-3xl">
        <span className="italic text-gray-400 text-base">
          {isEnglish ? "[Final Step]:" : "[Letzter Schritt]:"}{" "}
        </span>
        {isEnglish ? "Chat Stream" : "Chat-Stream"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="prompt"
            className="block text-gray-700 font-medium mb-2"
          >
            {isEnglish ? "Prompt:" : "Prompt:"}{" "}
            <span className="text-gray-600 italic text-xs block sm:inline">
              {isEnglish
                ? "(Please prompt for additional details that you would like to amend!)"
                : "(Bitte geben Sie weitere Details an, die Sie ändern möchten!)"}
            </span>
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              isEnglish ? "Enter your request" : "Geben Sie Ihre Anfrage ein"
            }
            className="w-full p-2 border rounded text-sm sm:text-base focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {status === "loading"
              ? isEnglish
                ? "Processing..."
                : "Verarbeitung..."
              : isEnglish
              ? "Submit"
              : "Einreichen"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white font-medium rounded hover:bg-gray-700"
          >
            {isEnglish ? "Reset" : "Zurücksetzen"}
          </button>
        </div>
        <p className="text-sm text-red-800">{message}</p>
      </form>

      {status === "succeeded" && chatResponse && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded overflow-x-auto">
          <h2 className="text-lg font-medium text-blue-700">
            {isEnglish ? "Chat Response" : "Chat-Antwort"}
          </h2>
          <p className="mt-2 text-sm text-green-800">{successMessage}</p>
          {/* <pre className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
            {typeof chatResponse === "object"
              ? JSON.stringify(chatResponse, null, 2)
              : chatResponse}
          </pre> */}
        </div>
      )}

      {status === "failed" && error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-lg font-medium text-red-700">
            {isEnglish ? "Error" : "Fehler"}
          </h2>
          <p className="mt-2 text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ChatStream;
