import React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieItem from "./components/MovieItem";
import TVItem from "./components/TVItem";

const App = () => {
  return (
    <>
      <div className="bg-light dark:bg-dark ">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/detail/:id" element={<MovieItem />} />
            <Route path="/tv/detail/:id" element={<TVItem />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
