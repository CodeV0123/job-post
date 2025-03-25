// import { generateVideo } from "../../redux/slice/GenerateVideoSlice";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";

const GeneratedVideo = () => {
  const { videoResponse } = useSelector(
    (state: RootState) => state.generateVideo
  );
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full mx-4 relative overflow-hidden">
      {videoResponse && videoResponse.video_path ? (
        <video src={videoResponse.video_path} controls></video>
      ) : (
        <p>No video available</p>
      )}
    </div>
  );
};

export default GeneratedVideo;
