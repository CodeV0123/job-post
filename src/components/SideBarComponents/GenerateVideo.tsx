import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  generateVideo,
  resetVideoState,
} from "../../redux/slice/GenerateVideoSlice";

const GenerateVideo = () => {
  const dispatch = useDispatch<AppDispatch>();

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
      {/* <div className="flex flex-col justify-center items-center">
        <h2 className="bg-[#fff] text-[#000] text-xl px-10 capitalize border rounded-full flex justify-center items-center mx-auto shadow-md">
          Generate Video
        </h2>

        <div className="flex flex-col justify-center items-center mt-10 gap-3 border rounded-[15px] w-[22rem] min-h-[13rem] bg-[#fff] p-[20px] shadow-lg">
          <div className="mt-3 flex gap-10 w-[60%]">
            <label className="text-[#000] font-semibold">
              SELECTED TEMPLATE:
            </label>
            <p className="text-[#000] ">
              {selectedTemplate?.name || "No template selected"}
            </p>
          </div>

          <div className="mt-3 flex flex-col w-[60%]">
            <label className="text-[#000] font-semibold">
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
            <p className="text-[#000] font-semibold">SCRIPT:</p>
            <p className="text-[#000]">{script}</p>
          </div>

          <div className="flex gap-[100px] items-center w-[50%] mt-5">
            <button
              className="bg-[#3a7384] text-white px-6 py-2 rounded-full hover:bg-green-800 transition"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Generating..." : "SUBMIT"}
            </button>
            <button
              className="bg-[#f2a078] text-[#fff] px-6 py-2 rounded-full ml-3 hover:bg-gray-400 transition"
              onClick={() => dispatch(resetVideoState())}
            >
              RESET
            </button>
          </div>
          <p className="text-red-500 mt-4">{message}</p>
        </div>
      </div> */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="bg-white text-black text-xl px-10 capitalize border rounded-full flex justify-center items-center mx-auto shadow-md">
          Generate Video
        </h2>

        <div className="flex flex-col justify-center items-center mt-6 border rounded-[15px] w-[24rem] min-h-[15rem] bg-white p-6 shadow-lg gap-4">
          {/* Selected Template */}
          <div className="flex flex-row w-[80%]">
            <label className="text-black truncate font-semibold uppercase">
              Selected Template:
            </label>
            <p className="text-[#000] truncate">
              {selectedTemplate?.name || "No template selected"}
            </p>
          </div>

          {/* Select Generated Image */}
          <div className="flex flex-col w-[80%]">
            <label className="text-black font-semibold uppercase">
              Select Generated Image:
            </label>
            <select
              className="w-full mt-1 p-2 border rounded-full focus:ring-1 focus:ring-gray-400 outline-none"
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

          {/* Script */}
          <div className="flex flex-row items-center w-[80%]">
            <label className="text-black font-semibold uppercase">
              Script:
            </label>
            <p className="text-[#000] p-1 text-center truncate">{script}</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between w-[80%] mt-4 gap-4">
            <button
              className="w-full bg-[#3a7384] text-white px-4 py-2 rounded-full hover:bg-green-800 transition"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Generating..." : "Submit"}
            </button>
            <button
              className="w-full bg-[#f2a078] text-white px-4 py-2 rounded-full hover:bg-gray-400 transition"
              onClick={() => dispatch(resetVideoState())}
            >
              Reset
            </button>
          </div>

          {/* Error Message */}
          {message && <p className="text-red-500 text-center">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default GenerateVideo;
