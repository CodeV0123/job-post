import React from "react";
import { Route, Routes } from "react-router-dom";
// import CreateJobPost from "./components/CreateJobPost/CreateJob";
import CreateJob from "./components/CreateJobPost/CreateJob";
import GenerateImage from "./components/GenerateImage/GenerateImage";
import GenerateVideo from "./components/GenerateVideo/GenerateVideo";
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<CreateJob />} />
        <Route path="/generate-image" element={<GenerateImage />} />
        <Route path="/generate-video" element={<GenerateVideo />} />
      </Routes>
      {/* <CreateJobPost /> */}
    </React.Fragment>
  );
}

export default App;
