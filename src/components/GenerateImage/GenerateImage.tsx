import NavBar from "./NavBar";
import bgimage from "./assets/bgimage.png";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";

const GenerateImage = () => {
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
          {/* Step Indicator */}
          <h1 className="text-[#5d5c61] uppercase bg-[#fff] font-bold tracking-[0.95px] text-center border rounded-full text-xl w-[112px] h-[35px] flex justify-center items-center">
            Step 2
          </h1>

          {/* Section Title */}
          <h2 className="bg-[#fff] text-[#5d5c61] capitalize text-3xl font-bold mt-5 border rounded-[15px] w-[560px] h-[50px] flex justify-center items-center mx-auto shadow-md">
            Generate Image
          </h2>

          {/* Upload Box */}
          <div className="flex justify-center items-center mt-10 border rounded-[15px] w-[800px] h-[240px] bg-[#fff] p-[20px] shadow-lg">
            <form className="w-full flex flex-col items-center">
              {/* Label */}
              <label
                htmlFor="file"
                className="uppercase font-bold text-[#5d5c61] text-lg mb-4"
              >
                Upload Template File
              </label>

              {/* File Input Container (Fixed Centering) */}
              <div className="flex justify-center w-full">
                <input
                  type="file"
                  id="file"
                  accept=".jpg,.png,.jpeg,.svg,.webp"
                  className="w-[30%] text-sm text-[#5d5c61] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-[#5d5c61] hover:file:bg-gray-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-6 py-3 capitalize w-[300px] mt-6 bg-[#324c3d] text-white font-medium rounded-full text-lg hover:bg-[#283d30] transition-all duration-300"
              >
                Generate
              </button>
            </form>
          </div>
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
