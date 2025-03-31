// import React from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

export const GeneratedImage = () => {
  const { images, status } = useSelector(
    (state: RootState) => state.generateImage
  );
  if (status !== "succeeded" || images.length === 0) return null;
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 bg-white rounded-lg shadow-lg p-3 max-w-xl w-full mx-4 relative overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={`data:image/png;base64,${image}`}
          alt={`Generated ${index + 1}`}
          className="w-[400px] h-[200px] rounded-lg shadow-md"
        />
      ))}
    </div>
  );
};
