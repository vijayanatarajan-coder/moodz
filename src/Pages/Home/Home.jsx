import React from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";

const Home = () => {
  return (
    <>
      <Button text="Discover" onClick={() => window.location.href = "/Discover"} />
    </>
  )
};

export default Home;
