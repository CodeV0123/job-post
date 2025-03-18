import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import {
  generateImage,
  setImageSource,
} from "../../redux/slice/GenerateImageSlice";
import NavBar from "./NavBar";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import bgimage from "./assets/bgimage.png";

const GenerateImage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, imageSource, status, error } = useSelector(
    (state: RootState) => state.generateImage
  );

  // Local State for File Upload (DO NOT store file in Redux)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle File Selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  //   Handle Dropdown Change
  const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setImageSource(event.target.value as "stock_photo" | "ai_image"));
  };

  // Handle Submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please upload a template file.");
      return;
    }
    dispatch(generateImage({ templatePath: selectedFile, imageSource }));
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
          <h1 className="text-[#5d5c61] uppercase bg-[#fff] font-bold tracking-[0.95px] text-center border rounded-full text-xl w-[112px] h-[35px] flex justify-center items-center">
            Step 2
          </h1>

          <h2 className="bg-[#fff] text-[#5d5c61] capitalize text-3xl font-bold mt-5 border rounded-[15px] w-[560px] h-[50px] flex justify-center items-center mx-auto shadow-md">
            Generate Image
          </h2>

          <div className="flex justify-center items-center mt-10 border rounded-[15px] w-[800px] h-[260px] bg-[#fff] p-[20px] shadow-lg">
            <form
              className="w-full flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <label className="uppercase font-bold text-[#5d5c61] text-lg mb-4">
                Upload Template File
              </label>
              <input
                type="file"
                accept=".jpg,.png,.jpeg,.svg,.webp"
                className="w-[30%] text-sm text-[#5d5c61] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-[#5d5c61] hover:file:bg-gray-300"
                onChange={handleFileChange}
              />

              <select
                value={imageSource}
                onChange={handleSourceChange}
                className="mt-4 p-2 border rounded-lg bg-gray-200 text-[#5d5c61]"
              >
                <option value="stock_photo">Stock Photo</option>
                <option value="ai_image">AI Image</option>
              </select>

              <button
                type="submit"
                className="px-6 py-3 capitalize w-[300px] mt-6 bg-[#324c3d] text-white font-medium rounded-full text-lg hover:bg-[#283d30] transition-all duration-300"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Generating..." : "Generate"}
              </button>
              {status === "failed" && (
                <p className="text-red-500 mt-4">{error}</p>
              )}
            </form>
          </div>

          {status === "succeeded" && images.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`data:image/png;base64,${image}`}
                  alt={`Generated ${index + 1}`}
                  className="w-[200px] h-[200px] rounded-lg shadow-md"
                />
              ))}
            </div>
          )}
        </div>
        {/* Toggle Language Button - Positioned at Bottom Right */}
        <div className="absolute bottom-5 right-5">
          <ToggleLanguage colorScheme="green" textColor="text-white" />
        </div>
      </div>
    </>
  );
};

export default GenerateImage;
