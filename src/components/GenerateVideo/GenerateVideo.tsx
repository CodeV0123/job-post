import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  generateVideo,
  resetVideoState,
} from "../../redux/slice/GenerateVideoSlice";
import NavBar from "../../components/GenerateImage/NavBar";
import ToggleLanguage from "../../components/ToggleLanguage/ToggleLanguage";
import bgimage from "../../components/GenerateImage/assets/bgimage.png";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const GenerateVideo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.generateVideo);
  const { images } = useSelector((state: RootState) => state.generateImage);
  const templateFile = useSelector(
    (state: RootState) => state.generateImage.templateFile
  );
  const script = useSelector(
    (state: RootState) =>
      state.createJob?.voice?.english?.script || "No voice script provided"
  );

  const { language } = useSelector((state: RootState) => state.createJob);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (templateFile) {
      setSelectedTemplate(templateFile);
      console.log("✅ Template File Set:", templateFile.name);
    }
  }, [templateFile]);

  useEffect(() => {
    if (status === "succeeded") {
      setSuccessMessage(
        language === "english"
          ? "Video generated successfully!"
          : "Video erfolgreich generiert!"
      );
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  }, [status, language]);

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

  const handleImageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const base64 = e.target.value;
    if (!base64) return;

    const blob = base64ToBlob(base64);
    const file = new File([blob], `image-${Date.now()}.png`, {
      type: "image/png",
    });

    setSelectedImage(file);
    console.log("✅ Selected Image Converted to File:", file);
  };

  const generateRandomNumber = () => Math.floor(Math.random() * 100).toString();

  const handleSubmit = () => {
    if (!selectedImage || !selectedTemplate) {
      setMessage(
        language === "english"
          ? "Please select both an image and a template."
          : "Bitte wählen Sie sowohl ein Bild als auch eine Vorlage aus."
      );
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    setSuccessMessage(null);

    dispatch(
      generateVideo({
        template_path: selectedTemplate,
        product_id: generateRandomNumber(),
        image_file: selectedImage,
        script: script,
      })
    );

    console.log("🚀 Generating video with:");
    console.log("🖼️ Template Path:", selectedTemplate.name);
    console.log("📷 Image File:", selectedImage.name);
    console.log("📝 Script:", script);
  };

  return (
    <>
      <NavBar>
        <div className="block sm:hidden">
          <ToggleLanguage colorScheme="green" textColor="text-gray-700" />
        </div>
      </NavBar>
      <div
        className="flex justify-center items-center min-h-screen p-4 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        <div className="w-full max-w-4xl px-4">
          <div className="flex flex-col items-center">
            <h1 className="text-[#5d5c61] uppercase bg-[#fff] font-bold tracking-wide text-center border rounded-full text-sm sm:text-xl w-[100px] sm:w-[112px] h-[30px] sm:h-[35px] flex justify-center items-center">
              {language === "english" ? "STEP 3" : "SCHRITT 3"}
            </h1>

            <h2 className="bg-[#fff] text-[#5d5c61] capitalize text-xl sm:text-3xl font-bold mt-5 border rounded-lg sm:rounded-[15px] w-full sm:w-[560px] h-[40px] sm:h-[50px] flex justify-center items-center mx-auto shadow-md">
              {language === "english" ? "Generate Video" : "Video generieren"}
            </h2>

            <div className="w-full max-w-[800px] mt-10 border rounded-[15px] bg-[#fff] p-4 sm:p-[20px] shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-2 sm:gap-9">
                <label className="text-[#324c3d] font-semibold">
                  {language === "english"
                    ? "SELECTED TEMPLATE:"
                    : "AUSGEWÄHLTE VORLAGE:"}
                </label>
                <p className="text-[#324c3d] font-semibold text-sm sm:text-base truncate">
                  {selectedTemplate?.name ||
                    (language === "english"
                      ? "No template selected"
                      : "Keine Vorlage ausgewählt")}
                </p>
              </div>

              <div className="relative w-full sm:w-[60%] mb-4 group">
                <label className="text-[#324c3d] font-semibold block mb-1">
                  {language === "english"
                    ? "SELECT GENERATED IMAGE:"
                    : "GENERIERTE BILDER:"}
                </label>
                <select
                  className="w-full p-2 border rounded-full text-sm"
                  onChange={handleImageSelect}
                >
                  <option value="">
                    {language === "english"
                      ? "Select an image"
                      : "Wählen Sie ein Bild aus"}
                  </option>
                  {images.map((image, index) => (
                    <option key={index} value={image}>
                      Image {index + 1}
                    </option>
                  ))}
                </select>

                {/* Hover Preview */}
                {/* Hover Preview */}
                {selectedImage && (
                  <>
                    {/* Default hover preview for medium & large screens */}
                    <div className="hidden sm:block absolute top-[-50px] right-[-312px] group-hover:block w-[230px] h-[230px] border border-gray-300 rounded-xl shadow-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected preview"
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          console.error("🚨 Image failed to load:", e)
                        }
                      />
                    </div>

                    {/* Image preview for small screens */}
                    <div className="block sm:hidden fixed top-[110px] left-1 w-[120px] h-[120px] border border-gray-300 rounded-full shadow-lg overflow-hidden p-2">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected preview"
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          console.error("🚨 Image failed to load:", e)
                        }
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="mb-4 w-full sm:w-[60%]">
                <div className="flex items-center gap-2">
                  <p className="text-[#324c3d] font-semibold">
                    {language === "english" ? "SCRIPT:" : "SKRIPT:"}
                  </p>
                  <p className="text-[#324c3d] font-medium text-xs sm:text-sm truncate">
                    {script}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row  gap-4 mt-5">
                <button
                  className="bg-[#324c3d] text-white px-6 py-2 rounded-full hover:bg-green-800 transition w-full sm:w-auto"
                  onClick={handleSubmit}
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
                    ? "Submit"
                    : "Einreichen"}
                </button>
                <button
                  className="bg-[#a9b7aa] text-[#fff] px-6 py-2 rounded-full hover:bg-gray-400 transition w-full sm:w-auto"
                  onClick={() => dispatch(resetVideoState())}
                >
                  {language === "english" ? "Reset" : "Zurücksetzen"}
                </button>
              </div>

              {message && (
                <p className="text-red-500 text-sm mt-4">{message}</p>
              )}
              {successMessage && (
                <p className="text-green-500 text-sm mt-4">{successMessage}</p>
              )}
            </div>
          </div>

          {/* Forward Chevron Icon */}
          {status === "succeeded" && (
            <button
              onClick={() => navigate("/created-job")}
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
        </div>
      </div>

      {/* Toggle Language Button - hidden on small screens */}
      <div className="hidden sm:block fixed bottom-5 right-5">
        <ToggleLanguage colorScheme="green" textColor="text-white" />
      </div>
    </>
  );
};

export default GenerateVideo;
