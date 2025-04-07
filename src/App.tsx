import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";
// import CreateJobPost from "./components/CreateJobPost/CreateJob";
import CreateJob from "./components/CreateJobPost/CreateJob";
import GenerateImage from "./components/GenerateImage/GenerateImage";
import GenerateVideo from "./components/GenerateVideo/GenerateVideo";
import CreatedJob from "./components/CreatedJob/CreatedJob";
import ChatStream from "./components/ChatStream/ChatStream";


function App() {
  const { jobPost, language } = useSelector(
    (state: RootState) => state.createJob
  );
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<CreateJob />} />
        <Route path="/generate-image" element={<GenerateImage />} />
        <Route path="/generate-video" element={<GenerateVideo />} />
        <Route path="/chat-stream" element={<ChatStream />} />
        <Route
          path="/created-job"
          element={<CreatedJob jobPost={jobPost || {}} language={language} />}
        />
      </Routes>
      {/* <CreateJobPost /> */}
    </React.Fragment>
  );
}

export default App;
