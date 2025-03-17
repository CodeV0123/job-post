import React from "react";
import CreateJobPost from "./components/CreateJobPost/CreateJob";
import NavBar from "./components/NavBar";
// import CreateJob from "./components/CreateJob";
function App() {
  return (
    <React.Fragment>
      {/* <CreateJob /> */}
      <NavBar />
      <CreateJobPost />
    </React.Fragment>
  );
}

export default App;
