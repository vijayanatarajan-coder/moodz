import React from "react";
import "./Styles/DesignStyles.css";
import "./App.css";
import "./Styles/Reset.css";
import Missing from "./Components/Healper/Missing";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Discover from "./Pages/Discover/Discover";
import MyPlayLists from "./Pages/MyPlayList/MyPlayLists";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

const App = () => {
  return (
    <div id="root">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Discover" element={<Discover />} />
        <Route path="/MyPlayLists" element={<MyPlayLists />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
