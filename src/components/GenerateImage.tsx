import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import {
  generateImage,
  setTemplateFile,
} from "../redux/slice/GenerateImageSlice";

interface GenerateImageProps {
  onImagesGenerated: (images: string[]) => void;
}

const GenerateImage: React.FC<GenerateImageProps> = ({ onImagesGenerated }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, status, error, templateFile } = useSelector(
    (state: RootState) => state.generateImage
  );
  const { job } = useSelector((state: RootState) => state.createJobPost);
  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);
  // const [templatePath, setTemplatePath] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Function to convert base64 to Blob
  const base64ToBlob = (base64: string, contentType = "image/png") => {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length)
        .fill(0)
        .map((_, i) => slice.charCodeAt(i));
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: contentType });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      dispatch(setTemplateFile(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!templateFile || !job?.imageKeyword) {
      setMessage("Template file and job image keyword are required");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const payload = {
      templatePath: templateFile,
      imageKeyword: job.imageKeyword,
    };

    dispatch(generateImage(payload));
  };

  // Function to download a single image
  const downloadImage = (base64String: string, index: number) => {
    const blob = base64ToBlob(base64String);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `generated_image_${index + 1}.png`;
    link.click();
    URL.revokeObjectURL(url); // Clean up URL object
  };

  if (status === "succeeded" && images.length > 0) {
    onImagesGenerated(images);
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md sm:p-8 lg:max-w-5xl">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center sm:text-3xl">
        <span className="italic text-gray-400 text-base">
          {isEnglish ? "[Second Step]:" : "[Zweiter Schritt]:"}{" "}
        </span>
        {isEnglish ? "Generate Image" : "Bild Generieren"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="templateFile"
            className="block text-gray-700 font-medium mb-2"
          >
            {isEnglish ? "Upload Template File" : "Vorlage-Datei hochladen"}
          </label>
          <input
            type="file"
            id="templateFile"
            accept=".jpg,.png,.jpeg,.svg,.webp"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {status === "loading"
            ? isEnglish
              ? "Generating..."
              : "Generieren..."
            : isEnglish
            ? "Generate"
            : "Erzeugen"}
        </button>
        {message && (
          <p className="mt-2 text-sm text-red-800 text-center">{message}</p>
        )}
      </form>

      {status === "succeeded" && images.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4 text-center sm:text-2xl">
            {isEnglish ? "Generated Images" : "Erzeugte Bilder"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((base64String, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <img
                  src={`data:image/png;base64,${base64String}`}
                  alt={`Generated ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-md sm:w-40 sm:h-40"
                />
                <button
                  onClick={() => downloadImage(base64String, index)}
                  className="mt-3 px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700"
                >
                  {isEnglish ? "Download" : "Herunterladen"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {status === "failed" && error && (
        <p className="mt-6 text-center text-sm text-red-800">{error}</p>
      )}
    </div>
  );
};

export default GenerateImage;
