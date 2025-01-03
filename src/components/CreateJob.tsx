import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { createJobPost, resetState } from "../redux/slice/CreateJobPostSlice";
import ChatStream from "./ChatStream";
import GenerateVideo from "./GenerateVideo";

const CreateJobPost: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { job, status, error } = useSelector(
    (state: RootState) => state.createJobPost
  );

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setMessage("Please select file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    dispatch(createJobPost(formData));
  };

  const handleReset = () => {
    dispatch(resetState());
    setFile(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Create Job Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="file"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload Job Post Document
          </label>
          <input
            type="file"
            id="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {status === "loading" ? "Uploading..." : "Submit"}
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

      {status === "succeeded" && job && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
          <h2 className="text-lg font-medium text-blue-700">{job.headline}</h2>
          <p className="mt-2 text-gray-700">{job.introduction}</p>

          <h3 className="mt-4 text-md font-semibold text-gray-800">
            Introduction of the Job:
          </h3>
          <p>{job.introductionOfJob}</p>

          <h3 className="mt-4 text-md font-semibold text-gray-800">
            Personal Address:
          </h3>
          <p>{job.personalAddress}</p>

          <h3 className="mt-4 text-md font-semibold text-gray-800">Tasks:</h3>
          <ul className="list-disc pl-6">
            {job.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>

          <h3 className="mt-4 text-md font-semibold text-gray-800">
            Qualifications:
          </h3>
          <ul className="list-disc pl-6">
            {job.qualifications.map((qualification, index) => (
              <li key={index}>{qualification}</li>
            ))}
          </ul>

          <h3 className="mt-4 text-md font-semibold text-gray-800">
            Benefits:
          </h3>
          <ul className="list-disc pl-6">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>

          <h3 className="mt-4 text-md font-semibold text-gray-800">
            Call to Action:
          </h3>
          <p>{job.callToAction}</p>

          <h3 className="mt-4 text-md font-semibold text-gray-800">
            Voice Details:
          </h3>
          <p>
            <strong>Script:</strong> {job.voiceScript}
          </p>
          <p>
            <strong>Tone:</strong> {job.voiceTone}
          </p>
          <p>
            <strong>Call To Action:</strong> {job.voiceCTA}
          </p>
          <p>
            <strong>Location:</strong> {job.voiceLocation}
          </p>
          <p>
            <strong>Benefits:</strong> {job.voiceBenefits}
          </p>

          <h3 className="mt-4 text-md font-semibold text-gray-800">
            Contact Details:
          </h3>
          <p>
            <strong>Email:</strong> {job.contactDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {job.contactDetails.phone}
          </p>
          <p>
            <strong>Address:</strong> {job.contactDetails.address}
          </p>
          <p>
            <strong>Website:</strong> {job.contactDetails.website}
          </p>

          <h3 className="mt-4 text-md font-semibold text-gray-800">
            Image Details:
          </h3>
          <p>
            <strong>Keywords:</strong> {job.imageKeyword}
          </p>
          <h4 className="mt-2 font-semibold text-gray-700">Taglines:</h4>
          <ul className="list-disc pl-6">
            {job.taglines.map((tagline, index) => (
              <li key={index}>{tagline}</li>
            ))}
          </ul>
          <h4 className="mt-2 font-semibold text-gray-700">Body Copy:</h4>
          <ul className="list-disc pl-6">
            {job.bodyCopy.map((copy, index) => (
              <li key={index}>{copy}</li>
            ))}
          </ul>
        </div>
      )}
      {status === "failed" && error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-lg font-medium text-red-700">Error</h2>
          <p className="mt-2 text-sm text-red-800">{error}</p>
        </div>
      )}
      <ChatStream />
      <GenerateVideo />
    </div>
  );
};

export default CreateJobPost;
