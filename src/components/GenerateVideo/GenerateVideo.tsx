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

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (templateFile) {
      setSelectedTemplate(templateFile);
      console.log("✅ Template File Set:", templateFile.name);
    }
  }, [templateFile]);

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
      setMessage("❌ Please select both an image and a template.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

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
            Step 3
          </h1>

          <h2 className="bg-[#fff] text-[#5d5c61] capitalize text-3xl font-bold mt-5 border rounded-[15px] w-[560px] h-[50px] flex justify-center items-center mx-auto shadow-md">
            Generate Video
          </h2>

          <div className="flex flex-col justify-center items-center mt-10 gap-3 border rounded-[15px] w-[800px] min-h-[350px] bg-[#fff] p-[20px] shadow-lg">
            <div className="mt-3 flex gap-10 w-[60%]">
              <label className="text-[#324c3d] font-semibold">
                SELECTED TEMPLATE:
              </label>
              <p className="text-[#324c3d] font-semibold">
                {selectedTemplate?.name || "No template selected"}
              </p>
            </div>

            <div className="mt-3 flex flex-col w-[60%]">
              <label className="text-[#324c3d] font-semibold">
                SELECT GENERATED IMAGE:
              </label>
              <select
                className="w-full mt-1 p-2 border rounded-full"
                onChange={handleImageSelect}
              >
                <option value="">Select an image</option>
                {images.map((image, index) => (
                  <option key={index} value={image}>
                    Image {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-12 w-[60%]">
              <p className="text-[#324c3d] font-semibold">SCRIPT:</p>
              <p className="text-[#324c3d] font-semibold">{script}</p>
            </div>

            <div className="flex gap-[100px] items-center w-[50%] mt-5">
              <button
                className="bg-[#324c3d] text-white px-6 py-2 rounded-full hover:bg-green-800 transition"
                onClick={handleSubmit}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Generating..." : "SUBMIT"}
              </button>
              <button
                className="bg-[#a9b7aa] text-[#fff] px-6 py-2 rounded-full ml-3 hover:bg-gray-400 transition"
                onClick={() => dispatch(resetVideoState())}
              >
                RESET
              </button>
            </div>
            <p className="text-red-500 mt-4">{message}</p>
          </div>
        </div>
        {/* Forward Button */}
        {status === "succeeded" && (
          <button
            onClick={() => navigate("/created-job")}
            className="absolute right-10 transform -translate-y-1/5 bg-[#fff] p-2 rounded-full"
          >
            <ChevronRightIcon
              className="w-8 h-8"
              strokeWidth={3}
              stroke="#5d5c61"
            />
          </button>
        )}
      </div>

      <div className="absolute bottom-5 right-5">
        <ToggleLanguage colorScheme="green" textColor="text-white" />
      </div>
    </>
  );
};

export default GenerateVideo;
