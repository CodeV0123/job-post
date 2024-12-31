import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { createJobPost, resetState } from "../redux/CreateJobPostSlice";

const CreateJobPost: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { job, status, error } = useSelector(
    (state: RootState) => state.createJobPost
  );

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select file to upload");
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
      </form>

      {status === "succeeded" && job && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <h2 className="text-lg font-medium text-green-700">
            Job Post Created Successfully!
          </h2>
          <pre className="mt-4 text-sm text-gray-800 overflow-auto bg-gray-100 p-4 rounded">
            {JSON.stringify(job, null, 2)}
          </pre>
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
export default CreateJobPost;
