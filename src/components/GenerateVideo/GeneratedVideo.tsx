import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { selectTaglines } from "../../redux/slice/CreateJobSlice"; // Import memoized selector
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid"; // Heroicons for play/pause

const GeneratedVideo = () => {
  const { videoResponse } = useSelector(
    (state: RootState) => state.generateVideo
  );
  const taglines = useSelector(selectTaglines);

  // Fetch Job Title and Location from CreateJobSlice
  const jobTitle = useSelector(
    (state: RootState) =>
      state.createJob.jobPost?.english?.["Job Title"] ||
      "Job Title Not Available"
  );
  const location = useSelector(
    (state: RootState) => state.createJob.location || "Location Not Available"
  );

  const { language } = useSelector((state: RootState) => state.createJob);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden">
      {/* Video Section */}
      <div className="relative">
        {videoResponse?.video_path ? (
          <div className="relative">
            <video
              ref={videoRef}
              src={videoResponse.video_path}
              className="w-full max-w-full h-auto rounded-lg"
            />

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition duration-300"
            >
              {isPlaying ? (
                <PauseIcon className="w-12 h-12 sm:w-14 sm:h-14 text-white opacity-90" />
              ) : (
                <PlayIcon className="w-12 h-12 sm:w-14 sm:h-14 text-white opacity-90" />
              )}
            </button>

            {/* Overlay at Bottom */}
            <div className="absolute bottom-0 left-0 w-full bg-red-700 text-white p-3 sm:p-4">
              <h1 className="text-lg sm:text-xl font-bold">
                {language === "english" ? "Job Title:" : "Berufsbezeichnung"}{" "}
                {jobTitle}
              </h1>
              <p className="text-sm sm:text-base">({location})</p>

              {/* Taglines */}
              <ul className="list-none space-y-1 mt-2 text-sm sm:text-base">
                {taglines.length > 0 ? (
                  taglines.map((tagline, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-2"
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
                  ))
                ) : (
                  <p className="text-sm">
                    {language === "english"
                      ? "No taglines available"
                      : "Keine Slogans verfügbar"}
                  </p>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-sm sm:text-base">
            {language === "english"
              ? "No video available"
              : "Kein Video verfügbar"}
          </p>
        )}
      </div>
    </div>
  );
};

export default GeneratedVideo;
