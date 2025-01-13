import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { generateImage } from "../redux/slice/GenerateImageSlice";

const GenerateImage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, status, error } = useSelector(
    (state: RootState) => state.generateImage
  );
  const { job } = useSelector((state: RootState) => state.createJobPost);

  const [templatePath, setTemplatePath] = useState<File | null>(null);
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!templatePath || !job?.imageKeyword) {
      setMessage("Template file and job image keyword are required");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const payload = {
      templatePath,
      imageKeyword: job.imageKeyword, // Dynamically fetch from CreateJobSlice
    };

    console.log(images);
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

  return (
    <div>
      <h1>Generate Images</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Template File:
            <input
              type="file"
              accept=".jpg,.png,.jpeg,.svg,.webp"
              onChange={(e) => setTemplatePath(e.target.files?.[0] || null)}
            />
          </label>
        </div>
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Generating..." : "Generate"}
        </button>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>

      {status === "succeeded" && images.length > 0 && (
        <div>
          <h2>Generated Images</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {images.map((base64String, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <img
                  src={`data:image/png;base64,${base64String}`}
                  alt={`Generated ${index + 1}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <button
                  onClick={() => downloadImage(base64String, index)}
                  style={{ marginTop: "10px" }}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {status === "failed" && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default GenerateImage;
