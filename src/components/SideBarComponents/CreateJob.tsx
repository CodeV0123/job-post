import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  resetState,
  createJobPost,
  // toggleLanguage,
} from "../../redux/slice/CreateJobSlice";
import { RootState, store } from "../../redux/store/store";

const CreateJob = () => {
  const dispatch = useDispatch<typeof store.dispatch>();

  // Get Redux state
  const { status, language } = useSelector(
    (state: RootState) => state.createJob
  );

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>(
    language === "english" ? "No file chosen" : "Keine Datei ausgewählt"
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage(
        language === "english"
          ? "Please select a file to upload"
          : "Bitte wählen Sie eine Datei zum Hochladen aus"
      );
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    dispatch(createJobPost(formData));
  };

  const handleReset = () => {
    dispatch(resetState());
    setFile(null);
    setFileName(
      language === "english" ? "No file chosen" : "Keine Datei ausgewählt"
    );
  };

  return (
    <div>
      {/* Upload Section */}
      <div className="flex flex-col items-center">
        <h2 className="bg-[#fff] text-[#000] text-base px-10 capitalize border rounded-full flex justify-center items-center mx-auto shadow-md">
          {language === "english"
            ? "Create Job Post"
            : "Stellenanzeige erstellen"}
        </h2>
        <div className="flex justify-center w-[25rem] h-[14rem] items-center mt-6 border rounded-[15px]  bg-[#fff] p-[20px] shadow-md">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center"
          >
            <label className="uppercase font-medium text-[#000] text-center w-full mb-6">
              {language === "english"
                ? "UPLOAD JOB POST DOCUMENT"
                : "STELLENANZEIGE DOKUMENT HOCHLADEN"}
            </label>
            {/* <div className="flex justify-center items-center gap-2 mb-8">
              <label
                htmlFor="file"
                className="bg-gray-200 hover:bg-gray-300 text-[#5d5c61] py-2 px-4 rounded-full cursor-pointer text-sm"
              >
                Choose File
              </label>
              <span className="text-[#777777]">{fileName}</span>
              <input
                type="file"
                id="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div> */}
            <div className="flex justify-center items-center gap-2 mb-8">
              <label
                htmlFor="file"
                className="bg-gray-200 hover:bg-gray-300 text-[#5d5c61] py-2 px-4 rounded-full cursor-pointer text-sm whitespace-nowrap"
              >
                {language === "english" ? "Choose File" : "Datei auswählen"}
              </label>
              <span
                className="text-[#777777] max-w-[150px] truncate"
                title={fileName}
              >
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
                className="px-6 py-2 bg-[#3a7384] text-white rounded-full hover:bg-[#84a98c] disabled:bg-[#ccd5ae]"
              >
                {status === "loading"
                  ? language === "english"
                    ? "Uploading..."
                    : "Hochladen..."
                  : status === "succeeded"
                  ? language === "english"
                    ? "Uploaded"
                    : "Hochgeladen"
                  : language === "english"
                  ? "Submit"
                  : "Einreichen"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 bg-[#f2a078] text-[#fff] rounded-full "
              >
                {language === "english" ? "Reset" : "Zurücksetzen"}
              </button>
            </div>
            <p className="mt-4 text-center text-sm text-red-800">{message}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
