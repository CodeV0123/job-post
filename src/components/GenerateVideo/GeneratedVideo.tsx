// import { generateVideo } from "../../redux/slice/GenerateVideoSlice";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";

const GeneratedVideo = () => {
  const { videoResponse } = useSelector(
    (state: RootState) => state.generateVideo
  );
  return (
    <div>
      {videoResponse && videoResponse.video_path ? (
        <video src={videoResponse.video_path}></video>
      ) : (
        <p>No video available</p>
      )}
    </div>
  );
};

export default GeneratedVideo;
