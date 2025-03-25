import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { selectTaglines } from "../../redux/slice/CreateJobSlice"; // Import memoized selector

const GeneratedVideo = () => {
  const { videoResponse } = useSelector(
    (state: RootState) => state.generateVideo
  );
  const taglines = useSelector(selectTaglines); // Use memoized selector

  console.log("Taglines:", taglines);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full mx-4 relative overflow-hidden">
      <div className="relative">
        {/* Video */}
        {videoResponse?.video_path ? (
          <video src={videoResponse.video_path} controls className="w-full" />
        ) : (
          <p>No video available</p>
        )}

        {/* Taglines Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-red-600 text-white p-4">
          <ul className="list-none">
            {taglines.length > 0 ? (
              taglines.map((tagline, index) => (
                <li key={index} className="text-lg font-medium flex ">
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
                      strokeWidth="2.5"
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
    </div>
  );
};

export default GeneratedVideo;
