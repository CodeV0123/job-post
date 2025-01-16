import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import {
  generateVideo,
  resetVideoState,
} from "../redux/slice/GenerateVideoSlice";

interface GenerateVideoProps {
  generatedImages: string[];
}

const generateRandomId = () => Math.floor(Math.random() * 100).toString();

const GenerateVideo: React.FC<GenerateVideoProps> = ({ generatedImages }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { videoResponse, status, error } = useSelector(
    (state: RootState) => state.generateVideo
  );
  const { job } = useSelector((state: RootState) => state.createJobPost);

  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);

  const [templatePath, setTemplatePath] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTemplatePath(e.target.files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedImage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!templatePath || !job) {
      setMessage(
        isEnglish
          ? "File and job details are required"
          : "Datei- und Auftragsdetails sind erforderlich"
      );
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    // Convert base64 string to a File object
    const blob = base64ToBlob(selectedImage, "image/png");
    const imageFile = new File([blob], "selected_image.png");

    const payload = {
      template_path: templatePath,
      product_id: generateRandomId(),
      image_file: imageFile,
      script: job.voiceScript,
    };

    dispatch(generateVideo(payload));
  };

  const handleReset = () => {
    dispatch(resetVideoState());
    setTemplatePath(null);
    setSelectedImage(null);
  };

  return (
    // <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
    //   <h1 className="text-2xl font-semibold text-gray-700 mb-6">
    //     {isEnglish ? "Generate Video" : "Video Generieren"}
    //   </h1>
    //   <form onSubmit={handleSubmit} className="space-y-6">
    //     <div>
    //       <label
    //         htmlFor="templatePath"
    //         className="block text-gray-700 font-medium mb-2"
    //       >
    //         {isEnglish
    //           ? "Template Path (Upload File)"
    //           : "Vorlagepfad (Datei hochladen)"}
    //       </label>
    //       <input
    //         type="file"
    //         id="templatePath"
    //         onChange={handleFileChange}
    //         className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    //         accept=".mp4,.avi,.mov,.png,.jpg,.jpeg"
    //       />
    //     </div>
    //     <div>
    //       <label
    //         htmlFor="imageSelect"
    //         className="block text-gray-700 font-medium mb-2"
    //       >
    //         {isEnglish
    //           ? "Select Generated Image"
    //           : "Generiertes Bild auswählen"}
    //       </label>
    //       <select
    //         id="imageSelect"
    //         onChange={handleImageChange}
    //         value={selectedImage || ""}
    //         className="block w-full border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500"
    //       >
    //         <option value="" disabled>
    //           {isEnglish ? " -- Select an Image --" : " -- Bild auswählen --"}
    //         </option>
    //         {generatedImages.map((image, index) => (
    //           <option key={index} value={image}>
    //             {isEnglish ? "Image" : "Bild"} {index + 1}
    //           </option>
    //         ))}
    //       </select>
    //       {selectedImage && (
    //         <div className="mt-4">
    //           <p className="text-gray-700">
    //             {isEnglish ? "Preview:" : "Vorschau:"}
    //           </p>
    //           <img
    //             src={`data:image/png;base64,${selectedImage}`}
    //             alt="Selected"
    //             className="w-48 h-48 object-contain border border-gray-200 rounded-md"
    //           />
    //         </div>
    //       )}
    //     </div>
    //     <div>
    //       <p className="text-gray-700">
    //         <strong>{isEnglish ? "Script:" : "Skript:"}</strong>{" "}
    //         {job?.voiceScript || "N/A"}
    //       </p>
    //     </div>
    //     <div className="flex space-x-4">
    //       <button
    //         type="submit"
    //         disabled={status === "loading"}
    //         className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:bg-blue-300"
    //       >
    //         {status === "loading"
    //           ? isEnglish
    //             ? "Generating..."
    //             : "Generieren..."
    //           : isEnglish
    //           ? "Generate"
    //           : "Erzeugen"}
    //         {/* {status === "loading" ? "Generating..." : "Submit"} */}
    //       </button>
    //       <button
    //         type="button"
    //         onClick={handleReset}
    //         className="px-6 py-2 bg-gray-600 text-white font-medium rounded hover:bg-gray-700"
    //       >
    //         {isEnglish ? "Reset" : "Zurücksetzen"}
    //       </button>
    //     </div>
    //     <p className="mt-2 text-sm text-red-800">{message}</p>
    //   </form>

    //   {status === "succeeded" && videoResponse && (
    //     <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
    //       <h2 className="text-lg font-medium text-blue-700">
    //         {isEnglish
    //           ? "Video Generated Successfully"
    //           : "Video erfolgreich generiert"}
    //       </h2>
    //     </div>
    //   )}

    //   {status === "failed" && error && (
    //     <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
    //       <h2 className="text-lg font-medium text-red-700">Error</h2>
    //       <p className="mt-2 text-sm text-red-800">{error}</p>
    //     </div>
    //   )}
    // </div>
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        {isEnglish ? "Generate Video" : "Video Generieren"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="templatePath"
            className="block text-gray-700 font-medium mb-2"
          >
            {isEnglish
              ? "Template Path (Upload File)"
              : "Vorlagepfad (Datei hochladen)"}
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
            htmlFor="imageSelect"
            className="block text-gray-700 font-medium mb-2"
          >
            {isEnglish
              ? "Select Generated Image"
              : "Generiertes Bild auswählen"}
          </label>
          <select
            id="imageSelect"
            onChange={handleImageChange}
            value={selectedImage || ""}
            className="block w-full border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="" disabled>
              {isEnglish ? " -- Select an Image --" : " -- Bild auswählen --"}
            </option>
            {generatedImages.map((image, index) => (
              <option key={index} value={image}>
                {isEnglish ? "Image" : "Bild"} {index + 1}
              </option>
            ))}
          </select>
          {selectedImage && (
            <div className="mt-4">
              <p className="text-gray-700">
                {isEnglish ? "Preview:" : "Vorschau:"}
              </p>
              <img
                src={`data:image/png;base64,${selectedImage}`}
                alt="Selected"
                className="w-full sm:w-48 h-auto object-contain border border-gray-200 rounded-md mx-auto"
              />
            </div>
          )}
        </div>
        <div>
          <p className="text-gray-700">
            <strong>{isEnglish ? "Script:" : "Skript:"}</strong>{" "}
            {job?.voiceScript || "N/A"}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:bg-blue-300 w-full sm:w-auto"
          >
            {status === "loading"
              ? isEnglish
                ? "Generating..."
                : "Generieren..."
              : isEnglish
              ? "Generate"
              : "Erzeugen"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 bg-gray-600 text-white font-medium rounded hover:bg-gray-700 w-full sm:w-auto"
          >
            {isEnglish ? "Reset" : "Zurücksetzen"}
          </button>
        </div>
        <p className="mt-2 text-sm text-red-800 text-center">{message}</p>
      </form>
      {status === "succeeded" && videoResponse && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
          <h2 className="text-lg font-medium text-blue-700">
            {isEnglish
              ? "Video Generated Successfully"
              : "Video erfolgreich generiert"}
          </h2>
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

// Utility function to convert base64 string to Blob
function base64ToBlob(base64: string, mimeType: string): Blob {
  // Ensure the base64 string is properly formatted (in case it includes the data URL prefix)
  const base64String = base64.startsWith("data:")
    ? base64.split(",")[1]
    : base64;

  // Log base64 string to verify format
  console.log("Base64 String for conversion:", base64String);

  try {
    const byteChars = atob(base64String); // Decode base64 to bytes
    const byteArrays = [];
    for (let offset = 0; offset < byteChars.length; offset += 512) {
      const slice = byteChars.slice(offset, offset + 512);
      const byteNumbers = Array.from(slice).map((char) => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: mimeType });
  } catch (error) {
    console.error("Error decoding base64 string:", error);
    throw new Error("Invalid base64 string");
  }
}

export default GenerateVideo;
