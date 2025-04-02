import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, store } from "../../redux/store/store";
import {
  generateImage,
  setImageSource,
  setTemplateFile,
} from "../../redux/slice/GenerateImageSlice";
import NavBar from "./NavBar";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import bgimage from "./assets/bgimage.png";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const GenerateImage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { imageSource, status, error } = useSelector(
    (state: RootState) => state.generateImage
  );

  const { language } = useSelector((state: RootState) => state.createJob);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === "succeeded") {
      setSuccessMessage("Image generated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  }, [status]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      dispatch(setTemplateFile(file));
    }
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setImageSource(event.target.value as "stock_photo" | "ai_image"));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setMessage(
        language === "english"
          ? "Please upload a template file."
          : "Bitte laden Sie eine Vorlagendatei hoch."
      );
      return;
    }
    const state = store.getState() as RootState;
    const imageKeyword =
      imageSource === "ai_image"
        ? state.createJob.image_keyword
        : state.createJob.image_keyword_stockimage;

    if (!imageKeyword) {
      setMessage(
        language === "english"
          ? "Error: Image Keyword is required."
          : "Fehler: Bild-Keyword ist erforderlich."
      );
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    setSuccessMessage(null);
    dispatch(generateImage({ templatePath: selectedFile, imageSource }));
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
        className="flex justify-center items-center min-h-screen p-4 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        <div className="flex flex-col justify-center items-center w-full max-w-4xl p-4">
          <h1 className="text-[#5d5c61] bg-[#fff] uppercase font-bold tracking-wide text-center border rounded-full text-lg sm:text-xl w-[100px] sm:w-[112px] h-[30px] sm:h-[35px] flex justify-center items-center">
            {language === "english" ? "STEP 2" : "SCHRITT 2"}
          </h1>

          <h2 className="bg-white text-[#5d5c61] capitalize text-2xl sm:text-3xl font-bold mt-5 border rounded-lg sm:rounded-[15px] w-full sm:w-[500px] h-[50px] flex justify-center items-center mx-auto shadow-md">
            {language === "english" ? "Generate Image" : "Bild Generieren"}
          </h2>

          <div className="flex justify-center items-center mt-10 border rounded-2xl w-full max-w-[800px] min-h-[240px] bg-white p-4 sm:p-6 shadow-md">
            <form
              className="w-full flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <label className="uppercase font-bold text-[#5d5c61] text-lg mb-4">
                {language === "english"
                  ? "Upload Template File"
                  : "Vorlagen-Datei Hochladen"}
              </label>

              <div className="relative w-full sm:w-[60%] md:w-[50%]">
                <input
                  type="file"
                  accept=".jpg,.png,.jpeg,.svg,.webp"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <label
                  htmlFor="fileInput"
                  className="w-full text-sm text-[#5d5c61] flex items-center justify-between px-4 py-2 border border-gray-300 bg-gray-200 rounded-full shadow-sm cursor-pointer hover:bg-gray-300"
                >
                  {selectedFile
                    ? selectedFile.name
                    : language === "english"
                    ? "No file chosen"
                    : "Keine Datei ausgewählt"}
                </label>
              </div>

              <div className="relative w-full sm:w-[60%] md:w-[50%] mt-4">
                <select
                  value={imageSource}
                  onChange={handleSourceChange}
                  className="block w-full px-4 py-2 border border-gray-300 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-[#5d5c61] focus:outline-none"
                >
                  <option value="stock_photo">
                    {language === "english" ? "Stock Photo" : "Stockfoto"}
                  </option>
                  <option value="ai_image">
                    {language === "english" ? "AI Image" : "KI-Bild"}
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-3 capitalize w-full sm:w-[300px] mt-6 bg-[#324c3d] text-white font-medium rounded-full text-lg hover:bg-[#283d30] transition-all duration-300"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? language === "english"
                    ? "Generating..."
                    : "Generierung..."
                  : status === "succeeded"
                  ? language === "english"
                    ? "Generated"
                    : "Generiert"
                  : language === "english"
                  ? "Generate"
                  : "Generieren"}
              </button>
              {status === "failed" && (
                <p className="text-red-500 mt-2 text-sm">{error}</p>
              )}
              {message && (
                <p className="text-red-500 mt-2 text-sm">{message}</p>
              )}
              {successMessage && (
                <p className="text-green-500 mt-2 text-sm">{successMessage}</p>
              )}
            </form>
          </div>
        </div>

        {/* Forward Chevron Icon */}
        {status === "succeeded" && (
          <button
            onClick={() => navigate("/generate-video")}
            className="fixed right-[40%] bottom-4 sm:right-10 sm:top-[100px] sm:bottom-auto 
               bg-gradient-to-r from-[#8bbee0] to-[#5d5c61] text-white 
               p-3 sm:p-4 rounded-full shadow-xl transition-transform duration-300 
               ease-in-out hover:scale-110 hover:shadow-2xl animate-bounce"
          >
            <ChevronRightIcon
              className="w-7 h-7 sm:w-9 sm:h-9"
              strokeWidth={3}
              stroke="white"
            />
          </button>
        )}

        {/* Toggle Language Button - hidden on small screens */}
        <div className="hidden sm:block absolute bottom-5 right-5">
          <ToggleLanguage colorScheme="green" textColor="text-white" />
        </div>
      </div>
    </>
  );
};

export default GenerateImage;
