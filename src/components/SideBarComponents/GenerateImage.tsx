import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, store } from "../../redux/store/store";
import {
  generateImage,
  setImageSource,
  setTemplateFile,
} from "../../redux/slice/GenerateImageSlice";

const GenerateImage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { imageSource, status, error } = useSelector(
    (state: RootState) => state.generateImage
  );

  // Local State for File Upload (DO NOT store file in Redux)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Handle File Selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      dispatch(setTemplateFile(file));
    }
  };

  //   Handle Dropdown Change
  const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setImageSource(event.target.value as "stock_photo" | "ai_image"));
  };

  // Handle Submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setMessage("Please upload a template file.");
      return;
    }
    const state = store.getState() as RootState;
    const imageKeyword =
      imageSource === "ai_image"
        ? state.createJob.image_keyword
        : state.createJob.image_keyword_stockimage;

    if (!imageKeyword) {
      setMessage("Error: Image Keyword is required.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    dispatch(generateImage({ templatePath: selectedFile, imageSource }));
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h2 className="bg-[#fff] text-[#000] text-base px-10 capitalize border rounded-full flex justify-center items-center mx-auto shadow-md">
          Generate Image
        </h2>

        <div className="flex justify-center items-center mt-6 border rounded-[15px] w-[25rem] h-[14rem]  bg-[#fff] p-[20px] shadow-lg">
          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <label className="uppercase font-medium text-[#000] mb-6">
              Upload Template File
            </label>
            <div className="flex justify-between items-center w-full gap-4">
              {/* File Input */}
              <input
                type="file"
                accept=".jpg,.png,.jpeg,.svg,.webp"
                className="w-[48%] text-sm text-[#5d5c61] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-gray-300 file:bg-gray-200 file:text-[#5d5c61] hover:file:bg-gray-300 cursor-pointer"
                onChange={handleFileChange}
              />

              {/* Dropdown Select */}
              <select
                value={imageSource}
                onChange={handleSourceChange}
                className="w-[48%] px-4 py-2 border border-gray-300 bg-white rounded-full shadow-sm focus:ring-2 focus:ring-[#5d5c61] focus:outline-none cursor-pointer"
              >
                <option value="stock_photo">Stock Photo</option>
                <option value="ai_image">AI Image</option>
              </select>
            </div>
            <button
              type="submit"
              className="py-2 capitalize w-[200px] mt-6 bg-[#324c3d] text-white font-medium rounded-full text-lg hover:bg-[#283d30] transition-all duration-300"
              disabled={status === "loading"}
            >
              {status === "loading"
                ? "Generating..."
                : status === "succeeded"
                ? "Generated"
                : "Generate"}
            </button>
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

export default GenerateImage;
