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
    <div className="relative w-full max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden">
      {/* Video Section */}
      <div className="relative">
        {videoResponse?.video_path ? (
          <div className="relative">
            <video
              ref={videoRef}
              src={videoResponse.video_path}
              className="w-full h-auto"
            />

            {/* Play/Pause Button (Above Everything) */}
            <button
              onClick={togglePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"
            >
              {isPlaying ? (
                <PauseIcon className="w-14 h-14 text-white opacity-90" />
              ) : (
                <PlayIcon className="w-14 h-14 text-white opacity-90" />
              )}
            </button>

            {/* Red Overlay at Bottom */}
            <div className="absolute bottom-1 left-0 w-full bg-red-700 text-white p-4">
              <h1 className="text-xl font-bold">JobTitle: {jobTitle} </h1>
              <p className="font-normal">({location})</p>

              {/* Taglines */}
              <ul className="list-none space-y-1 mt-2 text-base">
                {taglines.length > 0 ? (
                  taglines.map((tagline, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-white mr-2"
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
                  <p>No taglines available</p>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center">No video available</p>
        )}
      </div>
    </div>
  );
};

export default GeneratedVideo;
