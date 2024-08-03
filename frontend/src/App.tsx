import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NavigationBar from "./components/NavigationBar";

const App: React.FC = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;
