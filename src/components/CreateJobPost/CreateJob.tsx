import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState, createJobPost } from "../../redux/slice/CreateJobSlice";
import { RootState, store } from "../../redux/store/store";
import bgimage from "./assets/cjp_bgimage.png";
import NavBar from "./NavBar";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const CreateJob = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.createJob);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Debugging logs
    // console.log("Selected File:", file);
    // console.log("FormData Entries:");
    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]); // Should log 'file' and the File object
    // }

    dispatch(createJobPost(formData));
  };

  const handleReset = () => {
    dispatch(resetState());
    setFile(null);
    console.log("button clicked");
  };
  return (
    <div>
      <NavBar />
      <div
        className="flex justify-center items-center h-[90vh]"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <h1 className="text-[#5d5c61] uppercase bg-[#fff] font-bold tracking-[0.95px] text-center border rounded-full text-xl w-[112px] flex justify-center items-center mx-auto">
            step 1
          </h1>
          <h2 className="bg-[#fff] text-[#5d5c61] text-3xl font-bold mt-5 border rounded-[15px] w-[560px] h-[50px] flex justify-center items-center mx-auto">
            Create Job Post
          </h2>
          <div className="flex justify-center items-center mt-10 border rounded-[15px] w-[800px] h-[240px] bg-[#fff] p-[15px]">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="file"
                className="uppercase font-extrabold text-[#5d5c61] text-center"
              >
                Upload job post document
              </label>
              <input
                type="file"
                id="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="block mt-6 w-full text-sm text-[#5d5c61] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold  file:text-[#5d5c61] hover:file:bg-blue-100"
              />
              <div className="flex gap-8 mt-5">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-2  bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {status === "loading" ? "Uploading..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700"
                >
                  Reset
                </button>
              </div>
              <p className="mt-2 px-3 text-sm text-red-800">{message}</p>
            </form>
          </div>
        </div>
        {/* Forward Chevron Icon */}
        {status === "succeeded" && (
          <button
            onClick={() => navigate("/generate-image")} // Navigate to GenerateImage
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
    </div>
  );
};

export default CreateJob;
