import { useState, useEffect } from "react";
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
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === "succeeded") {
      setSuccessMessage("Job post uploaded successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  }, [status]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload");
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    dispatch(createJobPost(formData));
  };

  const handleReset = () => {
    dispatch(resetState());
    setFile(null);
    setFileName("No file chosen");
  };

  return (
    <div>
      <NavBar />
      <div
        className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 py-8 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        {/* Upload Section */}
        <div className="flex flex-col items-center w-full max-w-[800px]">
          <h1 className="text-[#5d5c61] uppercase bg-white font-bold tracking-wide text-xl sm:text-xl border rounded-full px-5 py-0.5">
            STEP 1
          </h1>
          <h2 className="bg-white text-[#5d5c61] text-xl sm:text-2xl md:text-3xl font-bold mt-5 border rounded-xl w-full max-w-[560px] h-[50px] flex justify-center items-center shadow-md">
            Create Job Post
          </h2>
          <div className="flex justify-center items-center mt-10 border rounded-2xl w-full max-w-[800px] min-h-[240px] bg-white p-4 sm:p-6 shadow-md">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center"
            >
              <label className="uppercase font-bold text-[#5d5c61] text-center w-full mb-4 sm:mb-6">
                UPLOAD JOB POST DOCUMENT
              </label>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-6">
                <label
                  htmlFor="file"
                  className="bg-gray-200 hover:bg-gray-300 text-[#5d5c61] py-2 px-4 rounded-full cursor-pointer text-sm"
                >
                  Choose File
                </label>
                <span className="text-[#777777] text-sm sm:text-base">
                  {fileName}
                </span>
                <input
                  type="file"
                  id="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-4 sm:px-6 py-2 bg-[#8bbee0] text-white font-medium rounded-full hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {status === "loading"
                    ? "Uploading..."
                    : status === "succeeded"
                    ? "Submitted"
                    : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 sm:px-6 py-2 bg-[#e9deef] text-[#73737f] font-medium rounded-full hover:bg-gray-100"
                >
                  Reset
                </button>
              </div>
              {message && (
                <p className="text-red-500 mt-4 text-sm text-center">
                  {message}
                </p>
              )}
              {successMessage && (
                <p className="text-green-500 mt-4 text-sm text-center">
                  {successMessage}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Forward Button */}
        {status === "succeeded" && (
          <button
            onClick={() => navigate("/generate-image")}
            className="fixed bottom-0 sm:bottom-0 right-[45%] sm:right-12 bg-gradient-to-r from-[#8bbee0] to-[#5d5c61] text-white p-3 sm:p-4 rounded-full shadow-xl transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl animate-bounce"
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
  );
};

export default CreateJob;
