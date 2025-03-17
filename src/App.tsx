import React from "react";
import { Route, Routes } from "react-router-dom";
// import CreateJobPost from "./components/CreateJobPost/CreateJob";
import CreateJob from "./components/CreateJobPost/CreateJob";
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<CreateJob />} />
      </Routes>
      {/* <CreateJobPost /> */}
    </React.Fragment>
  );
}

export default App;
