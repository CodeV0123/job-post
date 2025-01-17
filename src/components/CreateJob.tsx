import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { createJobPost, resetState } from "../redux/slice/CreateJobPostSlice";
import ChatStream from "./ChatStream";
import GenerateVideo from "./GenerateVideo";
import GenerateImage from "./GenerateImage";
import { FaPlay, FaPen } from "react-icons/fa";
import { translateToEnglish } from "../redux/slice/TranslateToEnglishSlice";
import { toggleLanguage } from "../redux/slice/LanguageSlice";
import { Job } from "../types/job";

const parseField = (field: { items?: unknown[] } | unknown[]) => {
  if (Array.isArray(field)) {
    return field;
  } else if (field && field.items) {
    return field.items;
  }
  return [];
};

const CreateJobPost: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    job,
    status: jobStatus,
    error,
  } = useSelector((state: RootState) => state.createJobPost);

  const { videoResponse } = useSelector(
    (state: RootState) => state.generateVideo
  );

  const { status: translationStatus } = useSelector(
    (state: RootState) => state.translateToEnglish
  );

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isEnglish, setIsEnglish] = useState(false);
  const [localJob, setLocalJob] = useState<Job | null>(null);

  useEffect(() => {
    if (job) {
      setLocalJob(job); // Store the original job when it becomes available
    }
  }, [job]);

  const handleTranslateToEnglish = async () => {
    if (job) {
      // Ensure job is not null before dispatching
      const response = await dispatch(translateToEnglish(job)).unwrap();
      // Update localJob with translated data
      if (response.translated_json) {
        setLocalJob(response.translated_json);
      } else {
        console.error("Translated JSON is missing from the response.");
      }
    } else {
      console.error("Job data is not available for translation.");
    }
  };
  const handleToggleLanguage = () => {
    if (isEnglish) {
      setLocalJob(job); // Revert to the original Redux job
    } else {
      handleTranslateToEnglish(); // Translate to English
    }
    dispatch(toggleLanguage()); // Toggle the language flag
    setIsEnglish((prev) => !prev); // Toggle the language flag
  };

  const handleImageGeneration = (images: string[]) => {
    setGeneratedImages(images);
  };

  const handlePlayPause = () => {
    const videoElement = document.getElementById(
      "video-player"
    ) as HTMLVideoElement;
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setMessage(
        isEnglish
          ? "Please select file to upload"
          : "Bitte wählen Sie die Datei zum Hochladen aus"
      );
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    dispatch(createJobPost(formData));
  };

  const handleReset = () => {
    dispatch(resetState());
    setFile(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      // dispatch(uploadVideo(formData));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl text-center font-semibold text-gray-700 mb-2">
        <span className="italic text-gray-400 text-base">
          {isEnglish ? "[First Step]:" : "[Erster Schritt]:"}{" "}
        </span>
        {isEnglish ? "Create Job Post" : "Stellenanzeige Erstellen"}
      </h1>
      {/* Language Toggle */}
      <p className="text-gray-400 italic py-1 text-xs">
        {isEnglish ? "(Toggle Language)" : "(Sprache umschalten)"}
      </p>
      <div className="flex space-x-4">
        <span className="text-gray-700 mr-4 mb-4">
          {isEnglish ? "English" : "German"}
        </span>
        <div className="relative">
          <label
            className={`inline-flex items-center cursor-pointer ${
              translationStatus === "loading"
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            <span className="sr-only">Toggle Language</span>
            <input
              type="checkbox"
              className="hidden"
              onChange={handleToggleLanguage}
              checked={isEnglish}
              disabled={translationStatus === "loading"}
            />
            <div
              className={`w-10 h-6 rounded-full transition-colors duration-300 ${
                isEnglish ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                isEnglish ? "translate-x-4" : "translate-x-0"
              }`}
            ></div>
          </label>
        </div>
        {translationStatus === "loading" && (
          <span className="ml-4 text-gray-500 text-sm">
            {isEnglish ? "Translation loading..." : "Übersetzung lädt..."}
          </span>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="file"
            className="block text-gray-700 font-medium mb-2"
          >
            {isEnglish
              ? "Upload Job Post Document"
              : "Stellenanzeige hochladen"}
          </label>
          <input
            type="file"
            id="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={jobStatus === "loading"}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {jobStatus === "loading"
              ? isEnglish
                ? "Uploading..."
                : "Hochladen..."
              : isEnglish
              ? "Submit"
              : "Einreichen"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 bg-gray-600 text-white font-medium rounded hover:bg-gray-700"
          >
            {isEnglish ? "Reset" : "Zurücksetzen"}
          </button>
        </div>
        <p className="mt-2 text-sm text-red-800">{message}</p>
      </form>

      {/* Render based on jobStatus */}
      {jobStatus === "succeeded" && localJob && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
          {/* Always show the headline */}
          <h2 className="text-lg font-medium text-blue-700">
            {localJob.headline}
          </h2>
          {/* Conditionally render the rest of the content */}
          {isExpanded ? (
            <>
              <p className="mt-2 text-gray-700">{localJob.introduction}</p>

              <h3 className="mt-4 text-md font-semibold text-gray-800">
                {isEnglish
                  ? "Introduction to the Position"
                  : "Einleitung zur Stelle"}
              </h3>
              <p>{localJob.introductionOfJob}</p>

              {/* <h3 className="mt-4 text-md font-semibold text-gray-800">
                {isEnglish ? "Personal Address" : "Persönliche Ansprache"}
              </h3>
              <p>{localJob.personalAddress}</p> */}

              {/* Tasks */}
              {localJob.tasks && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold text-gray-800">
                    {isEnglish ? "Tasks:" : "Aufgaben:"}
                  </h3>
                  <ul className="list-disc pl-6">
                    {parseField(localJob.tasks).map((task, index) => (
                      <li key={index}>{task as string}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qualifications */}
              {localJob.qualifications && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold text-gray-800">
                    {isEnglish ? "Qualifications:" : "Qualifikationen:"}
                  </h3>
                  <ul className="list-disc pl-6">
                    {parseField(localJob.qualifications).map(
                      (qualification, index) => (
                        <li key={index}>{qualification as string}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {localJob.benefits && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold text-gray-800">
                    {isEnglish ? "Benefits:" : "Vorteile:"}
                  </h3>
                  <ul className="list-disc pl-6">
                    {parseField(localJob.benefits).map((benefit, index) => (
                      <li key={index}>{benefit as string}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <></>
          )}

          {/* Toggle Button */}
          <div className="mt-4">
            <p
              onClick={() => setIsExpanded((prev) => !prev)}
              className="px-4 text-right text-black font-medium cursor-pointer"
            >
              {isExpanded
                ? isEnglish
                  ? "Show Less"
                  : "Weniger anzeigen"
                : isEnglish
                ? "Show More"
                : "Mehr anzeigen"}
            </p>
          </div>
          {/* Generated Video Section */}
          {videoResponse && (
            <div
              className="relative mt-6"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Pen Icon for Upload */}
              {isHovered && (
                <div className="absolute top-4 right-4 z-20 p-2 bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:bg-green-700">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <FaPen className="text-white h-6 w-6" />
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    accept=".png,.jpg,.jpeg,.mp4,.avi,.mov"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}
              {/* Dark Overlay */}
              <div>
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
                    <button
                      onClick={handlePlayPause}
                      className="p-4 rounded-full bg-white bg-opacity-90 shadow-lg hover:bg-opacity-100 hover:scale-110 transition-all duration-300"
                    >
                      <FaPlay className="h-8 w-8 text-gray-800" />
                    </button>
                  </div>
                )}
              </div>

              {/* Video Element */}
              <video
                id="video-player"
                className="w-full rounded shadow-lg"
                src={videoResponse.video_path}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                controls
              >
                {isEnglish
                  ? " Your browser does not support the video tag."
                  : "Ihr Browser unterstützt das Video-Tag nicht."}
              </video>

              {/* Bottom Red Section Overlay */}
              <div className="absolute bottom-10 left-0 w-full  text-white p-4 rounded-b-lg">
                <div className="font-bold flex items-center gap-2">
                  <h1 className="text-xl">
                    {isEnglish ? "Job title" : "Berufsbezeichnung"}:
                  </h1>
                  <h2 className="text-xl">{localJob.jobTitle}</h2>
                </div>
                <p className="font-bold text-lg">({localJob.voiceLocation})</p>

                <ul className="list-none space-y-2 mt-2">
                  {localJob.taglines.map((tagline, index) => (
                    <li
                      key={index}
                      className="flex items-center font-medium text-lg"
                    >
                      <svg
                        className="w-10 h-10 text-white mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {tagline}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="mt-4 px-4 flex items-center justify-between">
            <div className="flex-grow mr-4">
              <p className="w-full italic p-2 border-2 border-transparent rounded-lg text-gray-800 focus:outline-none focus:border-dashed focus:border-gray-300 hover:border-dashed hover:border-gray-300 transition-colors">
                {localJob.website}
              </p>
              <input
                type="text"
                value={localJob.jobTitle}
                className="w-full p-2 border-2 border-transparent rounded-lg text-gray-800 focus:outline-none focus:border-dashed focus:border-gray-300 hover:border-dashed hover:border-gray-300 transition-colors"
                title="Job Title"
                readOnly
              />
              <p className="w-full italic p-2 border-2 border-transparent rounded-lg text-gray-400 focus:outline-none focus:border-dashed focus:border-gray-300 hover:border-dashed hover:border-gray-300 transition-colors">
                {localJob.personalAddress}
              </p>
            </div>
            <div className="mt-4">
              <button
                className="px-4 py-2 mb-5 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => {
                  if (localJob.website) {
                    const validUrl =
                      localJob.website.startsWith("http://") ||
                      localJob.website.startsWith("https://")
                        ? localJob.website
                        : `https://${localJob.website}`;

                    window.open(validUrl, "_blank");
                  } else {
                    alert("Website URL is not available");
                  }
                }}
              >
                {isEnglish ? "Apply Now" : "Jetzt bewerben"}
              </button>
            </div>
          </div>
          <h3 className="mt-4 text-md font-semibold text-gray-800">
            {isEnglish ? "Contact Details:" : "Kontaktdetails:"}
          </h3>
          {localJob.contactDetails.email && (
            <p>
              <strong>{isEnglish ? "Email:" : "E-Mail:"}</strong>{" "}
              {localJob.contactDetails.email}
            </p>
          )}
          {localJob.contactDetails.phone && (
            <p>
              <strong>{isEnglish ? "Phone:" : "Telefon"}</strong>{" "}
              {localJob.contactDetails.phone}
            </p>
          )}
          {localJob.contactDetails.address && (
            <p>
              <strong>
                {isEnglish ? "Contact Person:" : "Ansprechpartner"}
              </strong>{" "}
              {localJob.contactDetails.contact_person}
            </p>
          )}
        </div>
      )}
      {jobStatus === "failed" && error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-lg font-medium text-red-700">Error</h2>
          <p className="mt-2 text-sm text-red-800">{error}</p>
        </div>
      )}
      <GenerateImage onImagesGenerated={handleImageGeneration} />
      <GenerateVideo generatedImages={generatedImages} localJob={localJob} />
      <ChatStream />
    </div>
  );
};

export default CreateJobPost;
