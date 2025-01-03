import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import {
  generateVideo,
  resetVideoState,
} from "../redux/slice/GenerateVideoSlice";

const GenerateVideo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { videoResponse, status, error } = useSelector(
    (state: RootState) => state.generateVideo
  );

  const [templatePath, setTemplatePath] = useState<File | null>(null);
  const [productId, setProductId] = useState("");
  const [imageKeyword, setImageKeyword] = useState("");
  const [script, setScript] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTemplatePath(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !templatePath ||
      !productId.trim() ||
      !imageKeyword.trim() ||
      !script.trim()
    ) {
      alert("All fields are required");
      return;
    }

    dispatch(
      generateVideo({
        template_path: templatePath,
        product_id: productId,
        image_keyword: imageKeyword,
        script,
      })
    );
  };

  const handleReset = () => {
    dispatch(resetVideoState());
    setTemplatePath(null);
    setProductId("");
    setImageKeyword("");
    setScript("");
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Generate Video
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="templatePath"
            className="block text-gray-700 font-medium mb-2"
          >
            Template Path (Upload File)
          </label>
          <input
            type="file"
            id="templatePath"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept=".mp4,.avi,.mov,.png,.jpg,.jpeg"
          />
        </div>
        <div>
          <label
            htmlFor="productId"
            className="block text-gray-700 font-medium mb-2"
          >
            Product ID
          </label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter Product ID"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label
            htmlFor="imageKeyword"
            className="block text-gray-700 font-medium mb-2"
          >
            Image Keyword
          </label>
          <input
            type="text"
            id="imageKeyword"
            value={imageKeyword}
            onChange={(e) => setImageKeyword(e.target.value)}
            placeholder="Enter Image Keyword"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label
            htmlFor="script"
            className="block text-gray-700 font-medium mb-2"
          >
            Script
          </label>
          <textarea
            id="script"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Enter Script"
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {status === "loading" ? "Generating..." : "Submit"}
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

      {status === "succeeded" && videoResponse && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
          <h2 className="text-lg font-medium text-blue-700">
            Video Generated Successfully
          </h2>
          <video
            controls
            className="mt-4 w-full"
            src={videoResponse.video_path}
          >
            Your browser does not support the video tag.
          </video>
          {/* <p className="mt-2 text-gray-700">{videoResponse.video_path}</p> */}
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

export default GenerateVideo;
